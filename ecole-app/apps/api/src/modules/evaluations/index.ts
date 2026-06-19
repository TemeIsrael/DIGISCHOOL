import { Router } from 'express';
import { Epreuve, Evaluation, Enseignant, Frequente, Cours, NatureEpreuve, Eleve, Salle } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';
import { upload } from '../../middlewares/upload';
import { generateBulletinPDF } from '../../lib/pdf/bulletin';
import { PassThrough } from 'stream';

const router = Router();

router.use(authenticate);

// 1. UPLOAD EXAM PAPER (Epreuve)
router.post('/exams', requireRole(['ADMIN', 'TEACHER']), upload.single('file'), async (req, res, next) => {
  const { idNature } = req.body;
  const user = req.user!;
  try {
    if (!req.file) {
      res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Fichier requis' } });
      return;
    }

    const epreuve = await Epreuve.create({
      idNature,
      idPers: user.id,
      fichierUrl: `/uploads/${req.file.filename}`
    });

    res.status(201).json({ success: true, data: epreuve });
  } catch (err) {
    next(err);
  }
});

// DOWNLOAD EXAM PAPER (Epreuve) with custom permission check: "Examen NON téléchargeable parent | Devoir mercredi/weekend OUI"
router.get('/exams/:id/download', async (req, res, next) => {
  const { id } = req.params;
  const user = req.user!;

  try {
    const epreuve = await Epreuve.findByPk(id, {
      include: [{ model: NatureEpreuve, as: 'natureEpreuve' }]
    });

    if (!epreuve) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Épreuve introuvable' } });
      return;
    }

    // Role check: Parents have restricted access
    if (user.role === 'PARENT') {
      const typeNature = epreuve.natureEpreuve?.type.toLowerCase() || ''; // e.g. "examen" or "devoir"
      
      if (typeNature === 'examen') {
        res.status(403).json({
          error: {
            code: 'FORBIDDEN',
            message: 'Les parents ne sont pas autorisés à télécharger les sujets d\'examens'
          }
        });
        return;
      }

      if (typeNature === 'devoir') {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0=Sunday, 3=Wednesday, 6=Saturday
        const isWednesday = dayOfWeek === 3;
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        if (!isWednesday && !isWeekend) {
          res.status(403).json({
            error: {
              code: 'FORBIDDEN',
              message: 'Les devoirs ne peuvent être téléchargés par les parents que le mercredi ou le week-end'
            }
          });
          return;
        }
      }
    }

    res.json({ success: true, data: { downloadUrl: epreuve.fichierUrl } });
  } catch (err) {
    next(err);
  }
});

// 2. BULK ENTER EVALUATIONS (Check Enseignant match rule: "Enseignant saisit notes que pour ses cours (vérifier table Enseignant)")
router.post('/bulk', requireRole(['TEACHER']), async (req, res, next) => {
  const { evaluations } = req.body; // Array of { matricule, idEpreuve, idCours, idSession, note, appreciation }
  const user = req.user!;

  try {
    if (!Array.isArray(evaluations) || evaluations.length === 0) {
      res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Liste d\'évaluations invalide ou vide' } });
      return;
    }

    // Validate that the teacher is registered for ALL the courses they want to submit notes for
    const distinctCourseIds = Array.from(new Set(evaluations.map((e) => e.idCours)));
    for (const courseId of distinctCourseIds) {
      const teacherMatch = await Enseignant.findOne({
        where: {
          idPers: user.id,
          idCours: courseId
        }
      });

      if (!teacherMatch) {
        res.status(403).json({
          error: {
            code: 'FORBIDDEN',
            message: `Vous n'êtes pas autorisé à saisir des notes pour le cours ID: ${courseId}`
          }
        });
        return;
      }
    }

    const created = await Evaluation.bulkCreate(evaluations);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
});

// 3. GENERATE BULLETIN (Report Card)
// Computes "Moyenne trimestrielle = Σ(note × coeff) / Σ(coeff)" & "Rang = position par moyenne dans la salle"
router.get('/bulletins/:matricule/download', async (req, res, next) => {
  const { matricule } = req.params;
  const { idSession, idSalle, idAcademi } = req.query;
  const user = req.user!;

  try {
    // Parent restriction check: "Bulletin téléchargeable parent seulement si validé"
    // For this prototype, we mock the bulletin validation or query validation flags.
    if (user.role === 'PARENT') {
      const isValide = true; // Simulates validator status
      if (!isValide) {
        res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Le bulletin n\'est pas encore validé par la direction' } });
        return;
      }
    }

    const eleve = await Eleve.findByPk(matricule);
    if (!eleve) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Élève introuvable' } });
      return;
    }

    // Fetch all evaluations for this student in the session
    const evals = await Evaluation.findAll({
      where: {
        matricule,
        idSession: Number(idSession)
      },
      include: [{ model: Cours, as: 'cours' }]
    });

    if (evals.length === 0) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Aucune évaluation trouvée pour cet élève dans cette session' } });
      return;
    }

    // Fetch all students in the same room to compute rank
    const classmates = await Frequente.findAll({
      where: {
        idSalle: Number(idSalle),
        idAcademi: Number(idAcademi)
      }
    });

    // Compute student averages for rank
    const averages: { matricule: string; average: number }[] = [];
    for (const classmate of classmates) {
      const classEvals = await Evaluation.findAll({
        where: { matricule: classmate.matricule, idSession: Number(idSession) },
        include: [{ model: Cours, as: 'cours' }]
      });

      if (classEvals.length > 0) {
        let sumPoints = 0;
        let sumCoeffs = 0;
        classEvals.forEach((e: any) => {
          const coeff = e.cours?.coefficient || 1;
          sumPoints += e.note * coeff;
          sumCoeffs += coeff;
        });
        averages.push({
          matricule: String(classmate.matricule),
          average: sumCoeffs > 0 ? sumPoints / sumCoeffs : 0
        });
      }
    }

    // Sort to determine rank
    averages.sort((a, b) => b.average - a.average);
    const rang = averages.findIndex((a) => a.matricule === matricule) + 1;

    // Build Bulletin Notes
    const bulletinNotes = evals.map((e: any) => ({
      coursLibelle: e.cours?.libelle || 'Inconnu',
      coefficient: e.cours?.coefficient || 1,
      note: e.note,
      noteMax: e.cours?.noteMax || 20,
      appreciation: e.appreciation
    }));

    let studentSum = 0;
    let studentCoeff = 0;
    bulletinNotes.forEach((item) => {
      studentSum += item.note * item.coefficient;
      studentCoeff += item.coefficient;
    });
    const moyenne = studentCoeff > 0 ? studentSum / studentCoeff : 0;

    const salle = await Salle.findByPk(Number(idSalle));


    const bulletinData = {
      matricule,
      nom: eleve.nom,
      prenom: eleve.prenom,
      classe: salle?.libelle || 'Classe',
      anneeLibelle: '2026',
      trimestreLibelle: 'Trimestre',
      notes: bulletinNotes,
      moyenne,
      rang
    };

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=bulletin_${matricule}.pdf`);

    const passthrough = new PassThrough();
    passthrough.pipe(res);

    await generateBulletinPDF(passthrough, bulletinData);
  } catch (err) {
    next(err);
  }
});

export default router;
