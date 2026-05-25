import { z } from 'zod';

// ─── Login ──────────────────────────────────────────────────────────

export const loginSchema = z.object({
  login: z.string().min(1, { message: 'Le nom d\'utilisateur est requis' }),
  password: z.string().min(4, { message: 'Le mot de passe doit contenir au moins 4 caractères' }),
  role: z.enum(['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'], {
    required_error: 'Veuillez sélectionner un rôle',
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─── Register ───────────────────────────────────────────────────────

export const registerSchema = z.object({
  nom: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  prenom: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Email invalide' }),
  telephone: z.string().optional(),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
  confirmPassword: z.string(),
  matriculeEnfant: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export type RegisterInput = z.infer<typeof registerSchema>;

// ─── Change Password ────────────────────────────────────────────────

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Le mot de passe actuel est requis' }),
  newPassword: z.string().min(6, { message: 'Le nouveau mot de passe doit contenir au moins 6 caractères' }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
