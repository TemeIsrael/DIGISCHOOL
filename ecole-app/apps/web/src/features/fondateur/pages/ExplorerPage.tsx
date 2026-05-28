import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';

const ExplorerPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('fondateur.explorer')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('fondateur.explorerDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="350" label={t('fondateur.totalStudents')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="24" label={t('fondateur.totalTeachers')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="18" label={t('fondateur.totalClasses')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="12.5" label={t('fondateur.avgClassSize')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('fondateur.studentsByCycle')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center"><span className="text-sm">Maternelle</span><div className="flex items-center gap-2"><div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-digi-purple rounded-full" style={{ width: '17%' }} /></div><span className="text-xs font-bold">60</span></div></div>
            <div className="flex justify-between items-center"><span className="text-sm">Primaire</span><div className="flex items-center gap-2"><div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-digi-purple rounded-full" style={{ width: '34%' }} /></div><span className="text-xs font-bold">120</span></div></div>
            <div className="flex justify-between items-center"><span className="text-sm">Secondaire 1er</span><div className="flex items-center gap-2"><div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-digi-purple rounded-full" style={{ width: '31%' }} /></div><span className="text-xs font-bold">110</span></div></div>
            <div className="flex justify-between items-center"><span className="text-sm">Secondaire 2nd</span><div className="flex items-center gap-2"><div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-digi-purple rounded-full" style={{ width: '17%' }} /></div><span className="text-xs font-bold">60</span></div></div>
          </div>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('fondateur.revenueByTrimester')}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center"><span className="text-sm">Trimestre 1</span><span className="text-sm font-bold">6 500 000 F</span></div>
            <div className="flex justify-between items-center"><span className="text-sm">Trimestre 2</span><span className="text-sm font-bold">4 800 000 F</span></div>
            <div className="flex justify-between items-center"><span className="text-sm">Trimestre 3</span><span className="text-sm font-bold">3 350 000 F</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default ExplorerPage;
