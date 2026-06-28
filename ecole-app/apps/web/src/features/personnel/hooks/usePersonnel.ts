import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const usePersonnel = () => {
  const queryClient = useQueryClient();

  const fetchPersonnel = useQuery({
    queryKey: ['personnel'],
    queryFn: async () => {
      const res = await api.get('/personnel');
      return res.data.data;
    }
  });

  const createPersonnel = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/personnel', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personnel'] });
    }
  });

  return {
    personnel: fetchPersonnel.data || [],
    isLoading: fetchPersonnel.isLoading,
    createPersonnel: createPersonnel.mutateAsync,
  };
};
