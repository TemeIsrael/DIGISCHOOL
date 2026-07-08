import { useMutation } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const useEvaluations = () => {
  const submitGrades = useMutation({
    mutationFn: async (data: { evaluations: any[] }) => {
      const res = await api.post('/evaluations/bulk', data);
      return res.data;
    }
  });

  return {
    submitGrades: submitGrades.mutateAsync,
    isSubmitting: submitGrades.isPending,
  };
};
