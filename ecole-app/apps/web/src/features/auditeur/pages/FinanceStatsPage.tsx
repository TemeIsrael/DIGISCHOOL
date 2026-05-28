import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { CreditCard, TrendingUp, Target, AlertTriangle } from 'lucide-react';

const FinanceStatsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('auditeur.financeStats')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('auditeur.financeStatsDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="22 500 000 F" label={t('auditeur.expectedTotal')} icon={<Target className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="14 650 000 F" label={t('auditeur.collectedTotal')} icon={<CreditCard className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="65.1%" label={t('auditeur.collectionRate')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="35" label={t('auditeur.overdueStudents')} icon={<AlertTriangle className="w-5 h-5 text-amber-500" />} />
      </div>
      <Card className="shadow-sm border border-slate-100 p-6">
        <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('auditeur.paymentTrends')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr><th className="px-6 py-3 text-left">{t('auditeur.month')}</th><th className="px-6 py-3 text-left">{t('auditeur.amount')}</th><th className="px-6 py-3 text-left">{t('auditeur.transactions')}</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              <tr><td className="px-6 py-3">Sept 2025</td><td className="px-6 py-3 font-bold">2 500 000 F</td><td className="px-6 py-3">45</td></tr>
              <tr><td className="px-6 py-3">Oct 2025</td><td className="px-6 py-3 font-bold">1 800 000 F</td><td className="px-6 py-3">32</td></tr>
              <tr><td className="px-6 py-3">Nov 2025</td><td className="px-6 py-3 font-bold">1 200 000 F</td><td className="px-6 py-3">22</td></tr>
              <tr><td className="px-6 py-3">Janv 2026</td><td className="px-6 py-3 font-bold">1 900 000 F</td><td className="px-6 py-3">38</td></tr>
              <tr><td className="px-6 py-3">Mars 2026</td><td className="px-6 py-3 font-bold">2 400 000 F</td><td className="px-6 py-3">42</td></tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default FinanceStatsPage;
