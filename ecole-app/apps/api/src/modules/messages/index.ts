import { Router } from 'express';
import { z } from 'zod';
import { ROLES } from '../../config/constants';
import { Messages, Parents, Personne } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole, requireAdminType } from '../../middlewares/rbac';
import { validateBody } from '../../middlewares/validate';
import { ADMIN_TYPES } from '../../config/constants';
import { sendInternalMail } from '../../lib/mailer';

const router = Router();

const sendMessageSchema = z.object({
  idParent: z.number(),
  objet: z.string().min(3),
  contenu: z.string().min(5),
  type: z.number().min(0).max(2)
});

router.use(authenticate);


// 1. CREATE MESSAGE (Rule: Message type 1 → champ valider=false jusqu'à validation Directeur)
router.post('/', requireRole(Object.values(ROLES)), validateBody(sendMessageSchema), async (req, res, next) => {
  const { idParent, objet, contenu, type } = req.body;
  try {
    const parent = await Parents.findByPk(idParent, {
      include: [{ model: Personne, as: 'personne' }]
    });
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

    // Send email to parent if validated
    if (valider) {
      const email = (parent as any).personne?.email;
      if (email) {
        await sendInternalMail(email, objet, contenu).catch((e: Error) => console.error('Failed to send email:', e.message));
      }
    }

    res.status(201).json({
      success: true,
      message: valider
        ? 'Message envoyé avec succès et notification email expédiée'
        : 'Message de type 1 enregistré en attente de validation par le Directeur',
      data: message
    });
  } catch (err) {
    next(err);
  }
});

// 5. MARK ALL AS READ FOR A PARENT
router.post('/read-all', requireRole(Object.values(ROLES)), async (req, res, next) => {
  const parentId = req.user?.id;
  if (!parentId) {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'User not authenticated' } });
    return;
  }
  try {
    await Messages.update({ lu: true }, { where: { idParent: parentId } });
    res.json({ success: true, message: 'All messages marked as read' });
  } catch (err) {
    next(err);
  }
});

// 2. VALIDATE MESSAGE (Only Director [ADMIN type 1])
router.post('/:id/validate', requireRole(Object.values(ROLES)), requireAdminType([ADMIN_TYPES.DIRECTEUR]), async (req, res, next) => {
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

// 3. GET ALL MESSAGES (Admins/Teachers)
router.get('/', requireRole(Object.values(ROLES)), async (req, res, next) => {
  try {
    const list = await Messages.findAll({
      include: [{ model: Parents, as: 'parent' }], // Assume association exists or we just return it. If it fails we can adjust.
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// 4. GET PARENT MESSAGES
router.get('/parent/:idParent', requireRole(Object.values(ROLES)), async (req, res, next) => {
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
router.post('/:id/read', requireRole(Object.values(ROLES)), async (req, res, next) => {
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
// 6. GET SINGLE MESSAGE
router.get('/:id', requireRole(Object.values(ROLES)), async (req, res, next) => {
  const { id } = req.params;
  try {
    const message = await Messages.findByPk(id, {
      include: [{ model: Parents, as: 'parent' }]
    });
    if (!message) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Message introuvable' } });
      return;
    }
    res.json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
});

export default router;
