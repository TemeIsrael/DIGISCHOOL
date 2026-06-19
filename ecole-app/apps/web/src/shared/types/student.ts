// Re-export shared types
export type { Student, StudentWithClass, StudentCreateInput, StudentUpdateInput, ParentInfo, StudentAssignment } from '@ecole-app/shared';

// ─── Frontend-specific Student Types ────────────────────────────────

export interface StudentListFilters {
  search?: string;
  idSalle?: number;
  idClasse?: number;
  actif?: boolean;
  langue?: string;
}

export interface StudentTableRow {
  matricule: string;
  nom: string;
  prenom: string;
  classe: string;
  salle: string;
  dateNaissance: string;
  actif: boolean;
  photo: string | null;
}
