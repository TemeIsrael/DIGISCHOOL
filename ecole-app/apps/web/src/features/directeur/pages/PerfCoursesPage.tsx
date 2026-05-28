import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

const mockData = [
  { matiere: 'Mathématiques', moyenne: 11.3, enseignant: 'M. NKOULOU', classes: 5 },
  { matiere: 'Français', moyenne: 12.8, enseignant: 'Mme FOUDA', classes: 5 },
  { matiere: 'Anglais', moyenne: 13.5, enseignant: 'M. BROWN', classes: 5 },
  { matiere: 'SVT', moyenne: 14.1, enseignant: 'Mme BELLA', classes: 4 },
  { matiere: 'Physique-Chimie', moyenne: 10.7, enseignant: 'M. ESSOMBA', classes: 3 },
  { matiere: 'Histoire-Géo', moyenne: 12.2, enseignant: 'Mme KAMGA', classes: 5 },
];

const PerfCoursesPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.perfCourses')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.perfCoursesDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('directeur.subject')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.average')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.teacher')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.classCount')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockData.map((c) => (
                <tr key={c.matiere} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold">{c.matiere}</td>
                  <td className="px-6 py-3">{c.moyenne}/20</td>
                  <td className="px-6 py-3">{c.enseignant}</td>
                  <td className="px-6 py-3">{c.classes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default PerfCoursesPage;
