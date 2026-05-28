import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Users, FolderOpen, FileText, Clock } from 'lucide-react';

const DashboardStaffPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('staff.dashboard')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('staff.dashboardDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="350" label={t('staff.totalStudents')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="120" label={t('staff.activeFiles')} icon={<FolderOpen className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="15" label={t('staff.pendingDocuments')} icon={<FileText className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="8" label={t('staff.recentUpdates')} icon={<Clock className="w-5 h-5 text-digi-purple" />} />
      </div>
      <Card className="shadow-sm border border-slate-100 p-6">
        <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('staff.recentActivity')}</h3>
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex justify-between py-2 border-b border-slate-50"><span>Dossier DUPONT Jean — Documents reçus</span><span className="text-xs text-slate-400">28/05/2026</span></div>
          <div className="flex justify-between py-2 border-b border-slate-50"><span>Dossier NGONO Marie — Certificat médical ajouté</span><span className="text-xs text-slate-400">27/05/2026</span></div>
          <div className="flex justify-between py-2 border-b border-slate-50"><span>Dossier BELLA Sarah — Attestation scolaire générée</span><span className="text-xs text-slate-400">26/05/2026</span></div>
          <div className="flex justify-between py-2"><span>Dossier KAMGA Paul — Photos reçues</span><span className="text-xs text-slate-400">25/05/2026</span></div>
        </div>
      </Card>
    </div>
  );
};
export default DashboardStaffPage;
