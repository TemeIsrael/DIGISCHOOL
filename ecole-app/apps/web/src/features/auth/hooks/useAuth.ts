import { useMutation } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';
import { useAuthStore, getRoleDashboardPath } from '../store';
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

  const changePasswordMutation = useMutation({
    mutationFn: async (data: { oldPassword: string; newPassword: string }) => {
      const response = await api.post('/auth/change-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        type: 'success',
        title: 'Mot de passe modifié',
        description: 'Votre mot de passe a été mis à jour avec succès.'
      });
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error?.message ||
        'Échec de la modification. Vérifiez votre ancien mot de passe.';
      toast({
        type: 'danger',
        title: 'Erreur',
        description: msg
      });
    }
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: { login: string }) => {
      const response = await api.post('/auth/forgot-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        type: 'success',
        title: 'Demande envoyée',
        description: 'Votre demande de réinitialisation a été transmise à l\'administrateur.'
      });
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error?.message ||
        'Une erreur est survenue lors de la demande. Veuillez réessayer.';
      toast({
        type: 'danger',
        title: 'Erreur',
        description: msg
      });
    }
  });

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    changePassword: changePasswordMutation.mutateAsync,
    isChangingPassword: changePasswordMutation.isPending,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    isSendingReset: forgotPasswordMutation.isPending,
    getRoleDashboardPath,
  };
};
