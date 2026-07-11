import { Router } from 'express';
import { z } from 'zod';
import { Personne, Enseignant, Cours } from '../../db/models';
import { Op } from 'sequelize';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';
import { hashPassword } from '../../lib/bcrypt';
import { validateBody } from '../../middlewares/validate';
import { sendInternalMail } from '../../lib/mailer';

const router = Router();

const createPersonneSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
  typePersonne: z.union([z.literal(1), z.literal(2), z.literal(4)]), // 1=Teacher, 2=Parent, 4=Other
  nom: z.string().optional(),
  prenom: z.string().optional(),
});

router.use(authenticate);

// CREATE
router.post('/', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT']), validateBody(createPersonneSchema), async (req, res, next) => {
  const { login, password, typePersonne, nom, prenom } = req.body;
  try {
    const existing = await Personne.findOne({ where: { login } });
    if (existing) {
      res.status(400).json({ error: { code: 'CONFLICT', message: 'Ce login est déjà pris' } });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const personne = await Personne.create({
      login,
      password: hashedPassword,
      typePersonne,
      nom: nom || '',
      prenom: prenom || ''
    });

    res.status(201).json({
      success: true,
      data: {
        idPers: personne.idPers,
        login: personne.login,
        typePersonne: personne.typePersonne,
        nom: personne.nom,
        prenom: personne.prenom,
        actif: personne.actif
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET ALL
router.get('/', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT']), async (req, res, next) => {
  try {
    const list = await Personne.findAll({
      where: { isDelete: false, typePersonne: { [Op.ne]: 2 } },
      attributes: ['idPers', 'idAdmin', 'login', 'typePersonne', 'actif', 'nom', 'prenom'],
      include: [
        {
          model: Enseignant,
          as: 'enseignements',
          required: false,
          include: [
            {
              model: Cours,
              as: 'cours',
              attributes: ['libelle']
            }
          ]
        }
      ]
    });
    
    // Transform to flatten the course name
    const formattedList = list.map((p: any) => {
      const pJson = p.toJSON();
      let matiere = 'N/A';
      if (pJson.enseignements && pJson.enseignements.length > 0 && pJson.enseignements[0].cours) {
        matiere = pJson.enseignements[0].cours.libelle;
      }
      return {
        ...pJson,
        coursLibelle: matiere
      };
    });

    res.json({ success: true, data: formattedList });
  } catch (err) {
    next(err);
  }
});

import { Parents, Eleve } from '../../db/models';

// GET ALL PARENTS (typePersonne=2) with their children
router.get('/parents', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT', 'TEACHER']), async (req, res, next) => {
  try {
    const list = await Personne.findAll({
      where: { typePersonne: 2, isDelete: false },
      attributes: ['idPers', 'nom', 'prenom', 'email', 'telephone1', 'login', 'actif', 'photoURL', 'created_at'],
      include: [
        {
          model: Parents,
          as: 'parents',
          required: false,
          include: [
            {
              model: Eleve,
              as: 'eleve',
              required: false,
              attributes: ['matricule', 'nom', 'prenom', 'actif']
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

// SEND CREDENTIALS
router.post('/:id/send-credentials', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'DIRECTEUR', 'ADMIN_ROOT', 'ROOT']), async (req, res, next) => {
  const { id } = req.params;
  try {
    const personne = await Personne.findOne({ where: { idPers: id, isDelete: false } });
    if (!personne) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Personne introuvable' } });
      return;
    }

    // Send internal mail stub
    await sendInternalMail(
      personne.login,
      'Vos Identifiants de connexion DIGISCHOOL',
      `Bonjour,\n\nVos identifiants de connexion sont :\nLogin: ${personne.login}\n\nMerci de vous connecter pour configurer votre compte.`
    );

    res.json({ success: true, message: 'Identifiants envoyés avec succès via messagerie interne' });
  } catch (err) {
    next(err);
  }
});

export default router;
