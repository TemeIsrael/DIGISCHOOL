import { z } from 'zod';

// ─── Create Student ─────────────────────────────────────────────────

export const createStudentSchema = z.object({
  nom: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  prenom: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  dateNaissance: z.string().min(1, { message: 'La date de naissance est requise' }),
  idVilleNaissance: z.number().int().positive({ message: 'La ville de naissance est requise' }),
  langue: z.string().min(1, { message: 'La langue est requise' }),
  sexe: z.enum(['M', 'F'], { required_error: 'Le sexe est requis' }).optional(),
  photo: z.string().optional(),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;

// ─── Update Student ─────────────────────────────────────────────────

export const updateStudentSchema = z.object({
  nom: z.string().min(2).optional(),
  prenom: z.string().min(2).optional(),
  dateNaissance: z.string().optional(),
  idVilleNaissance: z.number().int().positive().optional(),
  langue: z.string().optional(),
  sexe: z.enum(['M', 'F']).optional(),
  photo: z.string().nullable().optional(),
  actif: z.boolean().optional(),
});

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;

// ─── Assign Student to Room ─────────────────────────────────────────

export const assignStudentSchema = z.object({
  matricule: z.string().min(1, { message: 'Le matricule est requis' }),
  idSalle: z.number().int().positive({ message: 'La salle est requise' }),
  idAca: z.number().int().positive({ message: 'L\'année académique est requise' }),
});

export type AssignStudentInput = z.infer<typeof assignStudentSchema>;
