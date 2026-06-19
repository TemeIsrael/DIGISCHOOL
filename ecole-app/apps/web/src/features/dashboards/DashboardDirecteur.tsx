import React from 'react';
import { useTranslation } from 'react-i18next';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { GraduationCap, Award, CheckSquare, ShieldAlert, ShieldCheck, History, TrendingUp } from 'lucide-react';

export const DashboardDirecteur: React.FC = () => {
  const { t } = useTranslation();

  const rankingData = [
    { className: 'CM2 A', average: 8.2, count: 32 },
    { className: 'CM1 A', average: 7.6, count: 28 },
    { className: 'CE2 A', average: 7.1, count: 35 },
    { className: 'SIL A', average: 6.8, count: 30 }
  ];

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">{t('auth.dashboard.directeur.title')}</h1>
            <p className="text-sm text-slate-400 font-semibold">{t('auth.dashboard.directeur.subtitle')}</p>
          </div>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value="7.2/10" label={t('stats.generalAvg')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="82.4%" label={t('dashboards.estimatedSuccessRate')} icon={<Award className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="14" label={t('dashboards.bulletinsToValidate')} icon={<CheckSquare className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="3" label={t('dashboards.disciplinaryComplaints')} icon={<ShieldAlert className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* Top classes */}
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t('dashboards.classRankingByAvg')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left">{t('dashboards.class')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboards.enrollment')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboards.trimesterAvg')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboards.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {rankingData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-3 font-bold">{item.className}</td>
                    <td className="px-6 py-3">{item.count} {t('dashboards.studentsCount')}</td>
                    <td className="px-6 py-3 text-digi-purple font-extrabold">{item.average} / 10</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                        {t('dashboards.rising')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Audit KPIs transferred from Auditeur */}
        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">{t('auth.dashboard.auditeur.title', 'Audit & Conformité')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard value="100%" label={t('dashboards.dbIntegrity', 'Intégrité DB')} icon={<ShieldCheck className="w-5 h-5 text-digi-purple" />} />
            <KPICard value="1,240" label={t('dashboards.loggedActions', 'Actions Loggées')} icon={<History className="w-5 h-5 text-digi-purple" />} />
            <KPICard value="9.8 M XAF" label={t('dashboards.totalAccounted', 'Total Comptabilisé')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
          </div>
        </div>
      </div>
  );
};
export default DashboardDirecteur;
