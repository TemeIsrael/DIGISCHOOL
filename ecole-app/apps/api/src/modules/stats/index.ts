import { Router } from 'express';
import { Paiement, Evaluation, Eleve } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';

const router = Router();

router.use(authenticate);
router.use(requireRole(['ADMIN']));

// 1. FINANCE ANALYTICS
router.get('/finance', async (req, res, next) => {
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

// 2. PEDAGOGY ANALYTICS
router.get('/pedagogy', async (req, res, next) => {
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
