import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Button } from '../../../shared/components/ui/Button';
import { TrendingUp, Target, CreditCard, Download } from 'lucide-react';

const FinancialReportPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('scolarite.financialReport')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('scolarite.financialReportDesc')}</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="w-4 h-4" />{t('common.exportPDF')}</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="15 000 000 F" label={t('scolarite.expectedTotal')} icon={<Target className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="9 800 000 F" label={t('scolarite.collectedTotal')} icon={<CreditCard className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="5 200 000 F" label={t('scolarite.unpaidTotal')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="65.3%" label={t('scolarite.collectionRate')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
      </div>
      <Card className="shadow-sm border border-slate-100 p-6">
        <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('scolarite.monthlyBreakdown')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('scolarite.month')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.collected')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.transactions')}</th>
              </tr>
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
export default FinancialReportPage;
