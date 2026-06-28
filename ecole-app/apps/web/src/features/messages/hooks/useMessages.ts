import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const useMessages = () => {
  const queryClient = useQueryClient();

  const fetchMessages = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await api.get('/messages');
      return res.data.data;
    }
  });

  const sendMessage = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/messages', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  return {
    messages: fetchMessages.data || [],
    isLoading: fetchMessages.isLoading,
    sendMessage: sendMessage.mutateAsync,
  };
};
