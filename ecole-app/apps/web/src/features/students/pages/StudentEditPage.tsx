import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';
import { Loader2 } from 'lucide-react';
import { FileUpload } from '../../../shared/components/forms/FileUpload';
import { useToast } from '../../../shared/components/ui/Toast';

export const StudentEditPage: React.FC = () => {
  const { matricule } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    photo: '',
    classe: '',
    niveau: '',
    section: ''
  });

  const { data: student, isLoading } = useQuery({
    queryKey: ['student', matricule],
    queryFn: async () => {
      const res = await api.get(`/students/${matricule}`);
      return res.data.data;
    },
    enabled: !!matricule,
  });

  useEffect(() => {
    if (student) {
      const frequente = student.frequentations?.[0];
      setFormData({
        nom: student.nom || '',
        prenom: student.prenom || '',
        photo: student.photo || '',
        classe: frequente?.salle?.classe?.libelle || '',
        niveau: frequente?.salle?.classe?.idCycle || '',
        section: frequente?.salle?.classe?.section || ''
      });
    }
  }, [student]);

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      // Note: updating frequente (classe/niveau/section) might require a separate endpoint like /assign-room
      // For now, we update the student base info and photo
      const res = await api.put(`/students/${matricule}`, {
        nom: data.nom,
        prenom: data.prenom,
        photo: data.photo
      });
      return res.data;
    },
    onSuccess: () => {
      toast({ type: 'success', title: 'Succès', description: 'Élève mis à jour' });
      queryClient.invalidateQueries({ queryKey: ['student', matricule] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      navigate(`/students/detail/${matricule}`);
    },
    onError: () => {
      toast({ type: 'danger', title: 'Erreur', description: 'Échec de la modification' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-digi-purple" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Modifier l'Élève &mdash; {matricule}</h1>
      <Card className="shadow-sm border border-slate-100">
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Photo de profil</label>
            <FileUpload
              onUploadSuccess={(url) => setFormData({ ...formData, photo: url })}
              accept="image/*"
              maxSize={5}
            />
            {formData.photo && (
              <div className="mt-2">
                <img src={formData.photo} alt="Aperçu" className="w-16 h-16 rounded-full object-cover border" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Nom" 
              value={formData.nom} 
              onChange={e => setFormData({ ...formData, nom: e.target.value })} 
            />
            <Input 
              label="Prénom" 
              value={formData.prenom} 
              onChange={e => setFormData({ ...formData, prenom: e.target.value })} 
            />
          </div>

          <div className="grid grid-cols-3 gap-4 border-t pt-4">
            <Input 
              label="Classe" 
              value={formData.classe} 
              disabled // usually modified via class assignment workflow
            />
            <Input 
              label="Niveau" 
              value={formData.niveau} 
              disabled
            />
            <Input 
              label="Section" 
              value={formData.section} 
              disabled
            />
          </div>
          <p className="text-xs text-slate-400 italic">
            * La classe, le niveau et la section sont modifiés via l'assignation de salle.
          </p>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate(`/students/detail/${matricule}`)}>Annuler</Button>
            <Button type="submit" isLoading={updateMutation.isPending}>Enregistrer les modifications</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default StudentEditPage;
