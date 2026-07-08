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
  // Legacy props (backward compatible)
  nom?: string;
  prenom?: string;
  classe: string;
  salle?: string;
  teacherName?: string;
  moyenne: number;
  rang: number;
  effectif?: number;
  matieres?: BulletinMatiereEntry[];
  onDownload?: () => void;
  mention?: string;
  trimestre?: string;
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
  onDownload,
  mention: _mention,
  salle: _salle,
  teacherName: _teacherName
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

  // Determine Rank suffix
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
      case 'Français':
      case 'French':
        return t('stats.labels.fr', 'Français');
      case 'Mathématiques':
      case 'Maths':
      case 'Mathematics':
        return t('stats.labels.math', 'Maths');
      case 'Anglais':
      case 'English':
        return t('stats.labels.en', 'Anglais');
      case 'Sciences & Technologie':
      case 'Science & Technology':
      case 'Sciences':
        return t('stats.labels.sc', 'Sciences');
      case 'Histoire':
      case 'History':
        return t('stats.labels.hist', 'Histoire');
      case 'Éd. Civ.':
      case 'Civics':
        return t('stats.labels.civ', 'Éd. Civ.');
      default:
        return name;
    }
  };

  const getTrimestreDisplay = (trim: string) => {
    if (isEn) {
      return trim.replace('Trimestre', 'Trimester');
    }
    return trim;
  };

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
              {t('bulletins.reportCardOf', 'Bulletin de {{name}}', { name: displayName })}
            </h4>
            <p className="text-xs text-slate-400 font-semibold">{classe} {salle && `— Salle ${salle}`} {trimestre ? `— ${getTrimestreDisplay(trimestre)}` : ''}</p>
            <p className="text-xs text-slate-400 font-semibold">Enseignant : {teacher}</p>
            <p className="text-xs font-bold {mention === 'Très Bien' ? 'text-green-600' : mention === 'Bien' ? 'text-emerald-600' : mention === 'Assez Bien' ? 'text-yellow-600' : mention === 'Passable' ? 'text-orange-600' : 'text-red-600'}">Mention : {mention}</p>
            <p className="text-xs text-slate-500 font-bold">
              {t('bulletins.average', 'Moyenne')}: <span className="text-digi-purple">{moyenne.toFixed(2)}/10</span> &bull; {t('bulletins.rank', 'Rang')}:{' '}
              <span className="text-digi-purple">{rang}{getRankSuffix(rang)}</span>
              {effectif && <span className="text-slate-400"> / {effectif}</span>}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onDownload || (() => {})} className="gap-2 w-full sm:w-auto">
          <Download className="w-4 h-4" />
          <span>{t('bulletins.download', 'Télécharger')}</span>
        </Button>
      </div>

      {/* Matieres Table (if provided) */}
      {matieres && matieres.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-2 text-left">{t('schedules.subject', 'Matière')}</th>
                <th className="px-4 py-2 text-center">{t('grades.note', 'Note')} / 10</th>
                <th className="px-4 py-2 text-center">{t('grades.coefficient', 'Coefficient')}</th>
                <th className="px-4 py-2 text-center">{t('bulletins.weighted', 'Pondérée')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {matieres.map((m, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2 font-semibold">{getSubjectName(m.nom)}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`font-bold ${m.note >= 7 ? 'text-digi-success' : m.note >= 5 ? 'text-digi-warning' : 'text-digi-danger'}`}>
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
