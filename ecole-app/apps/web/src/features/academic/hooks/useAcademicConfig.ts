import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export const useAcademicConfig = () => {
  const queryClient = useQueryClient();

  // --- Cycles ---
  const fetchCycles = useQuery({
    queryKey: ['cycles'],
    queryFn: async () => {
      const res = await api.get('/academic/cycles');
      return res.data.data;
    }
  });

  const createCycle = useMutation({
    mutationFn: async (data: { libelle: string; classes?: number }) => {
      const res = await api.post('/academic/cycles', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cycles'] });
    }
  });

  const deleteCycle = useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/academic/cycles/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cycles'] });
    }
  });

  // --- Classes ---
  const fetchClasses = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await api.get('/academic/classes');
      return res.data.data;
    }
  });

  const createClass = useMutation({
    mutationFn: async (data: { idCycle: number; libelle: string; salles?: number; section: string }) => {
      const res = await api.post('/academic/classes', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    }
  });

  // --- Salles ---
  const fetchSalles = useQuery({
    queryKey: ['salles'],
    queryFn: async () => {
      const res = await api.get('/academic/salles');
      return res.data.data;
    }
  });

  const createSalle = useMutation({
    mutationFn: async (data: { idClasse: number; libelle: string; surface: string; position: string }) => {
      const res = await api.post('/academic/salles', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salles'] });
    }
  });

  // --- Years ---
  const fetchYears = useQuery({
    queryKey: ['years'],
    queryFn: async () => {
      const res = await api.get('/academic/years');
      return res.data.data;
    }
  });

  const createYear = useMutation({
    mutationFn: async (data: { libelle: string; courante: boolean }) => {
      const res = await api.post('/academic/years', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['years'] });
    }
  });

  return {
    cycles: fetchCycles.data || [],
    isLoadingCycles: fetchCycles.isLoading,
    createCycle: createCycle.mutateAsync,
    deleteCycle: deleteCycle.mutateAsync,

    classes: fetchClasses.data || [],
    isLoadingClasses: fetchClasses.isLoading,
    createClass: createClass.mutateAsync,

    salles: fetchSalles.data || [],
    isLoadingSalles: fetchSalles.isLoading,
    createSalle: createSalle.mutateAsync,

    years: fetchYears.data || [],
    isLoadingYears: fetchYears.isLoading,
    createYear: createYear.mutateAsync,
  };
};
