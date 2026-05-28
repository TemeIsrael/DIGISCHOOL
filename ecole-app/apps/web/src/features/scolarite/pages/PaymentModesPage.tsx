import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockModes = [
  { id: 1, nom: 'Espèces', code: 'CASH', actif: true },
  { id: 2, nom: 'Orange Money', code: 'OM', actif: true },
  { id: 3, nom: 'MTN MoMo', code: 'MOMO', actif: true },
  { id: 4, nom: 'Virement Bancaire', code: 'BANK', actif: true },
  { id: 5, nom: 'Chèque', code: 'CHQ', actif: false },
];

const PaymentModesPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('scolarite.paymentModes')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('scolarite.paymentModesDesc')}</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />{t('scolarite.addMode')}</Button>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('scolarite.modeName')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.modeCode')}</th>
                <th className="px-6 py-3 text-left">{t('root.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockModes.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold">{m.nom}</td>
                  <td className="px-6 py-3 font-mono text-xs">{m.code}</td>
                  <td className="px-6 py-3"><span className={`px-2 py-0.5 text-xs font-bold rounded-full ${m.actif ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{m.actif ? t('root.active') : t('root.inactive')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default PaymentModesPage;
