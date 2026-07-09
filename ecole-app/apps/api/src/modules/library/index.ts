import { Router } from 'express';
import { z } from 'zod';
import { Livres } from '../../db/models';
import { authenticate } from '../../middlewares/auth';
import { requireRole } from '../../middlewares/rbac';
import { validateBody } from '../../middlewares/validate';

const router = Router();

const createBookSchema = z.object({
  idSpecialite: z.number(),
  titre: z.string().min(2),
  auteur: z.string().min(2),
  fichierUrl: z.string(),
  specialty: z.string().optional()
});

router.use(authenticate);

// 1. ADD BOOK
router.post('/', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE']), validateBody(createBookSchema), async (req, res, next) => {
  try {
    const book = await Livres.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
});

// 2. GET ALL BOOKS
router.get('/', async (req, res, next) => {
  try {
    const list = await Livres.findAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
});

// 3. GET DOWNLOAD URL
router.get('/:id/download', async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Livres.findByPk(id);
    if (!book) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Livre introuvable' } });
      return;
    }
    res.json({ success: true, data: { downloadUrl: book.fichierUrl } });
  } catch (err) {
    next(err);
  }
});

// 4. DELETE BOOK
router.delete('/:id', requireRole(['ADMIN', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE']), async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Livres.findByPk(id);
    if (!book) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Livre introuvable' } });
      return;
    }
    await book.destroy();
    res.json({ success: true, message: 'Livre supprimé de la bibliothèque' });
  } catch (err) {
    next(err);
  }
});

export default router;
