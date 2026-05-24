import React from 'react';
import { SidebarLayout } from '../../shared/components/layout/SidebarLayout';
import { KPICard } from '../../shared/components/ui/KPICard';
import { ShieldCheck, History, TrendingUp, Award } from 'lucide-react';

export const DashboardAuditeur: React.FC = () => {
  return (
    <SidebarLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Audit &mdash; Espace Commission Contrôle</h1>
          <p className="text-sm text-slate-400 font-semibold">Lecture seule: Intégrité des données financières et pédagogiques</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value="100%" label="Intégrité DB" icon={<ShieldCheck className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="1,240" label="Actions Loggées" icon={<History className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="9.8 M XAF" label="Total Comptabilisé" icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="12.4" label="Moyenne Générale" icon={<Award className="w-5 h-5 text-digi-purple" />} />
        </div>
      </div>
    </SidebarLayout>
  );
};
export default DashboardAuditeur;
