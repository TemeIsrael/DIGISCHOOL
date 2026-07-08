import { Router } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import { Admin, Personne, RefreshTokens } from '../../db/models';
import { comparePassword, hashPassword } from '../../lib/bcrypt';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../lib/jwt';
import { authenticate } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { logAction } from '../../lib/audit';
import { LIMITS } from '../../config/constants';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: LIMITS.RATE_LIMIT_WINDOW_MS,
  max: LIMITS.RATE_LIMIT_MAX_ATTEMPTS,
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many login attempts, please try again after 10 minutes'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['ROOT','ADMIN_ROOT','ADMIN_INSCRIPTIONS','ADMIN_SCOLARITE','FONDATEUR','DIRECTEUR','ADMIN','TEACHER','PARENT','STUDENT'])
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6)
});

// LOGIN
router.post('/login', loginLimiter, validateBody(loginSchema), async (req, res, next) => {
  const { login, password, role } = req.body;
  const ip = req.ip || 'unknown';
  console.log("LOGIN:", login);
console.log("PASSWORD:", password);
console.log("ROLE:", role);
  try {
    let user: any = null;
    let userId = 0;
    let typeAdmin: number | undefined;
    let typePersonne: number | undefined;

    if (['ROOT','ADMIN_ROOT','ADMIN_INSCRIPTIONS','ADMIN_SCOLARITE','FONDATEUR','DIRECTEUR','ADMIN'].includes(role)) {
      user = await Admin.findOne({
        where: { login, actif: true, isDelete: false },
        attributes: ['ID', 'login', 'password', 'typeAdmin', 'actif', 'isDelete', 'langue']
      });

      if (!user || !user.password) {
        return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } });
      }

      const data = user.dataValues;
      userId = data.ID;
      typeAdmin = data.typeAdmin;

      const isValid = await comparePassword(password, data.password);
      if (!isValid) {
        return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } });
      }

    } else if (role === 'PARENT' || role === 'TEACHER') {
       // PARENT = typePersonne 2, TEACHER = typePersonne 1
       console.log('DEBUG: entered PERSONNE branch');
      const expectedType = role === 'PARENT' ? 2 : 1;
      user = await Personne.findOne({
        where: { login, typePersonne: expectedType, actif: true, isDelete: false },
        attributes: ['idPers', 'login', 'password', 'typePersonne', 'actif', 'isDelete', 'langue']
      });

      if (!user || !user.password) {
        return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } });
      }

         const data = user.dataValues;
         console.log('DEBUG: after fetching user data');
        console.log('DEBUG: fetched user data', data);
        console.log('DEBUG: raw password from DB', data.password);
        console.log('DEBUG: password sent by client', password);
        userId = data.idPers;
        typePersonne = data.typePersonne;
        // Ensure no trailing whitespace in stored hash
        const storedHash = data.password.trim();
        console.log('DEBUG: storedHash length', storedHash.length);
        const isValid = await comparePassword(password, storedHash);
        console.log('DEBUG: isValid result', isValid);
        if (!isValid) {
          console.log('DEBUG: password mismatch for user', login);
          return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } });
        }

    } else {
      return res.status(400).json({ error: { code: 'INVALID_ROLE', message: 'Role not supported' } });
    }

    const payload = { id: userId, login, role, typeAdmin, typePersonne };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await RefreshTokens.create({
      token: refreshToken,
      userId,
      userType: ['ROOT','ADMIN_ROOT','ADMIN_INSCRIPTIONS','ADMIN_SCOLARITE','FONDATEUR','DIRECTEUR','ADMIN'].includes(role) ? 'admin' : 'personne',
      expiresAt
    });

    logAction(userId, 'LOGIN', 'auth', ip);

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: userId,
          login,
          role,
          typeAdmin,
          typePersonne,
          langue: user.dataValues.langue || 'fr'
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

// REFRESH TOKEN
router.post('/refresh', async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Refresh token is required' } });
    return;
  }

  try {
    const dbToken = await RefreshTokens.findOne({ where: { token: refreshToken } });
    if (!dbToken || new Date() > dbToken.expiresAt) {
      res.status(401).json({ error: { code: 'INVALID_REFRESH_TOKEN', message: 'Token de rafraîchissement invalide ou expiré' } });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);
    const newPayload = {
      id: decoded.id,
      login: decoded.login,
      role: decoded.role,
      typeAdmin: decoded.typeAdmin,
      typePersonne: decoded.typePersonne
    };

    const newAccessToken = generateAccessToken(newPayload);
    res.json({
      success: true,
      data: {
        accessToken: newAccessToken
      }
    });
  } catch (err) {
    res.status(401).json({ error: { code: 'INVALID_REFRESH_TOKEN', message: 'Token invalide' } });
  }
});

// LOGOUT
router.post('/logout', async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    if (refreshToken) {
      await RefreshTokens.destroy({ where: { token: refreshToken } });
    }
    res.json({ success: true, message: 'Déconnecté avec succès' });
  } catch (err) {
    next(err);
  }
});

// ME
router.get('/me', authenticate, async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user
    }
  });
});

// CHANGE PASSWORD
router.post('/change-password', authenticate, validateBody(changePasswordSchema), async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userContext = req.user!;
  const ip = req.ip || 'unknown';

  try {
    let user: any = null;
    if (userContext.role === 'ADMIN') {
      user = await Admin.findByPk(userContext.id);
    } else {
      user = await Personne.findByPk(userContext.id);
    }

    if (!user || !(await comparePassword(oldPassword, user.password))) {
      res.status(400).json({ error: { code: 'INVALID_PASSWORD', message: 'Ancien mot de passe incorrect' } });
      return;
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    logAction(userContext.id, 'CHANGE_PASSWORD', 'auth', ip);
    res.json({ success: true, message: 'Mot de passe modifié avec succès' });
  } catch (err) {
    next(err);
  }
});

// UPDATE LANGUAGE
router.put('/language', authenticate, async (req, res, next) => {
  const { langue } = req.body;
  const userContext = req.user!;

  if (!langue || !['fr', 'en'].includes(langue)) {
    return res.status(400).json({ error: { code: 'INVALID_LANGUAGE', message: 'Langue invalide. Valeurs acceptées: fr, en' } });
  }

  try {
    if (userContext.role === 'ADMIN') {
      await Admin.update({ langue }, { where: { ID: userContext.id } });
    } else {
      await Personne.update({ langue }, { where: { idPers: userContext.id } });
    }
    res.json({ success: true, message: 'Langue mise à jour avec succès' });
  } catch (err) {
    next(err);
  }
});

export default router;
