import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockCycles = [
  { id: 1, nom: 'Cycle 1 — Francophone (SIL, CP)', niveaux: 2, classes: 4, section: 'FR' },
  { id: 2, nom: 'Cycle 2 — Francophone (CE1, CE2)', niveaux: 2, classes: 4, section: 'FR' },
  { id: 3, nom: 'Cycle 3 — Francophone (CM1, CM2)', niveaux: 2, classes: 4, section: 'FR' },
  { id: 4, nom: 'Level 1 — Anglophone (Class 1, 2)', niveaux: 2, classes: 4, section: 'EN' },
  { id: 5, nom: 'Level 2 — Anglophone (Class 3, 4)', niveaux: 2, classes: 4, section: 'EN' },
  { id: 6, nom: 'Level 3 — Anglophone (Class 5, 6)', niveaux: 2, classes: 4, section: 'EN' },
];

const CycleManagePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('root.cycleManage')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('root.cycleManageDesc')}</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />{t('root.addCycle')}</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockCycles.map((c) => (
          <Card key={c.id} className="shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">{c.nom}</h3>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${c.section === 'FR' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>{c.section}</span>
            </div>
            <div className="mt-2 space-y-1 text-sm text-slate-500">
              <p>{c.niveaux} {t('root.levels')}</p>
              <p>{c.classes} {t('root.classesCount')}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CycleManagePage;
