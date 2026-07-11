import { UserRole } from './roles';

// ─── Auth Types ─────────────────────────────────────────────────────

export interface UserSession {
  id: number;
  login: string;
  role: UserRole;
  typeAdmin?: number;
  typePersonne?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  photoUrl?: string;
  langue?: string;
  idALNYA?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserSession;
}

export interface TokenPayload {
  sub: number;       // user id
  login: string;
  role: UserRole;
  typeAdmin?: number;
  typePersonne?: number;
  iat: number;
  exp: number;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserSession | null;
  isAuthenticated: boolean;
}

// ChangePasswordInput is inferred from the Zod schema in schemas/auth.ts
