import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockTerms = [
  { id: 1, trimestre: 'Trimestre 1', debut: '01/09/2025', fin: '15/12/2025', sessions: ['Séquence 1', 'Séquence 2'] },
  { id: 2, trimestre: 'Trimestre 2', debut: '06/01/2026', fin: '31/03/2026', sessions: ['Séquence 3', 'Séquence 4'] },
  { id: 3, trimestre: 'Trimestre 3', debut: '14/04/2026', fin: '30/06/2026', sessions: ['Séquence 5', 'Séquence 6'] },
];

const TermManagePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('root.termManage')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('root.termManageDesc')}</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />{t('root.addTerm')}</Button>
      </div>
      <div className="space-y-4">
        {mockTerms.map((term) => (
          <Card key={term.id} className="shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{term.trimestre}</h3>
                <p className="text-sm text-slate-400">{term.debut} — {term.fin}</p>
              </div>
              <div className="flex gap-2">
                {term.sessions.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-digi-purple-bg text-digi-purple text-xs font-bold rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default TermManagePage;
