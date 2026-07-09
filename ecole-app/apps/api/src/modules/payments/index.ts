import { Router } from 'express';
import { z } from 'zod';
import { Paiement, Scolarite, Frequente, Salle, Classe, AnneeAcademique, Mode, Eleve, Personne, Parents } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';
import { validateBody } from '../../middlewares/validate';
import { generateReceiptPDF } from '../../lib/pdf/receipt';
import { logAction } from '../../lib/audit';
import { PassThrough } from 'stream';
import { sendInternalMail } from '../../lib/mailer';

const router = Router();

const createPaymentSchema = z.object({
  matricule: z.string(),
  idAca: z.number(),
  idMode: z.number(),
  montant: z.number().positive(),
  trancheCouverte: z.number(),
  justificatifUrl: z.string().optional()
});

router.use(authenticate);

// 1. CREATE PAYMENT (Rule: Total paiements ≤ inscription + pension du cycle)
router.post('/', requireRole(['ADMIN']), validateBody(createPaymentSchema), async (req, res, next) => {
  const { matricule, idAca, idMode, montant, trancheCouverte, justificatifUrl } = req.body;
  const user = req.user!;
  const ip = req.ip || 'unknown';

  try {
    // Determine student's cycle to find scolarite limits
    const enrollment = await Frequente.findOne({
      where: { matricule, idAcademi: idAca },
      include: [
        {
          model: Salle,
          as: 'salle',
          include: [{ model: Classe, as: 'classe' }]
        }
      ]
    });

    if (!enrollment) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Élève non inscrit pour cette année académique' } });
      return;
    }

    const idCycle = enrollment.salle?.classe?.idCycle;
    if (!idCycle) {
      res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Cycle introuvable pour la classe de l\'élève' } });
      return;
    }

    // Get scolarite limits
    const scolarite = await Scolarite.findOne({ where: { idCycle } });
    if (!scolarite) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Barème de scolarité non configuré pour ce cycle' } });
      return;
    }

    const limitTotal = scolarite.montantInscription + scolarite.pension;

    // Calculate sum of existing active payments
    const paymentsSum = await Paiement.sum('montant', {
      where: { matricule, idAca, actif: true }
    }) || 0;

    if (paymentsSum + montant > limitTotal) {
      res.status(400).json({
        error: {
          code: 'PAYMENT_LIMIT_EXCEEDED',
          message: `Le montant total des versements (${paymentsSum + montant} XAF) dépasse le plafond autorisé de scolarité (${limitTotal} XAF)`
        }
      });
      return;
    }

    // Save payment
    const payment = await Paiement.create({
      matricule,
      idAca,
      idMode,
      idPers: user.id,
      montant,
      trancheCouverte,
      justificatifUrl: justificatifUrl || null,
      actif: true
    });

    logAction(user.id, 'CREATE_PAYMENT', `payment:${payment.idPaie}`, ip);

    // ── Email notification au parent ──────────────────────────────────────────
    try {
      // Chercher l'élève pour récupérer son nom
      const studentRecord = await Eleve.findByPk(matricule);
      // Chercher le parent lié à cet élève (via table Parents)
      const parentLink = await (Parents as any).findOne({ where: { matricule } });
      if (parentLink) {
        const parentPerson = await Personne.findByPk(parentLink.idPers);
        if (parentPerson?.email) {
          const nomEleve = studentRecord ? `${studentRecord.nom} ${studentRecord.prenom}` : matricule;
          const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #3C3489; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h2 style="margin: 0;">DIGISCHOOL — Confirmation de Paiement</h2>
              </div>
              <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
                <p>Cher(e) parent/tuteur,</p>
                <p>Nous vous confirmons la réception d'un versement de frais de scolarité pour <strong>${nomEleve}</strong>.</p>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <tr style="background: #EEEDFE;">
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Matricule</td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0;">${matricule}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Montant versé</td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">${montant.toLocaleString('fr-FR')} XAF</td>
                  </tr>
                  <tr style="background: #EEEDFE;">
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Tranche couverte</td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0;">Tranche ${trancheCouverte}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">N° de reçu</td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0;">#${payment.idPaie}</td>
                  </tr>
                </table>
                <p style="color: #475569; font-size: 13px;">Conservez ce message comme confirmation. Votre reçu officiel est disponible dans votre espace parent.</p>
              </div>
              <div style="background: #3C3489; color: #c7d2fe; padding: 10px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
                DIGISCHOOL EcoleApp — Ne pas répondre à cet email
              </div>
            </div>
          `;
          await sendInternalMail(
            parentPerson.email,
            `✅ Confirmation de paiement — Tranche ${trancheCouverte} — ${nomEleve}`,
            htmlContent
          );
        }
      }
    } catch (mailErr) {
      // Ne pas bloquer la réponse si l'email échoue
      console.error('[PAYMENT EMAIL] Failed to send notification:', mailErr);
    }

    res.status(201).json({ success: true, data: payment });
  } catch (err) {
    next(err);
  }
});

// 2. GET ALL PAYMENTS
router.get('/', requireRole(['ADMIN', 'PARENT']), async (req, res, next) => {
  const user = req.user!;
  try {
    let list;
    if (user.role === 'PARENT') {
      list = await Paiement.findAll({ 
        where: { actif: true },
        include: [{ model: AnneeAcademique, as: 'anneeAcademique' }] // mock
      });
    } else {
      list = await Paiement.findAll({
        include: [
          { model: AnneeAcademique, as: 'anneeAcademique' }
        ]
      });
    }
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// 3. IMMUTABILITY ENFORCEMENT - UPDATE IS FORBIDDEN
router.put('/:id', requireRole(['ADMIN']), (req, res) => {
  res.status(403).json({
    error: {
      code: 'IMMUTABLE_RECORD',
      message: 'Les écritures de paiements sont immuables. Les modifications directes sont interdites. Pour annuler un paiement, veuillez tracer une contre-écriture.'
    }
  });
});

// 4. CANCEL PAYMENT (Counter-entry / Ligne inverse trace)
router.post('/:id/cancel', requireRole(['ADMIN']), async (req, res, next) => {
  const { id } = req.params;
  const user = req.user!;
  const ip = req.ip || 'unknown';

  try {
    const payment = await Paiement.findByPk(id);
    if (!payment || !payment.actif) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Paiement actif introuvable' } });
      return;
    }

    // Flag original payment as inactive or processed, then create the negative counter-entry
    payment.actif = false;
    await payment.save();

    const counterPayment = await Paiement.create({
      matricule: payment.matricule,
      idAca: payment.idAca,
      idMode: payment.idMode,
      idPers: user.id,
      montant: -payment.montant, // Ligne inverse
      trancheCouverte: payment.trancheCouverte,
      justificatifUrl: 'ANNULATION',
      actif: false // Annulled pair is tracked as inactive for active totals
    });

    logAction(user.id, 'CANCEL_PAYMENT', `payment:${id}_canceled_by:${counterPayment.idPaie}`, ip);

    res.json({
      success: true,
      message: 'Paiement annulé avec succès. Une écriture inverse a été enregistrée pour audit.',
      data: counterPayment
    });
  } catch (err) {
    next(err);
  }
});

// 5. DOWNLOAD RECEIPT PDF
router.get('/:id/receipt', requireRole(['ADMIN', 'PARENT']), async (req, res, next) => {
  const { id } = req.params;
  try {
    const payment = await Paiement.findByPk(id, {
      include: [
        { model: AnneeAcademique, as: 'anneeAcademique' },
        { model: Mode, as: 'mode' }
      ]
    });

    if (!payment) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Paiement introuvable' } });
      return;
    }

    // Fetch student profile and room
    const enrollment = await Frequente.findOne({
      where: { matricule: payment.matricule, idAcademi: payment.idAca },
      include: [
        {
          model: Salle,
          as: 'salle',
          include: [{ model: Classe, as: 'classe' }]
        },
        {
          model: Eleve,
          as: 'eleve'
        }
      ]
    });

    const receiptData = {
      idPaie: payment.idPaie,
      matricule: String(payment.matricule),
      nom: enrollment?.eleve?.nom || 'Inconnu',
      prenom: enrollment?.eleve?.prenom || '',
      classe: enrollment?.salle?.libelle || 'Classe',
      anneeLibelle: payment.anneeAcademique?.libelle || '2026',
      montant: payment.montant,
      date: payment.date,
      mode: payment.mode?.libelle || 'Espèces',
      trancheCouverte: payment.trancheCouverte
    };

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=recu_${payment.idPaie}.pdf`);

    const passthrough = new PassThrough();
    passthrough.pipe(res);

    await generateReceiptPDF(passthrough, receiptData);
  } catch (err) {
    next(err);
  }
});

export default router;
