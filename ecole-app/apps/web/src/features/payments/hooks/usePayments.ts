import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const usePayments = () => {
  const queryClient = useQueryClient();

  const fetchPayments = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await api.get('/payments');
      return res.data.data;
    }
  });

  const createPayment = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/payments', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    }
  });

  const cancelPayment = useMutation({
    mutationFn: async (id: number) => {
      const res = await api.post(`/payments/${id}/cancel`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    }
  });

  return {
    payments: fetchPayments.data || [],
    isLoading: fetchPayments.isLoading,
    createPayment: createPayment.mutateAsync,
    cancelPayment: cancelPayment.mutateAsync,
  };
};
