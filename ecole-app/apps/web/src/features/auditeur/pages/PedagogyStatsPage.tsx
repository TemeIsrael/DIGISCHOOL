import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { GraduationCap, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';

const PedagogyStatsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('auditeur.pedagogyStats')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('auditeur.pedagogyStatsDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="12.1/20" label={t('auditeur.globalAverage')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="78%" label={t('auditeur.globalSuccessRate')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="15" label={t('auditeur.subjectsTaught')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="86%" label={t('auditeur.gradeCompletionRate')} icon={<CheckCircle className="w-5 h-5 text-digi-purple" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('auditeur.resultsByClass')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>6ème A</span><span className="font-bold">12.5/20 (82%)</span></div>
            <div className="flex justify-between"><span>6ème B</span><span className="font-bold">11.8/20 (75%)</span></div>
            <div className="flex justify-between"><span>5ème A</span><span className="font-bold">13.1/20 (88%)</span></div>
            <div className="flex justify-between"><span>4ème A</span><span className="font-bold">10.9/20 (68%)</span></div>
            <div className="flex justify-between"><span>3ème A</span><span className="font-bold">11.2/20 (72%)</span></div>
          </div>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('auditeur.resultsBySubject')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Maths</span><span className="font-bold">11.3/20</span></div>
            <div className="flex justify-between"><span>Français</span><span className="font-bold">12.8/20</span></div>
            <div className="flex justify-between"><span>Anglais</span><span className="font-bold">13.5/20</span></div>
            <div className="flex justify-between"><span>SVT</span><span className="font-bold">14.1/20</span></div>
            <div className="flex justify-between"><span>Physique</span><span className="font-bold">10.7/20</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default PedagogyStatsPage;
