import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { CreditCard, Target, CheckCircle } from 'lucide-react';

const mockHistory = [
  { id: 1, date: '15/09/2025', montant: 50000, mode: 'Espèces', tranche: 'Tranche 1' },
  { id: 2, date: '10/01/2026', montant: 50000, mode: 'MoMo', tranche: 'Tranche 2' },
];

const StudentPaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const { matricule } = useParams();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('scolarite.studentPayments')} — {matricule}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('scolarite.studentPaymentsDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard value="150 000 F" label={t('scolarite.totalDue')} icon={<Target className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="100 000 F" label={t('scolarite.totalPaid')} icon={<CreditCard className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="50 000 F" label={t('scolarite.remaining')} icon={<CheckCircle className="w-5 h-5 text-digi-purple" />} />
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('scolarite.date')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.amount')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.paymentMode')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.tranche')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockHistory.map((p) => (
                <tr key={p.id}><td className="px-6 py-3">{p.date}</td><td className="px-6 py-3 font-bold">{p.montant.toLocaleString()} F</td><td className="px-6 py-3">{p.mode}</td><td className="px-6 py-3">{p.tranche}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default StudentPaymentPage;
