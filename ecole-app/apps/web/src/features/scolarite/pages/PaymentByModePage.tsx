import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

const mockModeStats = [
  { mode: 'Espèces', count: 85, total: 4500000, pct: 45.9 },
  { mode: 'Orange Money', count: 42, total: 2200000, pct: 22.4 },
  { mode: 'MTN MoMo', count: 38, total: 1800000, pct: 18.4 },
  { mode: 'Virement Bancaire', count: 14, total: 1300000, pct: 13.3 },
];

const PaymentByModePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('scolarite.paymentByMode')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('scolarite.paymentByModeDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockModeStats.map((m) => (
          <Card key={m.mode} className="shadow-sm border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-slate-800">{m.mode}</h3>
            <p className="text-2xl font-extrabold text-digi-purple mt-2">{m.total.toLocaleString()} F</p>
            <p className="text-xs text-slate-400 mt-1">{m.count} {t('scolarite.transactions')} · {m.pct}%</p>
            <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-digi-purple rounded-full" style={{ width: m.pct + '%' }} /></div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default PaymentByModePage;
