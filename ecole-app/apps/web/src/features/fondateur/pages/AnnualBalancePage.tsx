import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { TrendingUp, Target, CreditCard, AlertTriangle } from 'lucide-react';

const AnnualBalancePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('fondateur.annualBalance')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('fondateur.annualBalanceDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="22 500 000 F" label={t('fondateur.expectedRevenue')} icon={<Target className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="14 650 000 F" label={t('fondateur.actualRevenue')} icon={<CreditCard className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="7 850 000 F" label={t('fondateur.shortfall')} icon={<AlertTriangle className="w-5 h-5 text-amber-500" />} />
        <KPICard value="65.1%" label={t('fondateur.collectionRate')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
      </div>
      <Card className="shadow-sm border border-slate-100 p-6">
        <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('fondateur.byCycle')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('fondateur.cycle')}</th>
                <th className="px-6 py-3 text-left">{t('fondateur.expected')}</th>
                <th className="px-6 py-3 text-left">{t('fondateur.collected')}</th>
                <th className="px-6 py-3 text-left">{t('fondateur.rate')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              <tr><td className="px-6 py-3 font-bold">Cycle 1 FR (SIL, CP)</td><td className="px-6 py-3">5 200 000 F</td><td className="px-6 py-3">3 800 000 F</td><td className="px-6 py-3">73.1%</td></tr>
              <tr><td className="px-6 py-3 font-bold">Cycle 2 FR (CE1, CE2)</td><td className="px-6 py-3">4 400 000 F</td><td className="px-6 py-3">3 300 000 F</td><td className="px-6 py-3">75.0%</td></tr>
              <tr><td className="px-6 py-3 font-bold">Cycle 3 FR (CM1, CM2)</td><td className="px-6 py-3">4 200 000 F</td><td className="px-6 py-3">2 600 000 F</td><td className="px-6 py-3">61.9%</td></tr>
              <tr><td className="px-6 py-3 font-bold">Anglophone (Cl. 1-6)</td><td className="px-6 py-3">8 700 000 F</td><td className="px-6 py-3">4 950 000 F</td><td className="px-6 py-3">56.9%</td></tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default AnnualBalancePage;
