import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const useParents = () => {
  const fetchParents = useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const res = await api.get('/personnel/parents');
      return res.data.data;
    }
  });

  return {
    parents: fetchParents.data || [],
    isLoading: fetchParents.isLoading,
  };
};
