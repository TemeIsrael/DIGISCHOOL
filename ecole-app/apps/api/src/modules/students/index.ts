import { Router } from 'express';
import { z } from 'zod';
import { sequelize } from '../../db';
import { Eleve, Frequente, Parents, Residents, Personne } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';
import { validateBody } from '../../middlewares/validate';
import { logAction } from '../../lib/audit';

const router = Router();

const registerStudentSchema = z.object({
  matricule: z.string().min(3),
  nom: z.string().min(2),
  prenom: z.string().min(2),
  dateNaissance: z.string(),
  idVilleNaissance: z.number(),
  langue: z.string().default('fr'),
  photo: z.string().optional(),
  // For Frequente
  idSalle: z.number(),
  idAcademi: z.number(),
  // For Parents (optional or required)
  idPersParent: z.number().optional(), // Personne ID of parent
  // For Residents
  idQuartier: z.number()
});

router.use(authenticate);

// CREATE (atomic registration in a single transaction)
router.post('/register', requireRole(['ADMIN']), validateBody(registerStudentSchema), async (req, res, next) => {
  const data = req.body;
  const ip = req.ip || 'unknown';
  const t = await sequelize.transaction();

  try {
    // 1. Create Eleve
    const eleve = await Eleve.create(
      {
        matricule: data.matricule,
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        idVilleNaissance: data.idVilleNaissance,
        langue: data.langue,
        photo: data.photo || null
      },
      { transaction: t }
    );

    // 2. Create Frequente
    await Frequente.create(
      {
        idSalle: data.idSalle,
        idAcademi: data.idAcademi,
        matricule: data.matricule
      },
      { transaction: t }
    );

    // 3. Link Parent (if provided)
    if (data.idPersParent) {
      await Parents.create(
        {
          idPers: data.idPersParent,
          matricule: data.matricule
        },
        { transaction: t }
      );
    }

    // 4. Create Residents (neighborhood mapping for the student / parent perspective)
    // Wait, the residents table maps idPers to idQuartier.
    // If a parent is linked, map the parent's residence to idQuartier, or we can save mapping for student.
    // Since the resident maps idPers, we'll map the parent (idPersParent) to the quartier.
    if (data.idPersParent) {
      await Residents.create(
        {
          idPers: data.idPersParent,
          idQuartier: data.idQuartier
        },
        { transaction: t }
      );
    }

    await t.commit();
    logAction(req.user!.id, 'REGISTER_STUDENT', `eleve:${data.matricule}`, ip);

    res.status(201).json({
      success: true,
      message: 'Élève inscrit avec succès avec toutes ses liaisons',
      data: eleve
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
});

// CRUD - GET ALL
router.get('/', requireRole(['ADMIN', 'TEACHER']), async (req, res, next) => {
  try {
    const list = await Eleve.findAll({ where: { isDelete: false } });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// CRUD - GET BY MATRICULE
router.get('/:matricule', requireRole(['ADMIN', 'TEACHER', 'PARENT']), async (req, res, next) => {
  const { matricule } = req.params;
  try {
    const eleve = await Eleve.findOne({
      where: { matricule, isDelete: false },
      include: [
        { model: Frequente, as: 'frequentations' },
        { model: Parents, as: 'parents' }
      ]
    });

    if (!eleve) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Élève introuvable' } });
      return;
    }

    res.json({ success: true, data: eleve });
  } catch (err) {
    next(err);
  }
});

// CRUD - UPDATE
router.put('/:matricule', requireRole(['ADMIN']), async (req, res, next) => {
  const { matricule } = req.params;
  try {
    const eleve = await Eleve.findOne({ where: { matricule, isDelete: false } });
    if (!eleve) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Élève introuvable' } });
      return;
    }
    await eleve.update(req.body);
    res.json({ success: true, data: eleve });
  } catch (err) {
    next(err);
  }
});

// CRUD - DELETE
router.delete('/:matricule', requireRole(['ADMIN']), async (req, res, next) => {
  const { matricule } = req.params;
  try {
    const eleve = await Eleve.findOne({ where: { matricule, isDelete: false } });
    if (!eleve) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Élève introuvable' } });
      return;
    }
    await eleve.update({ isDelete: true });
    res.json({ success: true, message: 'Élève supprimé avec succès (soft-delete)' });
  } catch (err) {
    next(err);
  }
});

// ASSIGN ROOM (Frequente update/new)
router.post('/assign-room', requireRole(['ADMIN']), async (req, res, next) => {
  const { matricule, idSalle, idAcademi } = req.body;
  try {
    const freq = await Frequente.create({
      matricule,
      idSalle,
      idAcademi
    });
    res.json({ success: true, data: freq });
  } catch (err) {
    next(err);
  }
});

export default router;
