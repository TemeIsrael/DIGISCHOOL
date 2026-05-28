import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Download, FileText } from 'lucide-react';

const AccountingExportPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('scolarite.accountingExport')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('scolarite.accountingExportDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-digi-purple" />
            <div><h3 className="font-bold text-slate-800">{t('scolarite.exportCSV')}</h3><p className="text-xs text-slate-400">{t('scolarite.exportCSVDesc')}</p></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('scolarite.period')}</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <option>{t('scolarite.currentMonth')}</option>
              <option>{t('scolarite.currentTrimester')}</option>
              <option>{t('scolarite.fullYear')}</option>
            </select>
          </div>
          <Button className="gap-2 w-full"><Download className="w-4 h-4" />{t('scolarite.downloadCSV')}</Button>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-red-500" />
            <div><h3 className="font-bold text-slate-800">{t('scolarite.exportPDF')}</h3><p className="text-xs text-slate-400">{t('scolarite.exportPDFDesc')}</p></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('scolarite.period')}</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <option>{t('scolarite.currentMonth')}</option>
              <option>{t('scolarite.currentTrimester')}</option>
              <option>{t('scolarite.fullYear')}</option>
            </select>
          </div>
          <Button variant="outline" className="gap-2 w-full"><Download className="w-4 h-4" />{t('scolarite.downloadPDF')}</Button>
        </Card>
      </div>
    </div>
  );
};
export default AccountingExportPage;
