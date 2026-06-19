import { z } from 'zod';

// ─── Create Payment ─────────────────────────────────────────────────

export const createPaymentSchema = z.object({
  matricule: z.string().min(1, { message: 'Le matricule de l\'élève est requis' }),
  idAca: z.number().int().positive({ message: 'L\'année académique est requise' }),
  idMode: z.number().int().positive({ message: 'Le mode de paiement est requis' }),
  montant: z.number().positive({ message: 'Le montant doit être positif' }),
  date: z.string().min(1, { message: 'La date est requise' }),
  trancheCouverte: z.number().int().min(0, { message: 'La tranche est requise' }),
  justificatifUrl: z.string().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
