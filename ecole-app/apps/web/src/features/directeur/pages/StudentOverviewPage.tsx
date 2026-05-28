import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { GraduationCap, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const StudentOverviewPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.studentOverview')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.studentOverviewDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="350" label={t('directeur.totalStudents')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="7.2/10" label={t('directeur.avgGrade')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="78%" label={t('directeur.overallSuccessRate')} icon={<CheckCircle className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="12" label={t('directeur.atRiskStudents')} icon={<AlertTriangle className="w-5 h-5 text-amber-500" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('directeur.gradeDistribution')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center"><span className="text-sm">{"<"} 4/10</span><div className="flex items-center gap-2"><div className="w-32 h-2 bg-red-100 rounded-full overflow-hidden"><div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }} /></div><span className="text-xs font-bold text-red-600">10%</span></div></div>
            <div className="flex justify-between items-center"><span className="text-sm">4 - 5</span><div className="flex items-center gap-2"><div className="w-32 h-2 bg-amber-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: '20%' }} /></div><span className="text-xs font-bold text-amber-600">20%</span></div></div>
            <div className="flex justify-between items-center"><span className="text-sm">5 - 7</span><div className="flex items-center gap-2"><div className="w-32 h-2 bg-blue-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} /></div><span className="text-xs font-bold text-blue-600">45%</span></div></div>
            <div className="flex justify-between items-center"><span className="text-sm">{">"} 7/10</span><div className="flex items-center gap-2"><div className="w-32 h-2 bg-emerald-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '25%' }} /></div><span className="text-xs font-bold text-emerald-600">25%</span></div></div>
          </div>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('directeur.attendanceOverview')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-sm">{t('directeur.presentRate')}</span><span className="text-sm font-bold text-emerald-600">92.5%</span></div>
            <div className="flex justify-between"><span className="text-sm">{t('directeur.absentRate')}</span><span className="text-sm font-bold text-red-600">5.3%</span></div>
            <div className="flex justify-between"><span className="text-sm">{t('directeur.lateRate')}</span><span className="text-sm font-bold text-amber-600">2.2%</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default StudentOverviewPage;
