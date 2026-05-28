import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockClasses = [
  { id: 1, nom: '6ème A', cycle: 'Secondaire 1er cycle', effectif: 35, salle: 'S01' },
  { id: 2, nom: '6ème B', cycle: 'Secondaire 1er cycle', effectif: 32, salle: 'S02' },
  { id: 3, nom: '5ème A', cycle: 'Secondaire 1er cycle', effectif: 30, salle: 'S03' },
  { id: 4, nom: '4ème A', cycle: 'Secondaire 1er cycle', effectif: 28, salle: 'S04' },
  { id: 5, nom: '3ème A', cycle: 'Secondaire 1er cycle', effectif: 25, salle: 'S05' },
  { id: 6, nom: 'CM2 A', cycle: 'Primaire (SIL-CM2)', effectif: 40, salle: 'P01' },
];

const ClassManagePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('root.classManage')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('root.classManageDesc')}</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />{t('root.addClass')}</Button>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('root.className')}</th>
                <th className="px-6 py-3 text-left">{t('root.cycle')}</th>
                <th className="px-6 py-3 text-left">{t('root.enrollment')}</th>
                <th className="px-6 py-3 text-left">{t('root.assignedRoom')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockClasses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold">{c.nom}</td>
                  <td className="px-6 py-3">{c.cycle}</td>
                  <td className="px-6 py-3">{c.effectif} {t('root.studentsCount')}</td>
                  <td className="px-6 py-3 font-mono text-xs">{c.salle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default ClassManagePage;
