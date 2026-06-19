import React from 'react';
import { CreditCard, ShieldCheck, HelpCircle } from 'lucide-react';
import { KPICard } from '../ui/KPICard';
import { formatCFA } from '../../lib/formatters';

export interface KPIFinanceProps {
  attendu: number;
  encaisse: number;
  impaye: number;
  prochaineEcheance: string;
}

export const KPIFinance: React.FC<KPIFinanceProps> = ({
  attendu,
  encaisse,
  impaye,
  prochaineEcheance
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        value={formatCFA(attendu)}
        label="Total Attendu"
        icon={<CreditCard className="w-5 h-5 text-digi-purple" />}
      />
      <KPICard
        value={formatCFA(encaisse)}
        label="Total Encaissé"
        icon={<ShieldCheck className="w-5 h-5 text-digi-purple" />}
      />
      <KPICard
        value={formatCFA(impaye)}
        label="Total Impayé"
        icon={<HelpCircle className="w-5 h-5 text-digi-purple" />}
      />
      <KPICard
        value={prochaineEcheance}
        label="Prochaine Échéance"
        icon={<CreditCard className="w-5 h-5 text-digi-purple" />}
      />
    </div>
  );
};
