import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

const mockComparison = [
  { metric: 'Revenue attendu', y2024: '20 000 000 F', y2025: '22 500 000 F', delta: '+12.5%' },
  { metric: 'Revenue collecté', y2024: '15 000 000 F', y2025: '14 650 000 F', delta: '-2.3%' },
  { metric: 'Taux de recouvrement', y2024: '75.0%', y2025: '65.1%', delta: '-9.9%' },
  { metric: 'Effectifs', y2024: '320', y2025: '350', delta: '+9.4%' },
  { metric: 'Impayés', y2024: '5 000 000 F', y2025: '7 850 000 F', delta: '+57.0%' },
];

const YearComparePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('fondateur.yearCompare')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('fondateur.yearCompareDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('fondateur.metric')}</th>
                <th className="px-6 py-3 text-left">2024-2025</th>
                <th className="px-6 py-3 text-left">2025-2026</th>
                <th className="px-6 py-3 text-left">{t('fondateur.variation')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockComparison.map((row) => (
                <tr key={row.metric} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold">{row.metric}</td>
                  <td className="px-6 py-3">{row.y2024}</td>
                  <td className="px-6 py-3">{row.y2025}</td>
                  <td className={`px-6 py-3 font-bold ${row.delta.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{row.delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default YearComparePage;
