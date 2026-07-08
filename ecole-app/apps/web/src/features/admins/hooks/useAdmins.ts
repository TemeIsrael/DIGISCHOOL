import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const useAdmins = () => {
  const queryClient = useQueryClient();

  const fetchAdmins = useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const res = await api.get('/admins');
      return res.data.data;
    }
  });

  const createAdmin = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/admins', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    }
  });

  const updateAdmin = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await api.put(`/admins/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    }
  });

  const deleteAdmin = useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/admins/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    }
  });

  return {
    admins: fetchAdmins.data || [],
    isLoading: fetchAdmins.isLoading,
    createAdmin: createAdmin.mutateAsync,
    updateAdmin: updateAdmin.mutateAsync,
    deleteAdmin: deleteAdmin.mutateAsync,
    refetchAdmins: fetchAdmins.refetch
  };
};
