import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { useStudents } from '../hooks/useStudents';
import { useToast } from '../../../shared/components/ui/Toast';

export const StudentNewPage: React.FC = () => {
  const { registerStudent } = useStudents();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Map form fields to register input schema
      await registerStudent({
        matricule: data.matricule,
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        idVilleNaissance: Number(data.idVilleNaissance),
        langue: data.langue || 'fr',
        idSalle: Number(data.idSalle),
        idAcademi: Number(data.idAcademi),
        idPersParent: data.idPersParent ? Number(data.idPersParent) : undefined,
        idQuartier: Number(data.idQuartier)
      });
      toast({ type: 'success', title: 'Inscription réussie', description: 'L\'élève a été inscrit avec toutes ses liaisons.' });
      navigate('/students');
    } catch (err: any) {
      toast({ type: 'danger', title: 'Échec d\'inscription', description: err.response?.data?.error?.message || 'Une erreur est survenue' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Nouvelle Inscription Élève</h1>
      <Card className="shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">État Civil</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nom" placeholder="Nom de l'enfant" required {...register('nom')} />
            <Input label="Prénom" placeholder="Prénom de l'enfant" required {...register('prenom')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Matricule" placeholder="Ex. EL2026-001" required {...register('matricule')} />
            <Input type="date" label="Date de naissance" required {...register('dateNaissance')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" label="ID Ville Naissance" required {...register('idVilleNaissance')} />
            <Input label="Langue (fr/en)" defaultValue="fr" required {...register('langue')} />
          </div>

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-6">Affectation Académique & Logement</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input type="number" label="ID Salle" required {...register('idSalle')} />
            <Input type="number" label="ID Année Académique" required {...register('idAcademi')} />
            <Input type="number" label="ID Quartier Résidence" required {...register('idQuartier')} />
          </div>

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-6">Parent (Optionnel)</h3>
          <Input type="number" label="ID Personne (Parent existant)" {...register('idPersParent')} />

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/students')}>Annuler</Button>
            <Button type="submit">Valider l'inscription</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default StudentNewPage;
