import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        value={formatCFA(attendu)}
        label={t('payments.totalExpected')}
        icon={<CreditCard className="w-5 h-5 text-digi-purple" />}
      />
      <KPICard
        value={formatCFA(encaisse)}
        label={t('payments.totalCollected')}
        icon={<ShieldCheck className="w-5 h-5 text-digi-purple" />}
      />
      <KPICard
        value={formatCFA(impaye)}
        label={t('payments.totalUnpaid')}
        icon={<HelpCircle className="w-5 h-5 text-digi-purple" />}
      />
      <KPICard
        value={prochaineEcheance}
        label={t('payments.nextDeadline')}
        icon={<CreditCard className="w-5 h-5 text-digi-purple" />}
      />
    </div>
  );
};
