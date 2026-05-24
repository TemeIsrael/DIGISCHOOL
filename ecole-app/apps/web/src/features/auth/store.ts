import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSession } from '../../shared/types/auth';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserSession | null;
  role: 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT' | null;
  isAuthenticated: boolean;
  setAuth: (data: { accessToken: string; refreshToken: string; user: UserSession }) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      role: null,
      isAuthenticated: false,
      setAuth: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
          role: data.user.role,
          isAuthenticated: true
        }),
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          role: null,
          isAuthenticated: false
        })
    }),
    {
      name: 'ecole-app-auth-storage'
    }
  )
);
