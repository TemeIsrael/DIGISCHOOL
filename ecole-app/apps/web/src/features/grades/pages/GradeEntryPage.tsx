import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { GradeCell } from '../../../shared/components/business/GradeCell';
import { ClipboardList, Save, Download} from 'lucide-react';

interface GradeEntry {
  matricule: string;
  nom: string;
  prenom: string;
  note: number | null;
  noteMax: number;
}

const mockGrades: GradeEntry[] = [
  { matricule: 'EL-001', nom: 'DUPONT', prenom: 'Jean', note: 16, noteMax: 20 },
  { matricule: 'EL-002', nom: 'MBARGA', prenom: 'Paul', note: 12, noteMax: 20 },
  { matricule: 'EL-003', nom: 'NGONO', prenom: 'Marie', note: 8, noteMax: 20 },
  { matricule: 'EL-004', nom: 'TAMBA', prenom: 'Isaac', note: 18, noteMax: 20 },
  { matricule: 'EL-005', nom: 'BELLA', prenom: 'Sarah', note: null, noteMax: 20 },
  { matricule: 'EL-006', nom: 'FOUDA', prenom: 'Pierre', note: 14, noteMax: 20 },
  { matricule: 'EL-007', nom: 'EKANGA', prenom: 'Lise', note: 15, noteMax: 20 },
];

export const GradeEntryPage: React.FC = () => {
  const { t } = useTranslation();
  const [grades, setGrades] = useState(mockGrades);
  const [selectedCours, setSelectedCours] = useState('Mathématiques');
  const [selectedClasse, setSelectedClasse] = useState('6ème A');
  const [selectedSession, setSelectedSession] = useState('Examen T1');

  const handleNoteChange = (index: number, value: string) => {
    const updated = [...grades];
    const numVal = value === '' ? null : Number(value);
    updated[index] = { ...updated[index], note: numVal };
    setGrades(updated);
  };

  const filledCount = grades.filter((g) => g.note !== null).length;
  const average = grades.filter((g) => g.note !== null).reduce((s, g) => s + (g.note || 0), 0) / (filledCount || 1);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('grades.title')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('grades.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            {t('grades.export')}
          </Button>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            {t('grades.save')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterDropdown label={t('grades.course')} value={selectedCours} options={['Mathématiques', 'Français', 'Anglais', 'Sciences', 'Physique']} onChange={setSelectedCours} />
          <FilterDropdown label={t('grades.class')} value={selectedClasse} options={['6ème A', '5ème B', '4ème C', '3ème A']} onChange={setSelectedClasse} />
          <FilterDropdown label={t('grades.session')} value={selectedSession} options={['Examen T1', 'Examen T2', 'Examen T3', 'Devoir 1', 'Devoir 2']} onChange={setSelectedSession} />

          <div className="ml-auto flex items-center gap-4 text-sm font-semibold">
            <span className="text-slate-500">
              {t('grades.filled')}: <span className="text-digi-purple font-bold">{filledCount}/{grades.length}</span>
            </span>
            <span className="text-slate-500">
              {t('grades.average')}: <span className="text-digi-purple font-bold">{average.toFixed(1)}</span>
            </span>
          </div>
        </div>
      </Card>

      {/* Grades Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center gap-2 mb-4 text-slate-800">
          <ClipboardList className="w-5 h-5 text-digi-purple" />
          <h3 className="text-sm font-bold uppercase tracking-wider">{selectedCours} &mdash; {selectedClasse} &mdash; {selectedSession}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left w-12">#</th>
                <th className="px-4 py-3 text-left">{t('grades.matricule')}</th>
                <th className="px-4 py-3 text-left">{t('grades.nom')}</th>
                <th className="px-4 py-3 text-left">{t('grades.prenom')}</th>
                <th className="px-4 py-3 text-center w-32">{t('grades.note')} / {grades[0]?.noteMax || 20}</th>
                <th className="px-4 py-3 text-center w-28">{t('grades.appreciation')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {grades.map((g, i) => (
                <tr key={g.matricule} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                  <td className="px-4 py-3 font-mono text-xs">{g.matricule}</td>
                  <td className="px-4 py-3 font-semibold">{g.nom}</td>
                  <td className="px-4 py-3">{g.prenom}</td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max={g.noteMax}
                      step="0.5"
                      value={g.note ?? ''}
                      onChange={(e) => handleNoteChange(i, e.target.value)}
                      className="w-20 text-center border border-slate-200 rounded-lg py-1.5 text-sm font-bold focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
                      placeholder="—"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <GradeCell note={g.note} max={g.noteMax} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default GradeEntryPage;
