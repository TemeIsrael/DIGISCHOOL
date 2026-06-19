// Re-export shared types
export type { AdminUser, PersonneUser, UserProfile, UserCreateInput, UserUpdateInput } from '@ecole-app/shared';
export { AdminSubType, ADMIN_SUB_TYPE_LABELS, PersonneType, PERSONNE_TYPE_LABELS } from '@ecole-app/shared';

// ─── Frontend-specific User Types ───────────────────────────────────

export interface UserListFilters {
  search?: string;
  role?: string;
  actif?: boolean;
  typeAdmin?: number;
}

export interface UserTableRow {
  id: number;
  login: string;
  nom: string;
  prenom: string;
  role: string;
  typeLabel: string;
  actif: boolean;
  dernierAcces?: string;
}
