import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { useStudents } from '../hooks/useStudents';
import { useToast } from '../../../shared/components/ui/Toast';
import { UserPlus, ArrowLeft, CheckCircle } from 'lucide-react';

export const PreRegistrationPage: React.FC = () => {
  const { preRegisterStudent } = useStudents();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await preRegisterStudent({
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        idVilleNaissance: Number(data.idVilleNaissance),
        langue: data.langue || 'fr',
        idQuartier: Number(data.idQuartier)
      });
      setSubmitted(true);
      toast({ type: 'success', title: 'Préinscription envoyée', description: 'Votre demande sera examinée par l\'administration.' });
    } catch (err: any) {
      toast({ type: 'danger', title: 'Échec', description: err.response?.data?.error?.message || 'Une erreur est survenue' });
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-12 text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Préinscription Envoyée !</h1>
        <p className="text-slate-500 font-medium">
          Votre demande de préinscription a été soumise avec succès.<br />
          L'administration examinera votre dossier et vous serez notifié une fois validé.
        </p>
        <Button variant="outline" onClick={() => navigate('/parent/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour au tableau de bord
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-digi-purple to-digi-purple-dark flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Préinscription de votre enfant</h1>
          <p className="text-sm text-slate-400 font-semibold">Remplissez les informations de base — l'administration finalisera l'inscription</p>
        </div>
      </div>

      <Card className="shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">État Civil de l'enfant</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nom" placeholder="Nom de l'enfant" required {...register('nom')} />
            <Input label="Prénom" placeholder="Prénom de l'enfant" required {...register('prenom')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="date" label="Date de naissance" required {...register('dateNaissance')} />
            <Input type="number" label="ID Ville de Naissance" required {...register('idVilleNaissance')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Langue (fr/en)" defaultValue="fr" required {...register('langue')} />
            <Input type="number" label="ID Quartier de Résidence" required {...register('idQuartier')} />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/parent/dashboard')}>Annuler</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours…' : 'Soumettre la préinscription'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default PreRegistrationPage;
