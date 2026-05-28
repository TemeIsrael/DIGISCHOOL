import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

const mockData = [
  { classe: 'SIL A', moyenne: 7.5, tauxReussite: 88, effectif: 45, section: 'FR' },
  { classe: 'CP A', moyenne: 7.1, tauxReussite: 80, effectif: 42, section: 'FR' },
  { classe: 'CE1 A', moyenne: 6.8, tauxReussite: 76, effectif: 38, section: 'FR' },
  { classe: 'CE2 A', moyenne: 7.3, tauxReussite: 82, effectif: 35, section: 'FR' },
  { classe: 'CM1 A', moyenne: 6.5, tauxReussite: 70, effectif: 32, section: 'FR' },
  { classe: 'CM2 A', moyenne: 7.4, tauxReussite: 85, effectif: 30, section: 'FR' },
  { classe: 'Class 1 A', moyenne: 7.2, tauxReussite: 85, effectif: 40, section: 'EN' },
  { classe: 'Class 6 A', moyenne: 7.0, tauxReussite: 78, effectif: 25, section: 'EN' },
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
                  <td className="px-6 py-3">{c.moyenne}/10</td>
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
