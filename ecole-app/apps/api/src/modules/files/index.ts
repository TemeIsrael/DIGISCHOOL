import { Router } from 'express';
import { authenticate } from '../../middlewares/auth';
import path from 'path';
import fs from 'fs';
import { env } from '../../config/env';

const router = Router();

// Securely serves media or attachments
router.get('/:filename', authenticate, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(process.cwd(), env.UPLOAD_DIR, filename);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Fichier introuvable' } });
    return;
  }

  // Ensure path is restricted to upload folder to prevent directory traversal
  const resolvedBase = path.resolve(process.cwd(), env.UPLOAD_DIR);
  const resolvedTarget = path.resolve(filePath);

  if (!resolvedTarget.startsWith(resolvedBase)) {
    res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Accès interdit' } });
    return;
  }

  res.sendFile(resolvedTarget);
});

export default router;
