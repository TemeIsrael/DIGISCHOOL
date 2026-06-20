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
    case 'ROOT':
    case 'ADMIN_ROOT':
    case 'ADMIN_INSCRIPTIONS':
    case 'ADMIN_SCOLARITE':
    case 'FONDATEUR':
    case 'DIRECTEUR':
    case 'ADMIN':
      return '/dashboard';
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
  role: 'ADMIN_ROOT' | 'ADMIN_INSCRIPTIONS' | 'ADMIN_SCOLARITE' | 'FONDATEUR' | 'DIRECTEUR' | 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT' | null;
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
      // Reset du stockage persistant – utile pour les tests UI
      resetAuth: () => {
        try {
          localStorage.removeItem('ecole-app-auth-storage');
        } catch (e) {
          // ignore les erreurs dans les environnements sans localStorage
        }
      },

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
