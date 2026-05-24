export interface UserSession {
  id: number;
  login: string;
  role: 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT';
  typeAdmin?: number;
  typePersonne?: number;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserSession | null;
  isAuthenticated: boolean;
}
