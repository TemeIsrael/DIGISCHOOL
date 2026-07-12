import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

export interface BulletinMatiereEntry {
  nom: string;
  note: number;
  coefficient: number;
}

export interface BulletinPreviewProps {
  eleve?: string;
  nom?: string;
  prenom?: string;
  classe: string;
  salle?: string;
  teacherName?: string;
  moyenne: number;
  rang: number;
  effectif?: number;
  moyenneClasse?: number;
  photoUrl?: string;
  matieres?: BulletinMatiereEntry[];
  onDownload?: () => void;
  mention?: string;
  trimestre?: string;
  recapAnnuel?: {
    trimestre1: number | null;
    trimestre2: number | null;
    trimestre3: number | null;
    annuelle: number | null;
  };
  isAnnuel?: boolean;
}

export const BulletinPreview: React.FC<BulletinPreviewProps> = ({
  eleve, nom, prenom, classe, trimestre,
  moyenne, rang, effectif, moyenneClasse, photoUrl,
  matieres, onDownload, mention: _mention,
  salle: _salle, teacherName: _teacherName,
  recapAnnuel, isAnnuel
}) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const displayName = eleve || (prenom && nom ? `${prenom} ${nom.toUpperCase()}` : '');
  
  const getMention = (avg: number) => {
    if (avg >= 16) return 'Très Bien';
    if (avg >= 14) return 'Bien';
    if (avg >= 12) return 'Assez Bien';
    if (avg >= 10) return 'Passable';
    return 'Insuffisant';
  };

  const mention = _mention ?? getMention(moyenne);
  const salle = _salle ?? '';
  const teacher = _teacherName ?? '';

  const getRankSuffix = (r: number) => {
    if (isEn) {
      if (r === 1) return 'st';
      if (r === 2) return 'nd';
      if (r === 3) return 'rd';
      return 'th';
    } else {
      return r === 1 ? 'er' : 'ème';
    }
  };

  const getSubjectName = (name: string) => {
    switch(name) {
      case 'Français': case 'French': return t('stats.labels.fr', 'Français');
      case 'Mathématiques': case 'Maths': case 'Mathematics': return t('stats.labels.math', 'Maths');
      case 'Anglais': case 'English': return t('stats.labels.en', 'Anglais');
      case 'Sciences & Technologie': case 'Science & Technology': case 'Sciences': return t('stats.labels.sc', 'Sciences');
      case 'Histoire': case 'History': return t('stats.labels.hist', 'Histoire');
      case 'Éd. Civ.': case 'Civics': return t('stats.labels.civ', 'Éd. Civ.');
      default: return name;
    }
  };

  return (
    <div className="space-y-3 print:space-y-2 print:text-[10pt] bg-white text-slate-800" id="bulletin-pdf-content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-3 print:pb-2">
        <div className="flex items-center gap-4">
          {photoUrl ? (
             <img src={photoUrl} alt="Élève" className="w-16 h-16 rounded-lg object-cover border-2 border-digi-purple print:w-12 print:h-12" />
          ) : (
            <div className="p-3 bg-digi-purple-bg text-digi-purple rounded-xl print:w-12 print:h-12 flex items-center justify-center">
              <FileText className="w-6 h-6 print:w-5 print:h-5" />
            </div>
          )}
          <div className="space-y-0.5">
            <h4 className="text-lg print:text-sm font-bold text-slate-800 uppercase">
              {t('bulletins.reportCardOf', 'Bulletin de {{name}}', { name: displayName })}
            </h4>
            <p className="text-sm print:text-xs text-slate-500 font-semibold">{classe} {salle && `— Salle ${salle}`} {trimestre ? `— ${trimestre}` : ''}</p>
            <p className="text-sm print:text-[10px] text-slate-500 font-semibold">Enseignant : {teacher}</p>
          </div>
        </div>
        
        <div className="text-right space-y-1">
          <p className="text-sm print:text-xs font-bold">Moyenne Générale: <span className="text-digi-purple text-lg print:text-base">{moyenne.toFixed(2)}/10</span></p>
          <p className="text-sm print:text-xs font-bold">Mention: <span className={mention === 'Très Bien' ? 'text-green-600' : mention === 'Bien' ? 'text-emerald-600' : mention === 'Assez Bien' ? 'text-yellow-600' : mention === 'Passable' ? 'text-orange-600' : 'text-red-600'}>{mention}</span></p>
          <p className="text-sm print:text-xs font-bold">Rang: <span className="text-digi-purple">{rang}{getRankSuffix(rang)}</span> {effectif && <span className="text-slate-500"> / {effectif}</span>}</p>
          {moyenneClasse !== undefined && (
            <p className="text-xs print:text-[10px] text-slate-500">Moyenne Classe: {moyenneClasse.toFixed(2)}/10</p>
          )}
        </div>
        <div className="print:hidden">
          <Button variant="outline" size="sm" onClick={onDownload || (() => {})} className="gap-2">
            <Download className="w-4 h-4" />
            <span>Télécharger</span>
          </Button>
        </div>
      </div>

      {/* Matieres Table */}
      {matieres && matieres.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-slate-200 print:border-none print:m-0 print:p-0">
          <table className="min-w-full divide-y divide-slate-200 text-sm print:text-[10px]">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-3 py-2 print:py-1 text-left">Matière</th>
                <th className="px-3 py-2 print:py-1 text-center">Note / 10</th>
                <th className="px-3 py-2 print:py-1 text-center">Coef</th>
                <th className="px-3 py-2 print:py-1 text-center">Pondérée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {matieres.map((m, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-3 py-1.5 print:py-1 font-semibold text-slate-800">{getSubjectName(m.nom)}</td>
                  <td className="px-3 py-1.5 print:py-1 text-center">
                    <span className={`font-bold ${m.note >= 7 ? 'text-green-600' : m.note >= 5 ? 'text-orange-500' : 'text-red-500'}`}>
                      {m.note}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 print:py-1 text-center text-slate-500">{m.coefficient}</td>
                  <td className="px-3 py-1.5 print:py-1 text-center font-bold text-digi-purple">{(m.note * m.coefficient).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Final Recap (only for Annual Bulletin) */}
      {isAnnuel && (
        <div className="mt-4 border-t pt-4 print:pt-2">
          <h5 className="text-sm font-bold text-slate-700 uppercase mb-2">Récapitulatif Annuel</h5>
          <div className="grid grid-cols-4 gap-2 text-center text-sm print:text-xs bg-slate-50 rounded-lg p-2 print:p-1 border border-slate-200">
            <div>
              <p className="text-xs text-slate-500 font-bold">Trimestre 1</p>
              <p className="font-bold text-slate-800">{recapAnnuel?.trimestre1 ? recapAnnuel.trimestre1.toFixed(2) : '-'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Trimestre 2</p>
              <p className="font-bold text-slate-800">{recapAnnuel?.trimestre2 ? recapAnnuel.trimestre2.toFixed(2) : '-'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Trimestre 3</p>
              <p className="font-bold text-slate-800">{recapAnnuel?.trimestre3 ? recapAnnuel.trimestre3.toFixed(2) : '-'}</p>
            </div>
            <div className="bg-digi-purple/10 rounded">
              <p className="text-xs text-digi-purple font-bold">Moy. Annuelle</p>
              <p className="font-bold text-digi-purple text-lg print:text-sm">{recapAnnuel?.annuelle ? recapAnnuel.annuelle.toFixed(2) : '-'}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
