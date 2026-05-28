import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

const mockData = [
  { classe: '6ème A', moyenne: 12.5, tauxReussite: 82, effectif: 35 },
  { classe: '6ème B', moyenne: 11.8, tauxReussite: 75, effectif: 32 },
  { classe: '5ème A', moyenne: 13.1, tauxReussite: 88, effectif: 30 },
  { classe: '4ème A', moyenne: 10.9, tauxReussite: 68, effectif: 28 },
  { classe: '3ème A', moyenne: 11.2, tauxReussite: 72, effectif: 25 },
];

const PerfClassesPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.perfClasses')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.perfClassesDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('directeur.class')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.average')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.successRate')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.enrollment')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockData.map((c) => (
                <tr key={c.classe} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold">{c.classe}</td>
                  <td className="px-6 py-3">{c.moyenne}/20</td>
                  <td className="px-6 py-3"><span className={`font-bold ${c.tauxReussite >= 80 ? 'text-emerald-600' : c.tauxReussite >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{c.tauxReussite}%</span></td>
                  <td className="px-6 py-3">{c.effectif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default PerfClassesPage;
