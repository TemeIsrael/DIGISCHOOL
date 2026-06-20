import { UserRole } from '@ecole-app/shared';

export const ROLES: Record<UserRole, UserRole> = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
  ROOT: 'ROOT',
  ADMIN_ROOT: 'ADMIN_ROOT',
  ADMIN_INSCRIPTIONS: 'ADMIN_INSCRIPTIONS',
  ADMIN_SCOLARITE: 'ADMIN_SCOLARITE',
  FONDATEUR: 'FONDATEUR',
  DIRECTEUR: 'DIRECTEUR',
};

export const ADMIN_TYPES = {
  SUPER: 0,
  DIRECTEUR: 1,
  COMPTABLE: 2,
  SURVEILLANT: 3,
  BIBLIOTHECAIRE: 4,
  SECRETAIRE: 5
} as const;

export const PERSONNE_TYPES = {
  TEACHER: 1,
  PARENT: 2,
  OTHER: 4
} as const;

export const MESSAGE_TYPES = {
  INFO: 0,
  ALERT: 1,
  CONVOCATION: 2
} as const;

export const LIMITS = {
  MAX_UPLOAD_SIZE: 10 * 1024 * 1024, // 10MB
  RATE_LIMIT_MAX_ATTEMPTS: 50,
  RATE_LIMIT_WINDOW_MS: 10 * 60 * 1000 // 10 minutes
};

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg'
];
