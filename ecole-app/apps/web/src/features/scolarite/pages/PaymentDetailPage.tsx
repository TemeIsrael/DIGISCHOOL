import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Download } from 'lucide-react';

const PaymentDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('scolarite.paymentDetail')} #{id}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('scolarite.paymentDetailDesc')}</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="w-4 h-4" />{t('scolarite.downloadReceipt')}</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-slate-100 p-6 space-y-3">
          <h3 className="text-sm font-bold uppercase text-slate-700">{t('scolarite.studentInfo')}</h3>
          <div className="text-sm space-y-2">
            <p><span className="text-slate-400">{t('scolarite.studentId')}:</span> <span className="font-bold">EL-001</span></p>
            <p><span className="text-slate-400">{t('scolarite.studentName')}:</span> <span className="font-bold">DUPONT Jean</span></p>
            <p><span className="text-slate-400">{t('scolarite.class')}:</span> <span className="font-bold">6ème A</span></p>
          </div>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6 space-y-3">
          <h3 className="text-sm font-bold uppercase text-slate-700">{t('scolarite.paymentInfo')}</h3>
          <div className="text-sm space-y-2">
            <p><span className="text-slate-400">{t('scolarite.amount')}:</span> <span className="font-bold text-digi-purple">50 000 F</span></p>
            <p><span className="text-slate-400">{t('scolarite.paymentMode')}:</span> <span className="font-bold">Orange Money</span></p>
            <p><span className="text-slate-400">{t('scolarite.date')}:</span> <span className="font-bold">15/03/2026</span></p>
            <p><span className="text-slate-400">{t('scolarite.tranche')}:</span> <span className="font-bold">{t('scolarite.tranche2')}</span></p>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default PaymentDetailPage;
