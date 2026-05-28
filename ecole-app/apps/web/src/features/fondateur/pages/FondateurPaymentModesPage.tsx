import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockModes = [
  { id: 1, nom: 'Espèces', actif: true, frais: '0%' },
  { id: 2, nom: 'Orange Money', actif: true, frais: '1.5%' },
  { id: 3, nom: 'MTN MoMo', actif: true, frais: '1.5%' },
  { id: 4, nom: 'Virement Bancaire', actif: true, frais: '0%' },
];

const FondateurPaymentModesPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('fondateur.paymentModes')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('fondateur.paymentModesDesc')}</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />{t('fondateur.addMode')}</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockModes.map((m) => (
          <Card key={m.id} className="shadow-sm border border-slate-100 p-5 space-y-2">
            <h3 className="text-lg font-bold text-slate-800">{m.nom}</h3>
            <p className="text-sm text-slate-400">{t('fondateur.fees')}: <span className="font-bold text-slate-700">{m.frais}</span></p>
            <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full ${m.actif ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{m.actif ? t('root.active') : t('root.inactive')}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default FondateurPaymentModesPage;
