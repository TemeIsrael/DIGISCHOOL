// Re-export shared types
export type { Payment, PaymentCreateInput, PaymentSummary, PaymentByStudent, PaymentMode, TrancheFrais } from '@ecole-app/shared';
export type { PaymentStatus } from '@ecole-app/shared';

// ─── Frontend-specific Payment Types ────────────────────────────────

export interface PaymentListFilters {
  search?: string;
  status?: string;
  idAca?: number;
  idMode?: number;
  dateDebut?: string;
  dateFin?: string;
}

export interface PaymentTableRow {
  idPaie: number;
  matricule: string;
  nomEleve: string;
  prenomEleve: string;
  classe: string;
  montant: number;
  date: string;
  mode: string;
  tranche: number;
  status: string;
}

export type PaymentStatusBadge = 'success' | 'warning' | 'danger';

export const PAYMENT_STATUS_MAP: Record<string, { label: string; badge: PaymentStatusBadge }> = {
  COMPLET: { label: 'Complet', badge: 'success' },
  PARTIEL: { label: 'Partiel', badge: 'warning' },
  IMPAYE: { label: 'Impayé', badge: 'danger' },
};
