import React from 'react';
import { SidebarLayout } from '../../shared/components/layout/SidebarLayout';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Landmark, TrendingUp, Users, Target } from 'lucide-react';
import { formatCFA } from '../../shared/lib/formatters';

export const DashboardFondateur: React.FC = () => {
  const pieData = [
    { name: 'Espèces', value: 4500000 },
    { name: 'Virement', value: 3300000 },
    { name: 'Mobile Money', value: 2000000 }
  ];

  const COLORS = ['#534AB7', '#7F77DD', '#AFA9EC'];

  return (
    <SidebarLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fondation &mdash; Espace Promoteur</h1>
          <p className="text-sm text-slate-400 font-semibold">Indicateurs financiers exécutifs et statistiques de recouvrement</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value={formatCFA(9800000)} label="Revenus Encaissés" icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="65.3%" label="Taux Recouvrement" icon={<Target className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="442" label="Effectif Total" icon={<Users className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="3" label="Cycles Actifs" icon={<Landmark className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* Donut Chart */}
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4 max-w-md">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Répartition par Modes de Paiement</h3>
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
    </SidebarLayout>
  );
};
export default DashboardFondateur;
