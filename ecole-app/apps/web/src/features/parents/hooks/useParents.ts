import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';

export interface EnfantInfo {
  matricule: string;
  nom: string;
  prenom: string;
  actif: number;
}

export interface ParentInfo {
  idPers: number;
  nom: string;
  prenom: string;
  email: string;
  telephone1: string;
  login: string;
  actif: number;
  photoURL?: string;
  created_at: string;
  parents: Array<{ matricule: string; eleve: EnfantInfo | null }>;
}

export const useParents = () => {
  const fetchParents = useQuery<ParentInfo[]>({
    queryKey: ['parents-list'],
    queryFn: async () => {
      const res = await api.get('/personnel/parents');
      return res.data.data;
    }
  });

  return {
    parents: fetchParents.data || [],
    isLoading: fetchParents.isLoading,
    error: fetchParents.error,
    refetch: fetchParents.refetch
  };
};
