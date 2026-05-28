import React from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarLayout } from '../../shared/components/layout/SidebarLayout';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { Users, Shield, Terminal, ShieldAlert } from 'lucide-react';
export const DashboardRoot: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <SidebarLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('dashboard.root')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('dashboard.subtitleRoot')}</p>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value="5" label={t('dashboard.totalAdmins')} icon={<Shield className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="24" label={t('dashboard.totalStaff')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="450" label={t('dashboard.totalStudents')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="12" label={t('dashboard.activeConnections')} icon={<Terminal className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* Audit Logs */}
        <Card className="shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <ShieldAlert className="w-5 h-5 text-digi-purple" />
            <h3 className="text-sm font-bold uppercase tracking-wider">{t('dashboard.recentAuditTraces')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left">{t('dashboard.user')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboard.action')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboard.resource')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboard.ipAddress')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboard.date')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                <tr>
                  <td className="px-6 py-3">ADMIN</td>
                  <td className="px-6 py-3">LOGIN</td>
                  <td className="px-6 py-3">auth</td>
                  <td className="px-6 py-3">127.0.0.1</td>
                  <td className="px-6 py-3">{new Date().toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US')}</td>
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
