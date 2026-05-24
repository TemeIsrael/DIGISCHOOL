import { useMutation } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';
import { useAuthStore } from '../store';
import { useToast } from '../../../shared/components/ui/Toast';

export const useAuth = () => {
  const { setAuth, logout: storeLogout } = useAuthStore();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: Record<string, any>) => {
      const response = await api.post('/auth/login', credentials);
      return response.data.data;
    },
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user
      });
      toast({
        type: 'success',
        title: 'Connexion réussie',
        description: `Ravi de vous revoir, ${data.user.login} !`
      });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error?.message || 'Identifiants ou rôle incorrects';
      toast({
        type: 'danger',
        title: 'Échec de connexion',
        description: msg
      });
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async (refreshToken: string) => {
      await api.post('/auth/logout', { refreshToken });
    },
    onSuccess: () => {
      storeLogout();
    },
    onError: () => {
      // In case api logout fails, perform local clean anyway
      storeLogout();
    }
  });

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutateAsync
  };
};
