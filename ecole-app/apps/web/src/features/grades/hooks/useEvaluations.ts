import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const useEvaluations = (idSession?: number, idCours?: number) => {
  const queryClient = useQueryClient();

  const getEvaluations = useQuery({
    queryKey: ['evaluations', idSession, idCours],
    queryFn: async () => {
      const res = await api.get('/evaluations', { params: { idSession, idCours } });
      return res.data.data;
    },
    enabled: !!idSession && !!idCours
  });

  const submitGrades = useMutation({
    mutationFn: async (data: { evaluations: any[] }) => {
      const res = await api.post('/evaluations/bulk', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evaluations'] });
    }
  });

  return {
    evaluations: getEvaluations.data,
    isLoadingEvaluations: getEvaluations.isLoading,
    submitGrades: submitGrades.mutateAsync,
    isSubmitting: submitGrades.isPending,
  };
};
