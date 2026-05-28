import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { BulletinPreview } from '../../../shared/components/business/BulletinPreview';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { FileText, Download, Printer } from 'lucide-react';

export const BulletinPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedClasse, setSelectedClasse] = React.useState('6ème A');
  const [selectedTrimestre, setSelectedTrimestre] = React.useState('Trimestre 1');

  const mockBulletins = [
    {
      eleve: 'DUPONT Jean',
      classe: selectedClasse,
      trimestre: selectedTrimestre,
      moyenne: 15.2,
      rang: 3,
      effectif: 35,
      matieres: [
        { nom: 'Mathématiques', note: 17, coefficient: 4 },
        { nom: 'Français', note: 14, coefficient: 3 },
        { nom: 'Anglais', note: 16, coefficient: 2 },
        { nom: 'Physique', note: 13, coefficient: 3 },
        { nom: 'SVT', note: 15, coefficient: 2 },
      ],
    },
    {
      eleve: 'MBARGA Paul',
      classe: selectedClasse,
      trimestre: selectedTrimestre,
      moyenne: 12.6,
      rang: 12,
      effectif: 35,
      matieres: [
        { nom: 'Mathématiques', note: 11, coefficient: 4 },
        { nom: 'Français', note: 14, coefficient: 3 },
        { nom: 'Anglais', note: 13, coefficient: 2 },
        { nom: 'Physique', note: 10, coefficient: 3 },
        { nom: 'SVT', note: 14, coefficient: 2 },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('bulletins.title')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('bulletins.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            {t('bulletins.print')}
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            {t('bulletins.export')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterDropdown label={t('bulletins.class')} value={selectedClasse} options={['6ème A', '5ème B', '4ème C', '3ème A']} onChange={setSelectedClasse} />
          <FilterDropdown label={t('bulletins.trimester')} value={selectedTrimestre} options={['Trimestre 1', 'Trimestre 2', 'Trimestre 3']} onChange={setSelectedTrimestre} />
          <span className="ml-auto text-sm text-slate-500 font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-digi-purple" />
            {mockBulletins.length} {t('bulletins.found')}
          </span>
        </div>
      </Card>

      {/* Bulletin Cards */}
      <div className="space-y-6">
        {mockBulletins.map((b, i) => (
          <Card key={i} className="shadow-sm border border-slate-100">
            <BulletinPreview {...b} />
          </Card>
        ))}
      </div>
    </div>
  );
};
export default BulletinPage;
