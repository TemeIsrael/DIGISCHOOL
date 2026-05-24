import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '../ui/Button';

export interface BulletinMatiereEntry {
  nom: string;
  note: number;
  coefficient: number;
}

export interface BulletinPreviewProps {
  eleve?: string;
  // Legacy props (backward compatible)
  nom?: string;
  prenom?: string;
  classe: string;
  trimestre?: string;
  moyenne: number;
  rang: number;
  effectif?: number;
  matieres?: BulletinMatiereEntry[];
  onDownload?: () => void;
}

export const BulletinPreview: React.FC<BulletinPreviewProps> = ({
  eleve,
  nom,
  prenom,
  classe,
  trimestre,
  moyenne,
  rang,
  effectif,
  matieres,
  onDownload
}) => {
  const displayName = eleve || (prenom && nom ? `${prenom} ${nom.toUpperCase()}` : '');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-digi-purple-bg text-digi-purple rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-800">
              Bulletin de {displayName}
            </h4>
            <p className="text-xs text-slate-400 font-semibold">{classe} {trimestre ? `— ${trimestre}` : ''}</p>
            <p className="text-xs text-slate-500 font-bold">
              Moyenne: <span className="text-digi-purple">{moyenne.toFixed(2)}/20</span> &bull; Rang:{' '}
              <span className="text-digi-purple">{rang}{rang === 1 ? 'er' : 'ème'}</span>
              {effectif && <span className="text-slate-400"> / {effectif}</span>}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onDownload || (() => {})} className="gap-2 w-full sm:w-auto">
          <Download className="w-4 h-4" />
          <span>Télécharger</span>
        </Button>
      </div>

      {/* Matieres Table (if provided) */}
      {matieres && matieres.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-2 text-left">Matière</th>
                <th className="px-4 py-2 text-center">Note / 20</th>
                <th className="px-4 py-2 text-center">Coefficient</th>
                <th className="px-4 py-2 text-center">Pondérée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {matieres.map((m, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2 font-semibold">{m.nom}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`font-bold ${m.note >= 14 ? 'text-digi-success' : m.note >= 10 ? 'text-digi-warning' : 'text-digi-danger'}`}>
                      {m.note}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center text-slate-400">{m.coefficient}</td>
                  <td className="px-4 py-2 text-center font-bold text-digi-purple">{(m.note * m.coefficient).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
