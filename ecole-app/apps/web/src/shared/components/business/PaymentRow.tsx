import React from 'react';
import { formatCFA, formatDate } from '../../lib/formatters';
import { Badge } from '../ui/Badge';

export interface PaymentRowProps {
  montant: number;
  mode: string;
  date: string;
  actif: boolean;
}

export const PaymentRow: React.FC<PaymentRowProps> = ({
  montant,
  mode,
  date,
  actif
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <div className="space-y-0.5">
        <p className="text-sm font-bold text-slate-800">{formatCFA(montant)}</p>
        <p className="text-xs text-slate-400 font-semibold">{mode} &bull; {formatDate(date)}</p>
      </div>
      <Badge variant={actif ? 'success' : 'danger'}>
        {actif ? 'Payé' : 'Annulé'}
      </Badge>
    </div>
  );
};
