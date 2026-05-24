import React from 'react';
import { SidebarLayout } from '../../shared/components/layout/SidebarLayout';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { Users, Shield, Terminal, ShieldAlert } from 'lucide-react';
export const DashboardRoot: React.FC = () => {

  return (
    <SidebarLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Super Admin &mdash; Dashboard Root</h1>
          <p className="text-sm text-slate-400 font-semibold">Vue d'ensemble et logs d'audit système</p>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value="5" label="Total Admins" icon={<Shield className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="24" label="Total Personnel" icon={<Users className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="450" label="Total Élèves" icon={<Users className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="12" label="Connexions Actives" icon={<Terminal className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* Audit Logs */}
        <Card className="shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <ShieldAlert className="w-5 h-5 text-digi-purple" />
            <h3 className="text-sm font-bold uppercase tracking-wider">Traces d'Audit Récentes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left">Utilisateur</th>
                  <th className="px-6 py-3 text-left">Action</th>
                  <th className="px-6 py-3 text-left">Ressource</th>
                  <th className="px-6 py-3 text-left">IP Address</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                <tr>
                  <td className="px-6 py-3">ADMIN</td>
                  <td className="px-6 py-3">LOGIN</td>
                  <td className="px-6 py-3">auth</td>
                  <td className="px-6 py-3">127.0.0.1</td>
                  <td className="px-6 py-3">{new Date().toLocaleDateString('fr-FR')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </SidebarLayout>
  );
};
export default DashboardRoot;
