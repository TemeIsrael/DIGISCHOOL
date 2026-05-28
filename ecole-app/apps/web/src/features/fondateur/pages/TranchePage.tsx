import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockTranches = [
  { id: 1, nom: 'Tranche 1', pct: 40, echeance: '15/10/2025' },
  { id: 2, nom: 'Tranche 2', pct: 30, echeance: '15/01/2026' },
  { id: 3, nom: 'Tranche 3', pct: 30, echeance: '15/04/2026' },
];

const TranchePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('fondateur.tranches')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('fondateur.tranchesDesc')}</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />{t('fondateur.addTranche')}</Button>
      </div>
      <div className="space-y-4">
        {mockTranches.map((tr) => (
          <Card key={tr.id} className="shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{tr.nom}</h3>
                <p className="text-sm text-slate-400">{t('fondateur.deadline')}: {tr.echeance}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-digi-purple">{tr.pct}%</p>
                <p className="text-xs text-slate-400">{t('fondateur.ofTotal')}</p>
              </div>
            </div>
            <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-digi-purple rounded-full" style={{ width: tr.pct + '%' }} /></div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default TranchePage;
