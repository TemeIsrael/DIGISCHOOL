// Re-export shared types and extend for frontend-specific needs
export type { UserSession, LoginResponse, AuthState, ChangePasswordInput, TokenPayload } from '@ecole-app/shared';
export type { UserRole } from '@ecole-app/shared';

// ─── Frontend-specific Auth Types ───────────────────────────────────

export interface AuthStoreState {
  accessToken: string | null;
  refreshToken: string | null;
  user: import('@ecole-app/shared').UserSession | null;
  role: import('@ecole-app/shared').UserRole | null;
  isAuthenticated: boolean;
  setAuth: (data: { accessToken: string; refreshToken: string; user: import('@ecole-app/shared').UserSession }) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export interface LoginFormValues {
  login: string;
  password: string;
  role: string;
}
