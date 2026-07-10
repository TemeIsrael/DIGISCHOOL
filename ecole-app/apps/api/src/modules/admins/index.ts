import { Router } from 'express';
import { z } from 'zod';
import { Admin } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole, requireAdminType } from '../../middlewares/rbac';
import { hashPassword } from '../../lib/bcrypt';
import { validateBody } from '../../middlewares/validate';
import { sendInternalMail } from '../../lib/mailer';
import { ADMIN_TYPES } from '../../config/constants';

const router = Router();

const createAdminSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email('Adresse email invalide'),
  typeAdmin: z.number().min(1).max(5) // Root (0) can only be created via seed
});

// All admin management is restricted to the Root/Super Admin (typeAdmin = 0)
router.use(authenticate);
router.use(requireRole(['ADMIN']));
router.use(requireAdminType([ADMIN_TYPES.SUPER])); // Only typeAdmin === 0

// CREATE
router.post('/', validateBody(createAdminSchema), async (req, res, next) => {
  const { login, password, email, typeAdmin } = req.body;
  try {
    const existing = await Admin.findOne({ where: { login } });
    if (existing) {
      res.status(400).json({ error: { code: 'CONFLICT', message: 'Ce login est déjà pris' } });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const admin = await Admin.create({
      login,
      password: hashedPassword,
      email,
      typeAdmin
    });

    const typeLabels: Record<number, string> = {
      1: 'Secrétaire (Inscriptions)',
      2: 'Scolarité (Registrar)',
      3: 'Fondateur',
      4: 'Directeur',
      5: 'Auditeur'
    };

    // Send credentials by email
    await sendInternalMail(
      email,
      'Vos identifiants de connexion DIGISCHOOL',
      `Bonjour,\n\nVotre compte administrateur a été créé avec les accès suivants :\n\nLien de connexion : ${process.env.FRONT_URL || 'http://localhost:5173'}\nLogin : ${login}\nMot de passe : ${password}\nType  : ${typeLabels[typeAdmin] ?? 'Administrateur'}\n\nVeuillez vous connecter à la plateforme et changer votre mot de passe dès la première connexion.\n\nCordialement,\nLe Super Administrateur DIGISCHOOL`
    );

    res.status(201).json({
      success: true,
      data: {
        id: admin.ID,
        login: admin.login,
        email: admin.email,
        typeAdmin: admin.typeAdmin,
        actif: admin.actif
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET ALL
router.get('/', async (req, res, next) => {
  try {
    const list = await Admin.findAll({
      where: { isDelete: false },
      attributes: ['ID', 'login', 'email', 'typeAdmin', 'actif']
    });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// SEND CREDENTIALS — Simulate sending login credentials by email
router.post('/:id/send-credentials', async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findOne({ where: { ID: id, isDelete: false } });
    if (!admin) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Administrateur introuvable' } });
      return;
    }

    if (!admin.email) {
      res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Cet administrateur n\'a pas d\'adresse e-mail renseignée.' } });
      return;
    }

    const typeLabels: Record<number, string> = {
      1: 'Secrétaire (Inscriptions)',
      2: 'Scolarité (Registrar)',
      3: 'Fondateur',
      4: 'Directeur',
      5: 'Auditeur'
    };

    await sendInternalMail(
      admin.email,
      'Vos identifiants de connexion DIGISCHOOL (Rappel)',
      `Bonjour,\n\nSuite à votre demande, voici le rappel de vos accès administrateur :\n\nLien de connexion : ${process.env.FRONT_URL || 'http://localhost:5173'}\nLogin : ${admin.login}\nType  : ${typeLabels[admin.typeAdmin] ?? 'Administrateur'}\n\nSi vous avez oublié votre mot de passe, utilisez la fonction "Mot de passe oublié" ou demandez au Super Administrateur de le réinitialiser.\n\nCordialement,\nLe Super Administrateur DIGISCHOOL`
    );

    res.json({ success: true, message: `Identifiants envoyés par mail à : ${admin.email}` });
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findOne({ where: { ID: id, isDelete: false } });
    if (!admin) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Administrateur introuvable' } });
      return;
    }

    const { typeAdmin, actif } = req.body;
    if (typeAdmin !== undefined) admin.typeAdmin = typeAdmin;
    if (actif !== undefined) admin.actif = actif;

    await admin.save();
    res.json({ success: true, data: admin });
  } catch (err) {
    next(err);
  }
});

// DELETE (soft)
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findOne({ where: { ID: id, isDelete: false } });
    if (!admin) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Administrateur introuvable' } });
      return;
    }

    admin.isDelete = true;
    await admin.save();
    res.json({ success: true, message: 'Compte administrateur supprimé (soft-delete)' });
  } catch (err) {
    next(err);
  }
});

export default router;
