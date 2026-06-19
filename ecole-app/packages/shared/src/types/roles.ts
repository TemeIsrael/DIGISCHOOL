// ─── User Roles ─────────────────────────────────────────────────────

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export const ROLES: Record<UserRole, UserRole> = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
};

// ─── Admin Sub-Types ────────────────────────────────────────────────
// Maps to the `typeAdmin` field in the database

export enum AdminSubType {
  ROOT = 0,
  SECRETARIAT = 1,
  SCOLARITE = 2,
  FONDATEUR = 3,
  DIRECTEUR = 4,
  AUDITEUR = 5,
}

export const ADMIN_SUB_TYPE_LABELS: Record<AdminSubType, string> = {
  [AdminSubType.ROOT]: 'Super Admin',
  [AdminSubType.SECRETARIAT]: 'Secrétariat',
  [AdminSubType.SCOLARITE]: 'Scolarité',
  [AdminSubType.FONDATEUR]: 'Fondateur',
  [AdminSubType.DIRECTEUR]: 'Directeur',
  [AdminSubType.AUDITEUR]: 'Auditeur',
};

// ─── Personnel Types ────────────────────────────────────────────────
// Maps to the `typePersonne` field in the database

export enum PersonneType {
  ENSEIGNANT = 1,
  PARENT = 2,
}

export const PERSONNE_TYPE_LABELS: Record<PersonneType, string> = {
  [PersonneType.ENSEIGNANT]: 'Enseignant',
  [PersonneType.PARENT]: 'Parent',
};

// ─── Role Label Helper ──────────────────────────────────────────────

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrateur',
  TEACHER: 'Enseignant',
  STUDENT: 'Élève',
  PARENT: 'Parent',
};
