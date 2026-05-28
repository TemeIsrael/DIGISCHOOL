import React from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarLayout } from '../../shared/components/layout/SidebarLayout';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { GraduationCap, Award, CheckSquare, ShieldAlert } from 'lucide-react';

export const DashboardDirecteur: React.FC = () => {
  const { t } = useTranslation();

  const rankingData = [
    { className: '3ème A', average: 14.5, count: 32 },
    { className: 'Terminale C', average: 13.8, count: 28 },
    { className: '6ème B', average: 12.9, count: 35 },
    { className: '4ème A', average: 11.2, count: 30 }
  ];

  return (
    <SidebarLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('dashboard.directeurTitle')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('dashboard.subtitleDirecteur')}</p>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value="12.4/20" label={t('dashboard.generalAverage')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="82.4%" label={t('dashboard.estimatedSuccessRate')} icon={<Award className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="14" label={t('dashboard.bulletinsToValidate')} icon={<CheckSquare className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="3" label={t('dashboard.disciplineComplaints')} icon={<ShieldAlert className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* Top classes */}
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t('dashboard.classRankingByAvg')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left">{t('dashboard.class')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboard.enrollment')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboard.trimesterAverage')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboard.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {rankingData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-3 font-bold">{item.className}</td>
                    <td className="px-6 py-3">{item.count} {t('dashboard.students')}</td>
                    <td className="px-6 py-3 text-digi-purple font-extrabold">{item.average} / 20</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                        {t('dashboard.rising')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </SidebarLayout>
  );
};
export default DashboardDirecteur;
