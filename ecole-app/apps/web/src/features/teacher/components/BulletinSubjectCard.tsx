import React from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { FileText, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface BulletinSubjectCardProps {
  nom: string;
  note: number;
  coefficient: number;
}

export const BulletinSubjectCard: React.FC<BulletinSubjectCardProps> = ({ nom, note, coefficient }) => {
  const { t } = useTranslation();
  const weighted = (note * coefficient).toFixed(1);
  const noteColor = note >= 7 ? 'text-digi-success' : note >= 5 ? 'text-digi-warning' : 'text-digi-danger';

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-2 font-semibold">{nom}</td>
      <td className="px-4 py-2 text-center">
        <span className={`font-bold ${noteColor}`}>{note}</span>
      </td>
      <td className="px-4 py-2 text-center text-slate-400">{coefficient}</td>
      <td className="px-4 py-2 text-center font-bold text-digi-purple">{weighted}</td>
    </tr>
  );
};
