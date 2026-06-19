// ─── User Types ─────────────────────────────────────────────────────

export interface AdminUser {
  ID: number;
  login: string;
  typeAdmin: number;
  actif: boolean;
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  dateCreation?: string;
}

export interface PersonneUser {
  idPers: number;
  login: string;
  typePersonne: number;
  actif: boolean;
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  dateCreation?: string;
}

export interface UserProfile {
  id: number;
  login: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  photo?: string | null;
  role: string;
  typeAdmin?: number;
  typePersonne?: number;
  actif: boolean;
  dateCreation: string;
  dernierAcces?: string;
}

export interface UserCreateInput {
  login: string;
  password: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  role: string;
  typeAdmin?: number;
  typePersonne?: number;
}

export interface UserUpdateInput {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  actif?: boolean;
}
