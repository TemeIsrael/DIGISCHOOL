import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockYears = [
  { id: 1, label: '2025-2026', courante: true, debut: '01/09/2025', fin: '30/06/2026', trimestres: 3 },
  { id: 2, label: '2024-2025', courante: false, debut: '01/09/2024', fin: '30/06/2025', trimestres: 3 },
  { id: 3, label: '2023-2024', courante: false, debut: '01/09/2023', fin: '30/06/2024', trimestres: 3 },
];

const YearManagePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('root.yearManage')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('root.yearManageDesc')}</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />{t('root.addYear')}</Button>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('root.yearLabel')}</th>
                <th className="px-6 py-3 text-left">{t('root.startDate')}</th>
                <th className="px-6 py-3 text-left">{t('root.endDate')}</th>
                <th className="px-6 py-3 text-left">{t('root.trimesterCount')}</th>
                <th className="px-6 py-3 text-left">{t('root.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockYears.map((y) => (
                <tr key={y.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold">{y.label}</td>
                  <td className="px-6 py-3">{y.debut}</td>
                  <td className="px-6 py-3">{y.fin}</td>
                  <td className="px-6 py-3">{y.trimestres}</td>
                  <td className="px-6 py-3"><span className={`px-2 py-0.5 text-xs font-bold rounded-full ${y.courante ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{y.courante ? t('root.current') : t('root.archived')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default YearManagePage;
