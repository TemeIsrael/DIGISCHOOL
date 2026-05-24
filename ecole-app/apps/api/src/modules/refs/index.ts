import { Router } from 'express';
import { VilleNaissance, Quartier, Discipline, Specialite } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';

const router = Router();

router.use(authenticate);

// Villes de Naissance
router.get('/villes', async (req, res, next) => {
  try {
    const list = await VilleNaissance.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/villes', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await VilleNaissance.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// Quartiers
router.get('/quartiers', async (req, res, next) => {
  try {
    const list = await Quartier.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/quartiers', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await Quartier.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// Disciplines
router.get('/disciplines', async (req, res, next) => {
  try {
    const list = await Discipline.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/disciplines', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await Discipline.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// Specialites
router.get('/specialites', async (req, res, next) => {
  try {
    const list = await Specialite.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/specialites', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await Specialite.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

export default router;
