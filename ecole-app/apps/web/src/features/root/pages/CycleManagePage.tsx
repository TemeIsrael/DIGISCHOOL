import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockCycles = [
  { id: 1, nom: 'Maternelle', niveaux: 3, classes: 6 },
  { id: 2, nom: 'Primaire (SIL-CM2)', niveaux: 6, classes: 12 },
  { id: 3, nom: 'Secondaire 1er cycle', niveaux: 4, classes: 8 },
  { id: 4, nom: 'Secondaire 2nd cycle', niveaux: 3, classes: 6 },
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
            <h3 className="text-lg font-bold text-slate-800">{c.nom}</h3>
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
