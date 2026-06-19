import { z } from 'zod';

// ─── Single Grade Entry ─────────────────────────────────────────────

export const gradeEntrySchema = z.object({
  matricule: z.string().min(1, { message: 'Le matricule est requis' }),
  idEpreuve: z.number().int().positive({ message: 'L\'épreuve est requise' }),
  idCours: z.number().int().positive({ message: 'Le cours est requis' }),
  idSession: z.number().int().positive({ message: 'La session est requise' }),
  note: z.number().min(0, { message: 'La note ne peut pas être négative' }).max(20, { message: 'La note ne peut pas dépasser 20' }),
  appreciation: z.string().optional(),
});

export type GradeEntryInput = z.infer<typeof gradeEntrySchema>;

// ─── Bulk Grade Entry ───────────────────────────────────────────────

export const bulkGradeEntrySchema = z.object({
  idCours: z.number().int().positive(),
  idEpreuve: z.number().int().positive(),
  idSession: z.number().int().positive(),
  notes: z.array(z.object({
    matricule: z.string().min(1),
    note: z.number().min(0).max(20),
    appreciation: z.string().optional(),
  })).min(1, { message: 'Au moins une note est requise' }),
});

export type BulkGradeEntryInput = z.infer<typeof bulkGradeEntrySchema>;
