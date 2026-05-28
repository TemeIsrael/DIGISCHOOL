import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Download, FileText, BarChart3, Database } from 'lucide-react';

const ExportsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('auditeur.exports')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('auditeur.exportsDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3"><FileText className="w-8 h-8 text-digi-purple" /><div><h3 className="font-bold text-slate-800">{t('auditeur.completeReport')}</h3><p className="text-xs text-slate-400">{t('auditeur.completeReportDesc')}</p></div></div>
          <Button variant="outline" className="gap-2 w-full"><Download className="w-4 h-4" />PDF</Button>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3"><BarChart3 className="w-8 h-8 text-digi-purple" /><div><h3 className="font-bold text-slate-800">{t('auditeur.rawData')}</h3><p className="text-xs text-slate-400">{t('auditeur.rawDataDesc')}</p></div></div>
          <Button variant="outline" className="gap-2 w-full"><Download className="w-4 h-4" />CSV</Button>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3"><Database className="w-8 h-8 text-digi-purple" /><div><h3 className="font-bold text-slate-800">{t('auditeur.fullBackup')}</h3><p className="text-xs text-slate-400">{t('auditeur.fullBackupDesc')}</p></div></div>
          <Button variant="outline" className="gap-2 w-full"><Download className="w-4 h-4" />ZIP</Button>
        </Card>
      </div>
    </div>
  );
};
export default ExportsPage;
