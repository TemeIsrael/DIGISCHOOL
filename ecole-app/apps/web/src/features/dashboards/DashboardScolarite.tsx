import React from 'react';
import { KPIFinance } from '../../shared/components/business/KPIFinance';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CreditCard, Users } from 'lucide-react';

export const DashboardScolarite: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const chartData = [
    { name: t('months.jan', 'Janv'), montant: 1200000 },
    { name: t('months.feb', 'Févr'), montant: 1900000 },
    { name: t('months.mar', 'Mars'), montant: 1500000 },
    { name: t('months.apr', 'Avril'), montant: 2200000 },
    { name: t('months.may', 'Mai'), montant: 3100000 }
  ];

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">{t('auth.dashboard.scolarite.title')}</h1>
            <p className="text-sm text-slate-400 font-semibold">{t('auth.dashboard.scolarite.subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/payments/overdue')} className="gap-2">
              <Users className="w-4 h-4" />
              <span>{t('dashboards.latePayments')}</span>
            </Button>
            <Button onClick={() => navigate('/payments/new')} className="gap-2">
              <CreditCard className="w-4 h-4" />
              <span>{t('dashboards.recordPayment')}</span>
            </Button>
          </div>
        </div>

        {/* 4 Financial KPIs */}
        <KPIFinance attendu={15000000} encaisse={9800000} impaye={5200000} prochaineEcheance="30/05/2026" />

        {/* Monthly Chart */}
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t('dashboards.monthlyPayments')}</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: '#EEEDFE/40' }} />
                <Bar dataKey="montant" fill="#534AB7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
  );
};
export default DashboardScolarite;
