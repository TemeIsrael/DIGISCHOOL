import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Download, FileText, BarChart3, Users } from 'lucide-react';

const SyntheticReportsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.syntheticReports')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.syntheticReportsDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3"><FileText className="w-8 h-8 text-digi-purple" /><div><h3 className="font-bold text-slate-800">{t('directeur.academicReport')}</h3><p className="text-xs text-slate-400">{t('directeur.academicReportDesc')}</p></div></div>
          <Button variant="outline" className="gap-2 w-full"><Download className="w-4 h-4" />{t('common.exportPDF')}</Button>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3"><BarChart3 className="w-8 h-8 text-digi-purple" /><div><h3 className="font-bold text-slate-800">{t('directeur.statisticalReport')}</h3><p className="text-xs text-slate-400">{t('directeur.statisticalReportDesc')}</p></div></div>
          <Button variant="outline" className="gap-2 w-full"><Download className="w-4 h-4" />{t('common.exportPDF')}</Button>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3"><Users className="w-8 h-8 text-digi-purple" /><div><h3 className="font-bold text-slate-800">{t('directeur.staffReport')}</h3><p className="text-xs text-slate-400">{t('directeur.staffReportDesc')}</p></div></div>
          <Button variant="outline" className="gap-2 w-full"><Download className="w-4 h-4" />{t('common.exportPDF')}</Button>
        </Card>
      </div>
    </div>
  );
};
export default SyntheticReportsPage;
