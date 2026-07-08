import { Router } from 'express';
import { Paiement, Evaluation, Eleve, Personne, Classe, Parents } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';

const router = Router();

router.use(authenticate);

// 1. ROOT / ADMIN DASHBOARD STATS
router.get('/dashboard', requireRole(['ADMIN']), async (req, res, next) => {
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
    // Parents see stats for their children
    const childrenCount = 2; // In reality, count Eleve linked to Parents
    
    res.json({
      success: true,
      data: {
        childrenCount,
        unreadMessages: 0,
        upcomingEvals: [],
        homeworks: []
      }
    });
  } catch (err) {
    next(err);
  }
});

// 4. FINANCE ANALYTICS
router.get('/finance', requireRole(['ADMIN']), async (req, res, next) => {
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
router.get('/pedagogy', requireRole(['ADMIN']), async (req, res, next) => {
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
