import { Router } from 'express';
import { z } from 'zod';
import { Admin } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';
import { hashPassword } from '../../lib/bcrypt';
import { validateBody } from '../../middlewares/validate';

const router = Router();

const createAdminSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
  typeAdmin: z.number().min(0).max(5)
});

router.use(authenticate);
router.use(requireRole(['ADMIN']));

// CREATE
router.post('/', validateBody(createAdminSchema), async (req, res, next) => {
  const { login, password, typeAdmin } = req.body;
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
      typeAdmin
    });

    res.status(201).json({
      success: true,
      data: {
        id: admin.ID,
        login: admin.login,
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
      attributes: ['ID', 'login', 'typeAdmin', 'actif']
    });
    res.json({ success: true, data: list });
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

// DELETE
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
