import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const useDashboardStats = (role: 'ADMIN' | 'TEACHER' | 'PARENT') => {
  const fetchStats = useQuery({
    queryKey: ['dashboard-stats', role],
    queryFn: async () => {
      const endpoint = role === 'ADMIN' ? '/stats/dashboard' : role === 'TEACHER' ? '/stats/teacher' : '/stats/parent';
      const res = await api.get(endpoint);
      return res.data.data;
    }
  });

  return {
    stats: fetchStats.data,
    isLoading: fetchStats.isLoading,
  };
};
