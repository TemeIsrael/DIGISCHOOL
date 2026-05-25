import { z } from 'zod';

// ─── Create Message ─────────────────────────────────────────────────

export const createMessageSchema = z.object({
  objet: z.string().min(1, { message: 'L\'objet est requis' }).max(200, { message: 'L\'objet ne peut pas dépasser 200 caractères' }),
  contenu: z.string().min(1, { message: 'Le contenu est requis' }).max(5000, { message: 'Le contenu ne peut pas dépasser 5000 caractères' }),
  type: z.number().int().min(0),
  destinataires: z.array(z.number().int().positive()).optional(),
  idParent: z.number().int().optional(),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;
