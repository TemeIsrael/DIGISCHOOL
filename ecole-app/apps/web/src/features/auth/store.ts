import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSession } from '../../shared/types/auth';

// ─── Role-based Dashboard Paths ─────────────────────────────────────
export const getRoleDashboardPath = (role: string | null, _typeAdmin?: number, typePersonne?: number): string => {
  switch (role) {
    case 'TEACHER':
      return '/teacher/dashboard';
    case 'PARENT':
      return '/parent/dashboard';
    case 'ADMIN':
      return '/dashboard';
    case 'ROOT':
      return '/dashboardRoot';
    case 'ADMIN_ROOT':
      return '/dashboardAdmin';
    case 'ADMIN_INSCRIPTIONS':
      return '/dashboardAdmin';
    case 'ADMIN_SCOLARITE':
      return '/dashboardScolarite';
    case 'FONDATEUR':
      return '/dashboardFondateur';
    case 'DIRECTEUR':
      return '/dashboardDirecteur';
    default:
      if (typePersonne === 1) return '/teacher/dashboard';
      if (typePersonne === 2) return '/parent/dashboard';
      return '/dashboard';
  }
};

// ─── Store Interface ────────────────────────────────────────────────
interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserSession | null;
  role: 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT' | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  lastActivity: number | null;

  // Actions
  setAuth: (data: { accessToken: string; refreshToken: string; user: UserSession }) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
  setHydrated: () => void;
  touchActivity: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      role: null,
      isAuthenticated: false,
      isHydrated: false,
      lastActivity: null,

      setAuth: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
          role: data.user.role,
          isAuthenticated: true,
          lastActivity: Date.now(),
        }),

      setAccessToken: (token) =>
        set({ accessToken: token }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          role: null,
          isAuthenticated: false,
          lastActivity: null,
        }),

      setHydrated: () =>
        set({ isHydrated: true }),

      touchActivity: () =>
        set({ lastActivity: Date.now() }),
    }),
    {
      name: 'ecole-app-auth-storage',
      onRehydrateStorage: () => (state) => {
        // Mark store as hydrated once rehydration is complete
        state?.setHydrated();
      },
    }
  )
);
