import React from 'react';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, Users, Landmark, Target } from 'lucide-react';
import { formatCFA } from '../../shared/lib/formatters';

export const DashboardFondateur: React.FC = () => {
  const { t } = useTranslation();
  
  const pieData = [
    { name: t('paymentMethods.cash', 'Espèces'), value: 4500000 },
    { name: t('paymentMethods.transfer', 'Virement'), value: 3300000 },
    { name: t('paymentMethods.mobileMoney', 'Mobile Money'), value: 2000000 }
  ];
  const COLORS = ['#534AB7', '#7F77DD', '#AFA9EC'];

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">{t('auth.dashboard.fondateur.title')}</h1>
            <p className="text-sm text-slate-400 font-semibold">{t('auth.dashboard.fondateur.subtitle')}</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value={formatCFA(9800000)} label={t('dashboards.revenueCollected')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="65.3%" label={t('dashboards.recoveryRate')} icon={<Target className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="442" label={t('dashboards.totalEnrollment')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="2" label={t('dashboards.activeCycles')} icon={<Landmark className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* Donut Chart */}
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4 max-w-md">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t('dashboards.paymentMethodDistribution')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCFA(Number(value))} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
  );
};
export default DashboardFondateur;
