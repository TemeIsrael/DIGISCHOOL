import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const useStudents = () => {
  const fetchStudents = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await api.get('/students');
      return res.data.data;
    }
  });

  const registerStudent = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/students/register', data);
      return res.data.data;
    }
  });

  return {
    students: fetchStudents.data || [],
    isLoading: fetchStudents.isLoading,
    registerStudent: registerStudent.mutateAsync
  };
};
