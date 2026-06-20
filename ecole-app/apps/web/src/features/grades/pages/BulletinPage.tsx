import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { BulletinPreview } from '../../../shared/components/business/BulletinPreview';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { FileText, Download, Printer } from 'lucide-react';
import { exportCSV, exportPDF } from '../../../shared/utils/export';

export const BulletinPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  const [selectedSection, setSelectedSection] = React.useState('Francophone');
  const [selectedClasse, setSelectedClasse] = React.useState('CM1 A');
  const [selectedTrimestre, setSelectedTrimestre] = React.useState('Trimestre 1');

  const classesOptions = selectedSection === 'Francophone'
    ? ['SIL A', 'CP A', 'CE1 A', 'CE2 A', 'CM1 A', 'CM2 A']
    : ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];

  React.useEffect(() => {
    setSelectedClasse(classesOptions[0]);
  }, [selectedSection]);

  const mockBulletinsFrancophones = [
    {
      eleve: 'DUPONT Jean',
      classe: selectedClasse,
      trimestre: selectedTrimestre,
      moyenne: 7.6,
      rang: 3,
      effectif: 35,
      matieres: [
        { nom: isEn ? 'French' : 'Français', note: 8, coefficient: 3 },
        { nom: isEn ? 'Mathematics' : 'Mathématiques', note: 7, coefficient: 3 },
        { nom: isEn ? 'English' : 'Anglais', note: 9, coefficient: 1 },
        { nom: isEn ? 'Science & Tech' : 'Sciences & Technologie', note: 6, coefficient: 2 },
        { nom: isEn ? 'Civics' : 'Éducation Civique', note: 8, coefficient: 1 },
      ],
    },
    {
      eleve: 'MBARGA Paul',
      classe: selectedClasse,
      trimestre: selectedTrimestre,
      moyenne: 6.3,
      rang: 12,
      effectif: 35,
      matieres: [
        { nom: isEn ? 'French' : 'Français', note: 6, coefficient: 3 },
        { nom: isEn ? 'Mathematics' : 'Mathématiques', note: 5, coefficient: 3 },
        { nom: isEn ? 'English' : 'Anglais', note: 7, coefficient: 1 },
        { nom: isEn ? 'Science & Tech' : 'Sciences & Technologie', note: 6, coefficient: 2 },
        { nom: isEn ? 'Civics' : 'Éducation Civique', note: 8, coefficient: 1 },
      ],
    },
  ];

  const mockBulletinsAnglophones = [
    {
      eleve: 'SMITH John',
      classe: selectedClasse,
      trimestre: selectedTrimestre,
      moyenne: 8.2,
      rang: 1,
      effectif: 30,
      matieres: [
        { nom: isEn ? 'English Language' : 'Langue Anglaise', note: 9, coefficient: 3 },
        { nom: isEn ? 'Mathematics' : 'Mathématiques', note: 8, coefficient: 3 },
        { nom: isEn ? 'French' : 'Français', note: 7, coefficient: 1 },
        { nom: isEn ? 'Science & Tech' : 'Sciences & Technologie', note: 8, coefficient: 2 },
        { nom: isEn ? 'Civics' : 'Éducation Civique', note: 9, coefficient: 1 },
      ],
    },
  ];

  const mockBulletins = selectedSection === 'Francophone' ? mockBulletinsFrancophones : mockBulletinsAnglophones;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('bulletins.title', 'Bulletins Scolaires')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('bulletins.subtitle', 'Génération et consultation des bulletins trimestriels')}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
            <Printer className="w-4 h-4" />
            {t('bulletins.print', 'Imprimer Tout')}
          </Button>
          <Button className="gap-2" onClick={() => exportPDF(mockBulletins.map(({ matieres, ...rest }) => rest), 'bulletins.pdf')}>
            <Download className="w-4 h-4" />
            {t('bulletins.exportPDF', 'Exporter PDF')}
          </Button>
          <Button className="gap-2" onClick={() => exportCSV(mockBulletins.map(({ matieres, ...rest }) => rest), 'bulletins.csv')}>
            <Download className="w-4 h-4" />
            {t('bulletins.exportCSV', 'Exporter CSV')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterDropdown label={t('grades.section', 'Section')} value={selectedSection} options={['Francophone', 'Anglophone']} onChange={setSelectedSection} />
          <FilterDropdown label={t('grades.class', 'Classe')} value={selectedClasse} options={classesOptions} onChange={setSelectedClasse} />
          <FilterDropdown label={t('bulletins.trimester', 'Trimestre')} value={selectedTrimestre} options={['Trimestre 1', 'Trimestre 2', 'Trimestre 3']} onChange={setSelectedTrimestre} />
          <span className="ml-auto text-sm text-slate-500 font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-digi-purple" />
            {t('bulletins.foundCount', { count: mockBulletins.length, defaultValue: '{{count}} bulletins trouvés' })}
          </span>
        </div>
      </Card>

      {/* Bulletin Cards */}
      <div className="space-y-6">
        {mockBulletins.map((b, i) => {
          const { matieres, ...flatB } = b;
          return (
            <Card key={i} className="shadow-sm border border-slate-100">
              <BulletinPreview 
                {...b} 
                onDownload={() => exportPDF([flatB], `bulletin_${b.eleve.replace(/\s+/g, '_')}.pdf`)} 
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default BulletinPage;
