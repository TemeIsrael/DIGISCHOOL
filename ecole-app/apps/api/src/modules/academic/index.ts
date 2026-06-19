import { Router } from 'express';
import { Cycle, Classe, Salle, AnneeAcademique, Trimestre, Cours, EmploiDuTemps } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';

const router = Router();

router.use(authenticate);

// --- Cycles ---
router.get('/cycles', async (req, res, next) => {
  try {
    const list = await Cycle.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/cycles', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await Cycle.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// --- Classes ---
router.get('/classes', async (req, res, next) => {
  try {
    const where: any = {};
    if (req.query.section) where.section = req.query.section;
    const list = await Classe.findAll({ where, include: [{ model: Cycle, as: 'cycle' }] });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/classes', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await Classe.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// --- Salles ---
router.get('/salles', async (req, res, next) => {
  try {
    const list = await Salle.findAll({ include: [{ model: Classe, as: 'classe' }] });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/salles', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await Salle.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// --- Academic Years ---
router.get('/years', async (req, res, next) => {
  try {
    const list = await AnneeAcademique.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/years', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await AnneeAcademique.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// --- Courses (Cours) ---
router.get('/courses', async (req, res, next) => {
  try {
    const list = await Cours.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/courses', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await Cours.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// --- Emploi du Temps ---
router.get('/schedules', async (req, res, next) => {
  try {
    const list = await EmploiDuTemps.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

router.post('/schedules', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const item = await EmploiDuTemps.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

export default router;
