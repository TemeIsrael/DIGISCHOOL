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
        <KPICard value="7.2/10" label={t('auditeur.globalAverage')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="78%" label={t('auditeur.globalSuccessRate')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="15" label={t('auditeur.subjectsTaught')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="86%" label={t('auditeur.gradeCompletionRate')} icon={<CheckCircle className="w-5 h-5 text-digi-purple" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('auditeur.resultsByClass')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>SIL A</span><span className="font-bold">7.5/10 (88%)</span></div>
            <div className="flex justify-between"><span>CP A</span><span className="font-bold">7.1/10 (80%)</span></div>
            <div className="flex justify-between"><span>CE1 A</span><span className="font-bold">6.8/10 (76%)</span></div>
            <div className="flex justify-between"><span>CM2 A</span><span className="font-bold">7.4/10 (85%)</span></div>
            <div className="flex justify-between"><span>Class 6 A</span><span className="font-bold">7.0/10 (78%)</span></div>
          </div>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('auditeur.resultsBySubject')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Maths</span><span className="font-bold">6.8/10</span></div>
            <div className="flex justify-between"><span>Français</span><span className="font-bold">7.2/10</span></div>
            <div className="flex justify-between"><span>Anglais</span><span className="font-bold">7.8/10</span></div>
            <div className="flex justify-between"><span>Sciences & Tech.</span><span className="font-bold">6.1/10</span></div>
            <div className="flex justify-between"><span>Éd. Civique</span><span className="font-bold">7.5/10</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default PedagogyStatsPage;
