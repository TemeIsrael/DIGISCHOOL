import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/lib/api';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Loader2 } from 'lucide-react';

export const StudentDetailPage: React.FC = () => {
  const { matricule } = useParams();
  const navigate = useNavigate();

  const { data: student, isLoading } = useQuery({
    queryKey: ['student', matricule],
    queryFn: async () => {
      const res = await api.get(`/students/${matricule}`);
      return res.data.data;
    },
    enabled: !!matricule,
  });

  if (isLoading) {
    return <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-digi-purple" /></div>;
  }

  if (!student) {
    return <div className="text-center py-8">Élève introuvable</div>;
  }

  // Extract class/section/level info from frequentations
  const frequente = student.frequentations?.[0];
  const classe = frequente?.salle?.classe?.libelle || 'Non assigné';
  const section = frequente?.salle?.classe?.section || 'Non assigné';
  const niveau = frequente?.salle?.classe?.idCycle || 'Non assigné';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Profil Élève &mdash; {matricule}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/students/${matricule}/edit`)}>Modifier</Button>
          <Button variant="outline" onClick={() => navigate('/students')}>Retour</Button>
        </div>
      </div>

      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-50">
          {student.photo ? (
            <img src={student.photo} alt={student.nom} className="w-20 h-20 rounded-full object-cover border-2 border-digi-purple" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-digi-purple-bg text-digi-purple flex items-center justify-center font-extrabold text-2xl">
              {student.nom?.[0]}{student.prenom?.[0]}
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-slate-800">{student.prenom} {student.nom}</h2>
            <p className="text-sm text-slate-400 font-semibold">Matricule: {matricule}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date de naissance</p>
            <p className="font-semibold text-slate-700 mt-1">{student.dateNaissance || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Langue de travail</p>
            <p className="font-semibold text-slate-700 mt-1">{student.langue === 'en' ? 'Anglais' : 'Français'}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Classe</p>
            <p className="font-semibold text-slate-700 mt-1">{classe}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Niveau</p>
            <p className="font-semibold text-slate-700 mt-1">{niveau}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Section</p>
            <p className="font-semibold text-slate-700 mt-1">{section}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default StudentDetailPage;
