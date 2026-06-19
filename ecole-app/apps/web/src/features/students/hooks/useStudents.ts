import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const useStudents = () => {
  const queryClient = useQueryClient();

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

  const preRegisterStudent = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/students/pre-register', data);
      return res.data;
    }
  });

  const fetchPreRegistrations = useQuery({
    queryKey: ['pre-registrations'],
    queryFn: async () => {
      const res = await api.get('/students/pre-registrations');
      return res.data.data;
    },
    enabled: false // Only fetch when explicitly triggered
  });

  const validatePreRegistration = useMutation({
    mutationFn: async ({ tempMatricule, data }: { tempMatricule: string; data: any }) => {
      const res = await api.put(`/students/validate/${tempMatricule}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pre-registrations'] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    }
  });

  const rejectPreRegistration = useMutation({
    mutationFn: async (tempMatricule: string) => {
      const res = await api.delete(`/students/pre-register/${tempMatricule}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pre-registrations'] });
    }
  });

  return {
    students: fetchStudents.data || [],
    isLoading: fetchStudents.isLoading,
    registerStudent: registerStudent.mutateAsync,
    preRegisterStudent: preRegisterStudent.mutateAsync,
    preRegistrations: fetchPreRegistrations.data || [],
    isLoadingPreReg: fetchPreRegistrations.isLoading,
    refetchPreRegistrations: fetchPreRegistrations.refetch,
    validatePreRegistration: validatePreRegistration.mutateAsync,
    rejectPreRegistration: rejectPreRegistration.mutateAsync
  };
};
