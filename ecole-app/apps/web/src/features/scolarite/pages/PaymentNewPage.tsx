import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { Card } from '../../../shared/components/ui/Card';

const PaymentNewPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('scolarite.newPayment')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('scolarite.newPaymentDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100 p-6 space-y-4 max-w-2xl">
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('scolarite.studentId')}</label><input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="EL-001" /></div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('scolarite.amount')}</label><input type="number" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="50000" /></div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('scolarite.paymentMode')}</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            <option>{t('scolarite.cash')}</option>
            <option>Orange Money</option>
            <option>MTN MoMo</option>
            <option>{t('scolarite.bankTransfer')}</option>
          </select>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('scolarite.tranche')}</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            <option>{t('scolarite.tranche1')}</option>
            <option>{t('scolarite.tranche2')}</option>
            <option>{t('scolarite.tranche3')}</option>
          </select>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('scolarite.receipt')}</label><input type="file" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
        <div className="flex gap-3 pt-4">
          <Button>{t('scolarite.registerPayment')}</Button>
          <Button variant="outline" onClick={() => navigate('/scolarite/payments')}>{t('common.cancel')}</Button>
        </div>
      </Card>
    </div>
  );
};
export default PaymentNewPage;
