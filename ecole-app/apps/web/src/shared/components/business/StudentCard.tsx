import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface StudentCardProps {
  nom: string;
  prenom: string;
  matricule: string;
  classe: string;
  actif: boolean;
  photo?: string | null;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  nom,
  prenom,
  matricule,
  classe,
  actif,
  photo
}) => {
  return (
    <Card hover className="flex items-center gap-4">
      {photo ? (
        <img
          src={photo}
          alt={`${prenom} ${nom}`}
          className="w-12 h-12 rounded-full object-cover border border-slate-100"
        />
      ) : (
        <div className="p-3 bg-digi-purple-bg text-digi-purple rounded-full">
          <GraduationCap className="w-6 h-6" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-slate-800 truncate">{nom.toUpperCase()} {prenom}</h4>
        <p className="text-xs text-slate-400 font-semibold truncate">{matricule}</p>
        <p className="text-xs text-slate-500 font-bold mt-1">{classe}</p>
      </div>
      <Badge variant={actif ? 'success' : 'danger'}>
        {actif ? 'Actif' : 'Inactif'}
      </Badge>
    </Card>
  );
};
