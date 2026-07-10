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
  idVilleNaissance: z.string(),
  langue: z.string().default('fr'),
  photo: z.string().optional(),
  // For Frequente
  idSalle: z.string(),
  idAcademi: z.string(),
  // For Parents (optional or required)
  idPersParent: z.number().optional(), // Personne ID of parent
  // For Residents
  idQuartier: z.string(),
  // New Parent Info
  parentInfo: z.object({
    nom: z.string(),
    prenom: z.string().optional(),
    email: z.string().email(),
    telephone: z.string(),
  }).optional()
});

// Schema for parent pre-registration (lighter requirements)
const preRegisterStudentSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  dateNaissance: z.string(),
  idVilleNaissance: z.number(),
  langue: z.string().default('fr'),
  photo: z.string().optional(),
  idQuartier: z.number()
});

router.use(authenticate);

// ═══ PRE-REGISTRATION (PARENT) ═══
// Parent submits a pre-registration → student created with statut='PRE_INSCRIT', no class/room yet
router.post('/pre-register', requireRole(['PARENT']), validateBody(preRegisterStudentSchema), async (req, res, next) => {
  const data = req.body;
  const ip = req.ip || 'unknown';
  const t = await sequelize.transaction();

  try {
    // Generate a temporary matricule for pre-registration
    const tempMatricule = `PRE-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 1. Create Eleve with PRE_INSCRIT status
    const eleve = await Eleve.create(
      {
        matricule: tempMatricule,
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        idVilleNaissance: data.idVilleNaissance,
        langue: data.langue,
        photo: data.photo || null,
        statut: 'PRE_INSCRIT'
      },
      { transaction: t }
    );

    // 2. Link parent to student
    const parentPersonne = await Personne.findOne({
      where: { idPers: req.user!.id, typePersonne: 2, isDelete: false }
    });

    if (parentPersonne) {
      await Parents.create(
        { idPers: parentPersonne.idPers, matricule: tempMatricule },
        { transaction: t }
      );

      // 3. Map parent residence
      if (data.idQuartier) {
        const existingResident = await Residents.findOne({
          where: { idPers: parentPersonne.idPers, idQuartier: data.idQuartier }
        });
        if (!existingResident) {
          await Residents.create(
            { idPers: parentPersonne.idPers, idQuartier: data.idQuartier },
            { transaction: t }
          );
        }
      }
    }

    await t.commit();
    logAction(req.user!.id, 'PRE_REGISTER_STUDENT', `eleve:${tempMatricule}`, ip);

    res.status(201).json({
      success: true,
      message: 'Préinscription soumise avec succès. En attente de validation par l\'administration.',
      data: eleve
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
});

// ═══ VALIDATE PRE-REGISTRATION (ADMIN only) ═══
// Admin reviews and confirms a pre-registration → assigns matricule, class, room
const validatePreRegSchema = z.object({
  matricule: z.string().min(3), // The real matricule to assign
  idSalle: z.number(),
  idAcademi: z.number()
});

router.put('/validate/:tempMatricule', requireRole(['ADMIN','ADMIN_INSCRIPTIONS','ADMIN_SCOLARITE']), validateBody(validatePreRegSchema), async (req, res, next) => {
  const { tempMatricule } = req.params;
  const data = req.body;
  const ip = req.ip || 'unknown';
  const t = await sequelize.transaction();

  try {
    const eleve = await Eleve.findOne({
      where: { matricule: tempMatricule, statut: 'PRE_INSCRIT', isDelete: false }
    });

    if (!eleve) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Préinscription introuvable' } });
      return;
    }

    // Update student: assign real matricule and mark as INSCRIT
    await eleve.update(
      { matricule: data.matricule, statut: 'INSCRIT' },
      { transaction: t }
    );

    // Update parent link with new matricule
    await Parents.update(
      { matricule: data.matricule },
      { where: { matricule: tempMatricule }, transaction: t }
    );

    // Create Frequente (class assignment)
    await Frequente.create(
      { idSalle: data.idSalle, idAcademi: data.idAcademi, matricule: data.matricule },
      { transaction: t }
    );

    await t.commit();
    logAction(req.user!.id, 'VALIDATE_PRE_REGISTRATION', `eleve:${data.matricule}`, ip);

    res.json({
      success: true,
      message: 'Élève inscrit avec succès (préinscription validée)',
      data: eleve
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
});

// ═══ REJECT PRE-REGISTRATION (ADMIN only) ═══
router.delete('/pre-register/:tempMatricule', requireRole(['ADMIN']), async (req, res, next) => {
  const { tempMatricule } = req.params;
  const ip = req.ip || 'unknown';
  try {
    const eleve = await Eleve.findOne({
      where: { matricule: tempMatricule, statut: 'PRE_INSCRIT', isDelete: false }
    });
    if (!eleve) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Préinscription introuvable' } });
      return;
    }
    await eleve.update({ isDelete: true });
    logAction(req.user!.id, 'REJECT_PRE_REGISTRATION', `eleve:${tempMatricule}`, ip);
    res.json({ success: true, message: 'Préinscription rejetée' });
  } catch (err) {
    next(err);
  }
});

// ═══ LIST PRE-REGISTRATIONS (ADMIN only) ═══
router.get('/pre-registrations', requireRole(['ADMIN']), async (req, res, next) => {
  try {
    const list = await Eleve.findAll({
      where: { statut: 'PRE_INSCRIT', isDelete: false },
      include: [{ model: Parents, as: 'parents', include: [{ model: Personne, as: 'personne' }] }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// ═══ FULL REGISTRATION (ADMIN only — direct inscription) ═══
router.post('/register', requireRole(['ADMIN','ADMIN_INSCRIPTIONS','ADMIN_SCOLARITE']), validateBody(registerStudentSchema), async (req, res, next) => {
  const data = req.body;
  const ip = req.ip || 'unknown';
  const t = await sequelize.transaction();

  try {
    // 0. Resolve string names to IDs
    const [ville] = await sequelize.models.VilleNaissance.findOrCreate({ where: { libelle: data.idVilleNaissance }, transaction: t });
    
    // For Salle, we need a Classe. If Classe 1 doesn't exist, we fallback.
      let defaultClasse = await sequelize.models.Classe.findOne({ transaction: t });
      if (!defaultClasse) {
        const [cycle] = await sequelize.models.Cycle.findOrCreate({ where: { libelle: 'Primaire' }, transaction: t });
        defaultClasse = await sequelize.models.Classe.create({ libelle: 'Classe par défaut', idCycle: (cycle as any).idCycle || cycle.get('idCycle'), section: 'FRANCOPHONE' }, { transaction: t });
      }
    const [salle] = await sequelize.models.Salle.findOrCreate({ 
      where: { libelle: data.idSalle }, 
      defaults: { idClasse: (defaultClasse as any).idClasse, surface: 0, position: 'N/A' },
      transaction: t 
    });

    const [annee] = await sequelize.models.AnneeAcademique.findOrCreate({ 
      where: { libelle: data.idAcademi }, 
      defaults: { courante: true },
      transaction: t 
    });

    const [quartier] = await sequelize.models.Quartier.findOrCreate({ where: { libelle: data.idQuartier }, transaction: t });

    // 1. Create Eleve (statut = INSCRIT by default)
    const eleve = await Eleve.create(
      {
        matricule: data.matricule,
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        idVilleNaissance: (ville as any).get ? (ville as any).get('idVille') : (ville as any).idVille,
        lieuNaissance: data.idVilleNaissance,
        langue: data.langue,
        photo: data.photo || null,
        statut: 'INSCRIT',
        idAdmin: req.user!.id
      },
      { transaction: t }
    );

    // 2. Create Frequente
    await Frequente.create(
      {
        idSalle: (salle as any).get ? (salle as any).get('idSalle') : (salle as any).idSalle,
        idAcademi: (annee as any).get ? (annee as any).get('idAnnee') : (annee as any).idAnnee,
        matricule: data.matricule
      },
      { transaction: t }
    );

    // 3. Handle Parent Creation or Link
    let parentId = data.idPersParent;
    if (!parentId && data.parentInfo) {
      // Create new parent Personne
      const genPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await require('../../lib/bcrypt').hashPassword(genPassword);
      // login: prenom.nom or email prefix
      const genLogin = data.parentInfo.email.split('@')[0] + Math.floor(Math.random() * 1000);
      
      const newParent = await Personne.create({
        nom: data.parentInfo.nom,
        prenom: data.parentInfo.prenom || '',
        sexe: 'M', // default or extract
        dateNaissance: new Date().toISOString().split('T')[0],
        idVilleNaissance: (ville as any).idVille,
        telephone1: data.parentInfo.telephone,
        email: data.parentInfo.email,
        typePersonne: 2, // PARENT
        login: genLogin,
        password: hashedPassword,
        actif: true
      }, { transaction: t });
      
      parentId = newParent.idPers;
      
      // Send real email via mailer service
      const subject = 'Vos identifiants DIGISCHOOL';
      const emailContent = `
        <h3>Bienvenue sur DIGISCHOOL, ${data.parentInfo.nom} !</h3>
        <p>Votre compte Parent a été créé avec succès.</p>
        <p>Voici vos identifiants de connexion pour accéder à la plateforme :</p>
        <ul>
          <li><strong>Login :</strong> ${genLogin}</li>
          <li><strong>Mot de passe :</strong> ${genPassword}</li>
        </ul>
        <p><i>Pour des raisons de sécurité, nous vous conseillons de changer ce mot de passe lors de votre première connexion.</i></p>
      `;
      await require('../../lib/mailer').sendInternalMail(data.parentInfo.email, subject, emailContent);
    }

    if (parentId) {
      await Parents.create(
        {
          idPers: parentId,
          matricule: data.matricule
        },
        { transaction: t }
      );
    }

    // 4. Create Residents
    if (parentId) {
      await Residents.create(
        {
          idPers: parentId,
          idQuartier: (quartier as any).get ? (quartier as any).get('idQuartier') : (quartier as any).idQuartier
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
router.get('/', requireRole(['ROOT','ADMIN_ROOT','ADMIN_INSCRIPTIONS','ADMIN_SCOLARITE','FONDATEUR','DIRECTEUR','ADMIN','TEACHER']), async (req, res, next) => {
  try {
    const list = await Eleve.findAll({
      where: { isDelete: false },
      include: [
        {
          model: Frequente,
          as: 'frequentations',
          required: false,
          include: [
            {
              model: sequelize.models.Salle,
              as: 'salle',
              required: false,
              include: [{ model: sequelize.models.Classe, as: 'classe', required: false }]
            }
          ]
        }
      ],
      order: [['nom', 'ASC']]
    });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// CRUD - GET BY MATRICULE
router.get('/:matricule', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE', 'TEACHER', 'PARENT']), async (req, res, next) => {
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
router.put('/:matricule', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE']), async (req, res, next) => {
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
router.delete('/:matricule', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE']), async (req, res, next) => {
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
router.post('/assign-room', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE']), async (req, res, next) => {
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
