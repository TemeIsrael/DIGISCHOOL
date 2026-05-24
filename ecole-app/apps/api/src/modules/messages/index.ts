import { Router } from 'express';
import { z } from 'zod';
import { Messages, Parents } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole, requireAdminType } from '../../middlewares/rbac';
import { validateBody } from '../../middlewares/validate';
import { ADMIN_TYPES } from '../../config/constants';

const router = Router();

const sendMessageSchema = z.object({
  idParent: z.number(),
  objet: z.string().min(3),
  contenu: z.string().min(5),
  type: z.number().min(0).max(2)
});

router.use(authenticate);

// 1. CREATE MESSAGE (Rule: Message type 1 → champ valider=false jusqu'à validation Directeur)
router.post('/', requireRole(['ADMIN', 'TEACHER']), validateBody(sendMessageSchema), async (req, res, next) => {
  const { idParent, objet, contenu, type } = req.body;
  try {
    const parent = await Parents.findByPk(idParent);
    if (!parent) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Parent introuvable' } });
      return;
    }

    // Default validation: if type is 1, set valider = false, otherwise true
    const valider = type === 1 ? false : true;

    const message = await Messages.create({
      idParent,
      objet,
      contenu,
      type,
      valider,
      lu: false
    });

    res.status(201).json({
      success: true,
      message: valider
        ? 'Message envoyé avec succès'
        : 'Message de type 1 enregistré en attente de validation par le Directeur',
      data: message
    });
  } catch (err) {
    next(err);
  }
});

// 2. VALIDATE MESSAGE (Only Director [ADMIN type 1])
router.post('/:id/validate', requireRole(['ADMIN']), requireAdminType([ADMIN_TYPES.DIRECTEUR]), async (req, res, next) => {
  const { id } = req.params;
  try {
    const message = await Messages.findByPk(id);
    if (!message) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Message introuvable' } });
      return;
    }

    message.valider = true;
    await message.save();

    res.json({
      success: true,
      message: 'Message validé et expédié avec succès',
      data: message
    });
  } catch (err) {
    next(err);
  }
});

// 3. GET PARENT MESSAGES
router.get('/parent/:idParent', requireRole(['ADMIN', 'PARENT']), async (req, res, next) => {
  const { idParent } = req.params;
  try {
    // Only return validated messages
    const list = await Messages.findAll({
      where: {
        idParent,
        valider: true
      }
    });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// 4. MARK AS READ
router.post('/:id/read', requireRole(['PARENT']), async (req, res, next) => {
  const { id } = req.params;
  try {
    const message = await Messages.findByPk(id);
    if (!message) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Message introuvable' } });
      return;
    }

    message.lu = true;
    await message.save();

    res.json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
});

export default router;
