import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

const mockData = [
  { matricule: 'EL-001', nom: 'DUPONT Jean', classe: '6ème A', moyenne: 16.2, rang: 1 },
  { matricule: 'EL-012', nom: 'NGONO Marie', classe: '5ème A', moyenne: 15.8, rang: 1 },
  { matricule: 'EL-045', nom: 'BELLA Sarah', classe: '6ème A', moyenne: 15.5, rang: 2 },
  { matricule: 'EL-089', nom: 'KAMGA Paul', classe: '3ème A', moyenne: 14.9, rang: 1 },
  { matricule: 'EL-003', nom: 'TAMBA Roger', classe: '4ème A', moyenne: 14.7, rang: 1 },
];

const PerfStudentsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.perfStudents')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.perfStudentsDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('directeur.rank')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.studentId')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.studentName')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.class')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.average')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockData.map((s, idx) => (
                <tr key={s.matricule} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold">{idx + 1}</td>
                  <td className="px-6 py-3 font-mono text-xs">{s.matricule}</td>
                  <td className="px-6 py-3 font-semibold">{s.nom}</td>
                  <td className="px-6 py-3">{s.classe}</td>
                  <td className="px-6 py-3 font-bold text-digi-purple">{s.moyenne}/20</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default PerfStudentsPage;
