import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Users, GraduationCap } from 'lucide-react';

const DemographicsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.demographics')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.demographicsDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="350" label={t('directeur.totalStudents')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="52%/48%" label={t('directeur.genderRatio')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="12.3" label={t('directeur.avgAge')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="280" label={t('directeur.parentCount')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('directeur.byNeighborhood')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Bastos</span><span className="font-bold">45</span></div>
            <div className="flex justify-between"><span>Mvan</span><span className="font-bold">38</span></div>
            <div className="flex justify-between"><span>Nsimeyong</span><span className="font-bold">52</span></div>
            <div className="flex justify-between"><span>Biyem-Assi</span><span className="font-bold">65</span></div>
            <div className="flex justify-between"><span>{t('directeur.others')}</span><span className="font-bold">150</span></div>
          </div>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('directeur.newStudentsByYear')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>2023-2024</span><span className="font-bold">85</span></div>
            <div className="flex justify-between"><span>2024-2025</span><span className="font-bold">95</span></div>
            <div className="flex justify-between"><span>2025-2026</span><span className="font-bold">110</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default DemographicsPage;
