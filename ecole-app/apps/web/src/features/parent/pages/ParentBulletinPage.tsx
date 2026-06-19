import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { BulletinPreview } from '../../../shared/components/business/BulletinPreview';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { exportPDF } from '../../../shared/utils/export';
import { GraduationCap, TrendingUp, FileText, Download } from 'lucide-react';

const childrenData = [
  {
    id: '1',
    name: 'DUPONT Jean',
    classe: 'CM1 A',
    bulletins: {
      'Trimestre 1': { moyenne: 7.1, rang: 7, effectif: 32, matieres: [{ nom: 'Français', note: 7, coefficient: 3 }, { nom: 'Mathématiques', note: 7, coefficient: 3 }, { nom: 'Anglais', note: 8, coefficient: 1 }, { nom: 'Sciences & Technologie', note: 6, coefficient: 2 }, { nom: 'Éducation Civique', note: 8, coefficient: 1 }] },
      'Trimestre 2': { moyenne: 7.4, rang: 5, effectif: 32, matieres: [{ nom: 'Français', note: 8, coefficient: 3 }, { nom: 'Mathématiques', note: 7, coefficient: 3 }, { nom: 'Anglais', note: 9, coefficient: 1 }, { nom: 'Sciences & Technologie', note: 6, coefficient: 2 }, { nom: 'Éducation Civique', note: 7, coefficient: 1 }] },
      'Trimestre 3': { moyenne: 7.8, rang: 4, effectif: 32, matieres: [{ nom: 'Français', note: 8, coefficient: 3 }, { nom: 'Mathématiques', note: 8, coefficient: 3 }, { nom: 'Anglais', note: 9, coefficient: 1 }, { nom: 'Sciences & Technologie', note: 7, coefficient: 2 }, { nom: 'Éducation Civique', note: 8, coefficient: 1 }] }
    }
  },
  {
    id: '2',
    name: 'DUPONT Marie',
    classe: 'CE1 B',
    bulletins: {
      'Trimestre 1': { moyenne: 8.0, rang: 3, effectif: 28, matieres: [{ nom: 'Français', note: 8, coefficient: 3 }, { nom: 'Mathématiques', note: 8, coefficient: 3 }, { nom: 'Anglais', note: 7, coefficient: 1 }, { nom: 'Éducation Civique', note: 9, coefficient: 2 }] },
      'Trimestre 2': { moyenne: 8.2, rang: 2, effectif: 28, matieres: [{ nom: 'Français', note: 9, coefficient: 3 }, { nom: 'Mathématiques', note: 8, coefficient: 3 }, { nom: 'Anglais', note: 7, coefficient: 1 }, { nom: 'Éducation Civique', note: 9, coefficient: 2 }] },
      'Trimestre 3': { moyenne: 8.5, rang: 1, effectif: 28, matieres: [{ nom: 'Français', note: 9, coefficient: 3 }, { nom: 'Mathématiques', note: 9, coefficient: 3 }, { nom: 'Anglais', note: 8, coefficient: 1 }, { nom: 'Éducation Civique', note: 9, coefficient: 2 }] }
    }
  }
];



export const ParentBulletinPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [selectedChildId, setSelectedChildId] = useState(childrenData[0].id);
  const [selectedTrimester, setSelectedTrimester] = useState('Trimestre 2');

  const childInfo = childrenData.find(c => c.id === selectedChildId) || childrenData[0];
  const bulletinsData = childInfo.bulletins;

  const trimesterOptions = [
    { value: 'Trimestre 1', label: isEn ? 'Trimester 1' : 'Trimestre 1' },
    { value: 'Trimestre 2', label: isEn ? 'Trimester 2' : 'Trimestre 2' },
    { value: 'Trimestre 3', label: isEn ? 'Trimester 3' : 'Trimestre 3' },
  ];

  const currentBulletin = bulletinsData[selectedTrimester as keyof typeof bulletinsData];
  const overallAvg = Object.values(bulletinsData).reduce((s, b) => s + b.moyenne, 0) / Object.values(bulletinsData).length;
  const bestTrimester = Object.entries(bulletinsData).sort((a, b) => b[1].moyenne - a[1].moyenne)[0][0];

  const exportData = [{ eleve: childInfo.name, classe: childInfo.classe, trimestre: selectedTrimester, moyenne: currentBulletin.moyenne, rang: currentBulletin.rang }];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('bulletins.title', 'Bulletins Scolaires')}</h1>
          <p className="text-sm text-slate-400 font-semibold">
            {isEn ? `Academic monitoring for ${childInfo.name}` : `Suivi scolaire de ${childInfo.name}`}
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500 uppercase">{isEn ? 'Child:' : 'Enfant:'}</span>
            <select
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-digi-purple/20 focus:border-digi-purple outline-none shadow-sm"
            >
              {childrenData.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.classe})</option>
              ))}
            </select>
          </div>
          <Button className="gap-2" onClick={() => exportPDF(exportData, `bulletin_${childInfo.name.replace(/\s+/g, '_')}_${selectedTrimester}.pdf`)}>
            <Download className="w-4 h-4" />
            {t('bulletins.download', 'Télécharger')}
          </Button>
        </div>
      </div>

      {/* Child Info Banner */}
      <Card className="shadow-sm border border-slate-100 bg-gradient-to-r from-digi-purple-bg to-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-digi-purple flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{childInfo.name}</h3>
            <p className="text-sm text-slate-500">
              {childInfo.classe} — {isEn ? 'Academic Year' : 'Année Scolaire'} 2025-2026
            </p>
          </div>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          value={overallAvg.toFixed(1) + '/10'}
          label={isEn ? 'Annual Average' : 'Moyenne Annuelle'}
          icon={<TrendingUp className="w-5 h-5 text-digi-purple" />}
        />
        <KPICard
          value={`${currentBulletin.rang}${isEn ? 'th' : 'ème'} / ${currentBulletin.effectif}`}
          label={isEn ? 'Rank in Class' : 'Rang dans la Classe'}
          icon={<GraduationCap className="w-5 h-5 text-digi-purple" />}
        />
        <KPICard
          value={isEn ? bestTrimester.replace('Trimestre', 'Trimester') : bestTrimester}
          label={isEn ? 'Best Trimester' : 'Meilleur Trimestre'}
          icon={<FileText className="w-5 h-5 text-digi-purple" />}
        />
      </div>

      {/* Trimester Selector */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterDropdown
            label={t('bulletins.trimester', 'Trimestre')}
            value={selectedTrimester}
            options={trimesterOptions}
            onChange={setSelectedTrimester}
          />
          <div className="ml-auto flex items-center gap-3">
            {trimesterOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSelectedTrimester(opt.value)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedTrimester === opt.value
                    ? 'bg-digi-purple text-white shadow-sm shadow-digi-purple/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Bulletin Preview */}
      <Card className="shadow-sm border border-slate-100">
        <BulletinPreview
          eleve={childInfo.name}
          classe={childInfo.classe}
          trimestre={selectedTrimester}
          moyenne={currentBulletin.moyenne}
          rang={currentBulletin.rang}
          effectif={currentBulletin.effectif}
          matieres={currentBulletin.matieres}
          onDownload={() => exportPDF(exportData, `bulletin_${childInfo.name.replace(/\s+/g, '_')}.pdf`)}
        />
      </Card>

      {/* Progression Chart — Text Summary */}
      <Card className="shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6">
          {isEn ? 'Progression Overview' : 'Évolution des Moyennes'}
        </h3>
        <div className="flex items-end justify-around gap-4 h-32">
          {Object.entries(bulletinsData).map(([trim, data]) => {
            const pct = (data.moyenne / 10) * 100;
            const isSelected = trim === selectedTrimester;
            return (
              <div key={trim} className="flex flex-col items-center gap-2 flex-1">
                <span className={`text-sm font-bold ${isSelected ? 'text-digi-purple' : 'text-slate-500'}`}>
                  {data.moyenne.toFixed(1)}
                </span>
                <div className="w-full relative h-20 bg-slate-100 rounded-xl overflow-hidden">
                  <div
                    className={`absolute bottom-0 w-full rounded-xl transition-all duration-500 ${isSelected ? 'bg-digi-purple' : 'bg-digi-purple/30'}`}
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400 text-center">
                  {isEn ? trim.replace('Trimestre', 'T.') : trim.replace('Trimestre', 'Trim.')}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
export default ParentBulletinPage;
