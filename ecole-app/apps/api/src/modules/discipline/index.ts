import { Router } from 'express';
import { z } from 'zod';
import { Rapport, Discipline, Eleve } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';
import { validateBody } from '../../middlewares/validate';
import { logAction } from '../../lib/audit';

const router = Router();

const createRapportSchema = z.object({
  matricule: z.string(),
  idAca: z.number(),
  idDiscipline: z.number(),
  points: z.number().positive(),
  date: z.string().optional()
});

router.use(authenticate);

// 1. CREATE DISCIPLINE INCIDENT REPORT (Rapport)
router.post('/', requireRole(['ADMIN', 'ADMIN_SCOLARITE', 'ADMIN_INSCRIPTIONS', 'FONDATEUR', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT', 'TEACHER']), validateBody(createRapportSchema), async (req, res, next) => {
  const { matricule, idAca, idDiscipline, points, date } = req.body;
  const user = req.user!;
  const ip = req.ip || 'unknown';

  try {
    const eleve = await Eleve.findByPk(matricule);
    if (!eleve) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Élève introuvable' } });
      return;
    }

    const discipline = await Discipline.findByPk(idDiscipline);
    if (!discipline) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Motif de discipline introuvable' } });
      return;
    }

    const rapport = await Rapport.create({
      matricule,
      idAca,
      idPers: user.id,
      idDiscipline,
      points,
      date: date || new Date(),
      statut: 'Draft'
    });

    logAction(user.id, 'CREATE_DISCIPLINE_REPORT', `rapport:${rapport.idRap}`, ip);

    res.status(201).json({ success: true, data: rapport });
  } catch (err) {
    next(err);
  }
});

// 2. APPROVE DISCIPLINE REPORT
router.post('/:id/approve', requireRole(['ADMIN', 'ADMIN_SCOLARITE', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT']), async (req, res, next) => {
  const { id } = req.params;
  const user = req.user!;
  const ip = req.ip || 'unknown';

  try {
    const report = await Rapport.findByPk(id);
    if (!report) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Rapport de discipline introuvable' } });
      return;
    }

    report.statut = 'Approved';
    await report.save();

    logAction(user.id, 'APPROVE_DISCIPLINE_REPORT', `rapport:${id}`, ip);

    res.json({
      success: true,
      message: 'Rapport de discipline validé avec succès',
      data: report
    });
  } catch (err) {
    next(err);
  }
});

// 3. GET STUDENT DISCIPLINE REPORTS
router.get('/student/:matricule', requireRole(['ADMIN', 'ADMIN_SCOLARITE', 'ADMIN_INSCRIPTIONS', 'FONDATEUR', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT', 'TEACHER', 'PARENT']), async (req, res, next) => {
  const { matricule } = req.params;
  try {
    const list = await Rapport.findAll({
      where: {
        matricule,
        statut: 'Approved' // Only approved reports shown to parents/teachers generally
      },
      include: [{ model: Discipline, as: 'discipline' }]
    });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

export default router;
