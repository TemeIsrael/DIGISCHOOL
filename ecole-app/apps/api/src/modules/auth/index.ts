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
  role: z.enum(['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'])
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6)
});

// LOGIN
router.post('/login', loginLimiter, validateBody(loginSchema), async (req, res, next) => {
  const { login, password, role } = req.body;
  const ip = req.ip || 'unknown';

  try {
    let user: any = null;
    let userId = 0;
    let typeAdmin: number | undefined;
    let typePersonne: number | undefined;

    if (role === 'ADMIN') {
      user = await Admin.findOne({ where: { login, actif: true, isDelete: false } });
      if (user) {
        userId = user.ID;
        typeAdmin = user.typeAdmin;
      }
    } else {
      let typeReq = 4;
      if (role === 'TEACHER') typeReq = 1;
      if (role === 'PARENT') typeReq = 2;

      user = await Personne.findOne({ where: { login, typePersonne: typeReq, actif: true, isDelete: false } });
      if (user) {
        userId = user.idPers;
        typePersonne = user.typePersonne;
      }
    }

    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Identifiants invalides' } });
      return;
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
      userType: role === 'ADMIN' ? 'admin' : 'personne',
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
          typePersonne
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

export default router;
