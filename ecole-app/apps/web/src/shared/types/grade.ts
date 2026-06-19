// Re-export shared types
export type {
  Evaluation, GradeEntry, BulkGradeEntry, CourseAverage,
  SessionInfo, EpreuveInfo, BulletinData, BulletinListItem
} from '@ecole-app/shared';

// ─── Frontend-specific Grade Types ──────────────────────────────────

export interface GradeEntryFilters {
  idCours?: number;
  idSalle?: number;
  idSession?: number;
  idEpreuve?: number;
}

export interface GradeTableRow {
  matricule: string;
  nom: string;
  prenom: string;
  note: number | null;
  appreciation: string;
  isModified: boolean;
}

export interface GradeCellColor {
  bg: string;
  text: string;
}

/**
 * Returns color scheme based on grade value.
 */
export const getGradeColor = (note: number, max: number = 20): GradeCellColor => {
  const ratio = note / max;
  if (ratio >= 0.7) return { bg: 'bg-emerald-50', text: 'text-emerald-700' };
  if (ratio >= 0.5) return { bg: 'bg-amber-50', text: 'text-amber-700' };
  return { bg: 'bg-rose-50', text: 'text-rose-700' };
};
