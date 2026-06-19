import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { BulletinPreview } from '../../../shared/components/business/BulletinPreview';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { FileText, Download, Printer, BookOpen } from 'lucide-react';
import { exportPDF } from '../../../shared/utils/export';

const mockBulletins = [
  {
    eleve: 'DUPONT Jean',
    classe: 'CM1 A',
    trimestre: 'Trimestre 2',
    moyenne: 7.6,
    rang: 3,
    effectif: 35,
    matieres: [
      { nom: 'Français', note: 8, coefficient: 3 },
      { nom: 'Mathématiques', note: 7, coefficient: 3 },
      { nom: 'Anglais', note: 9, coefficient: 1 },
      { nom: 'Sciences & Technologie', note: 6, coefficient: 2 },
      { nom: 'Éducation Civique', note: 8, coefficient: 1 },
    ],
  },
  {
    eleve: 'NGONO Marie',
    classe: 'CE2 A',
    trimestre: 'Trimestre 2',
    moyenne: 6.3,
    rang: 12,
    effectif: 32,
    matieres: [
      { nom: 'Français', note: 6, coefficient: 3 },
      { nom: 'Mathématiques', note: 5, coefficient: 3 },
      { nom: 'Anglais', note: 7, coefficient: 1 },
      { nom: 'Sciences & Technologie', note: 6, coefficient: 2 },
      { nom: 'Éducation Civique', note: 8, coefficient: 1 },
    ],
  },
  {
    eleve: 'TAMBA Isaac',
    classe: 'CM2 A',
    trimestre: 'Trimestre 2',
    moyenne: 8.1,
    rang: 2,
    effectif: 30,
    matieres: [
      { nom: 'Français', note: 8, coefficient: 3 },
      { nom: 'Mathématiques', note: 9, coefficient: 3 },
      { nom: 'Anglais', note: 7, coefficient: 1 },
      { nom: 'Sciences & Technologie', note: 8, coefficient: 2 },
      { nom: 'Éducation Civique', note: 9, coefficient: 1 },
    ],
  },
];

const classes = ['Toutes', 'CM1 A', 'CE2 A', 'CM2 A'];
const trimesters = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];

export const TeacherBulletinPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState('Toutes');
  const [selectedTrimester, setSelectedTrimester] = useState('Trimestre 2');

  const filteredBulletins = mockBulletins.filter(b => {
    const classMatch = selectedClass === 'Toutes' || b.classe === selectedClass;
    const trimMatch = b.trimestre === selectedTrimester;
    return classMatch && trimMatch;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('bulletins.title', 'Bulletins Scolaires')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('bulletins.subtitle', 'Génération et consultation des bulletins trimestriels')}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
            <Printer className="w-4 h-4" />
            {t('bulletins.print', 'Imprimer Tout')}
          </Button>
          <Button className="gap-2" onClick={() => exportPDF(filteredBulletins.map(({ matieres, ...r }) => r), 'bulletins-enseignant.pdf')}>
            <Download className="w-4 h-4" />
            {t('bulletins.export', 'Exporter PDF')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterDropdown
            label={t('grades.class', 'Classe')}
            value={selectedClass}
            options={classes.map(c => ({ value: c, label: c }))}
            onChange={setSelectedClass}
          />
          <FilterDropdown
            label={t('bulletins.trimester', 'Trimestre')}
            value={selectedTrimester}
            options={trimesters.map(tr => ({ value: tr, label: tr }))}
            onChange={setSelectedTrimester}
          />
          <span className="ml-auto text-sm text-slate-500 font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-digi-purple" />
            {filteredBulletins.length} {t('bulletins.found', 'bulletin(s) trouvé(s)')}
          </span>
        </div>
      </Card>

      {/* Bulletin Cards */}
      {filteredBulletins.length === 0 ? (
        <Card className="shadow-sm border border-slate-100">
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-slate-400">
            <BookOpen className="w-12 h-12 text-slate-200" />
            <p className="text-sm font-semibold">{t('common.noResults', 'Aucun résultat trouvé')}</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredBulletins.map((b, i) => {
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
      )}
    </div>
  );
};
export default TeacherBulletinPage;
