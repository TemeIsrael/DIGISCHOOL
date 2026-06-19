import React from 'react';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Button } from '../../shared/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FilePlus, GraduationCap, Home } from 'lucide-react';

export const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">{t('auth.dashboard.admin.title')}</h1>
            <p className="text-sm text-slate-400 font-semibold">{t('auth.dashboard.admin.subtitle')}</p>
          </div>
          <Button onClick={() => navigate('/students/new')} className="gap-2">
            <FilePlus className="w-4 h-4" />
            <span>{t('students.newStudent')}</span>
          </Button>
        </div>

        {/* 3 KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard value="12" label={t('dashboards.inscriptionsDay')} icon={<FilePlus className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="442" label={t('dashboards.activeStudents')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="18" label={t('dashboards.availableRooms')} icon={<Home className="w-5 h-5 text-digi-purple" />} />
        </div>
      </div>
  );
};
export default DashboardAdmin;
