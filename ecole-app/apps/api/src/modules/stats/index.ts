import { Router } from 'express';
import { Paiement, Evaluation, Eleve, Personne, Classe, Parents, Frequente, Salle, Scolarite, Tranches, Messages } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';

const router = Router();

router.use(authenticate);

// 1. ROOT / ADMIN DASHBOARD STATS
router.get('/dashboard', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE', 'FONDATEUR', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT']), async (req, res, next) => {
  try {
    const totalStudents = await Eleve.count({ where: { isDelete: false } });
    const totalTeachers = await Personne.count({ where: { typePersonne: 1, isDelete: false } });
    const totalPayments = await Paiement.sum('montant', { where: { actif: true } }) || 0;
    
    // Very basic upcoming evals / classes logic
    const totalClasses = await Classe.count();

    res.json({
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalPayments,
        totalClasses,
        upcomingEvals: [] // Simplified
      }
    });
  } catch (err) {
    next(err);
  }
});

// 2. TEACHER DASHBOARD STATS
router.get('/teacher', requireRole(['TEACHER', 'ADMIN']), async (req, res, next) => {
  try {
    // Basic stats for teacher. In a real app we'd filter by the classes assigned to the teacher.
    const assignedClasses = await Classe.count();
    const studentsConcerned = await Eleve.count({ where: { isDelete: false } });
    const plannedEvals = 0; // Simplified
    
    res.json({
      success: true,
      data: {
        assignedClasses,
        studentsConcerned,
        plannedEvals,
        upcomingEvals: [],
        schedule: [] // Could fetch from EmploiDuTemps
      }
    });
  } catch (err) {
    next(err);
  }
});

// 3. PARENT DASHBOARD STATS
router.get('/parent', requireRole(['PARENT', 'ADMIN']), async (req, res, next) => {
  try {
    const userId = req.user!.id;

    // Fetch actual children linked to this parent (Personne) via the Parents join table
    const parentLinks = await Parents.findAll({
      where: { idPers: userId },
      include: [{
        model: Eleve,
        as: 'eleve',
        where: { isDelete: false },
        required: false,
        include: [{
          model: Frequente,
          as: 'frequentations',
          include: [{
            model: Salle,
            as: 'salle',
            include: [{ model: Classe, as: 'classe' }]
          }]
        }]
      }]
    });

    // Build children array with class info
    const children = parentLinks
      .filter((pl: any) => pl.eleve)
      .map((pl: any) => {
        const e = pl.eleve;
        const freq = e.frequentations?.[0];
        const classeLabel = freq?.salle?.classe?.libelle || '';
        const salleLabel = freq?.salle?.libelle || '';
        return {
          matricule: e.matricule,
          nom: e.nom,
          prenom: e.prenom,
          classe: classeLabel,
          salle: salleLabel,
          statut: e.statut || 'INSCRIT'
        };
      });

    const childrenCount = children.length;

    // Count unread messages for this parent
    let unreadMessages = 0;
    try {
      const parentRecord = await Parents.findOne({ where: { idPers: userId } });
      if (parentRecord) {
        unreadMessages = await Messages.count({ where: { idParent: parentRecord.idParent, lu: false } });
      }
    } catch (_) {
      // Messages.lu may not exist, fallback to 0
    }

    res.json({
      success: true,
      data: {
        childrenCount,
        children,
        unreadMessages,
        upcomingEvals: [],
        homeworks: []
      }
    });
  } catch (err) {
    next(err);
  }
});

// 4. FINANCE ANALYTICS
router.get('/finance', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE', 'FONDATEUR', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT']), async (req, res, next) => {
  try {
    const totalPayments = await Paiement.sum('montant', { where: { actif: true } }) || 0;
    const paymentsCount = await Paiement.count({ where: { actif: true } });

    res.json({
      success: true,
      data: {
        totalCollected: totalPayments,
        transactionsCount: paymentsCount,
        currency: 'XAF'
      }
    });
  } catch (err) {
    next(err);
  }
});

// 5. PEDAGOGY ANALYTICS
router.get('/pedagogy', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE', 'FONDATEUR', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT']), async (req, res, next) => {
  try {
    const totalGrades = await Evaluation.count();
    const averageGradeResult = await Evaluation.findOne({
      attributes: [
        [Evaluation.sequelize!.fn('AVG', Evaluation.sequelize!.col('note')), 'averageGrade']
      ],
      raw: true
    }) as any;

    const averageGrade = averageGradeResult ? parseFloat(averageGradeResult.averageGrade || '0') : 0;

    res.json({
      success: true,
      data: {
        totalEvaluationsPerformed: totalGrades,
        schoolWideAverage: parseFloat(averageGrade.toFixed(2))
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
