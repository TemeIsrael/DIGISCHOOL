import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockClasses = [
  { id: 1, nom: 'SIL A', cycle: 'Cycle 1 — Francophone', section: 'FR', effectif: 40, salle: 'P01' },
  { id: 2, nom: 'CP A', cycle: 'Cycle 1 — Francophone', section: 'FR', effectif: 38, salle: 'P02' },
  { id: 3, nom: 'CE1 A', cycle: 'Cycle 2 — Francophone', section: 'FR', effectif: 35, salle: 'P03' },
  { id: 4, nom: 'CE2 A', cycle: 'Cycle 2 — Francophone', section: 'FR', effectif: 32, salle: 'P04' },
  { id: 5, nom: 'CM1 A', cycle: 'Cycle 3 — Francophone', section: 'FR', effectif: 30, salle: 'P05' },
  { id: 6, nom: 'CM2 A', cycle: 'Cycle 3 — Francophone', section: 'FR', effectif: 28, salle: 'P06' },
  { id: 7, nom: 'Class 1 A', cycle: 'Level 1 — Anglophone', section: 'EN', effectif: 36, salle: 'A01' },
  { id: 8, nom: 'Class 2 A', cycle: 'Level 1 — Anglophone', section: 'EN', effectif: 34, salle: 'A02' },
  { id: 9, nom: 'Class 3 A', cycle: 'Level 2 — Anglophone', section: 'EN', effectif: 33, salle: 'A03' },
  { id: 10, nom: 'Class 4 A', cycle: 'Level 2 — Anglophone', section: 'EN', effectif: 30, salle: 'A04' },
  { id: 11, nom: 'Class 5 A', cycle: 'Level 3 — Anglophone', section: 'EN', effectif: 28, salle: 'A05' },
  { id: 12, nom: 'Class 6 A', cycle: 'Level 3 — Anglophone', section: 'EN', effectif: 25, salle: 'A06' },
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
                <th className="px-6 py-3 text-left">{t('root.section')}</th>
                <th className="px-6 py-3 text-left">{t('root.cycle')}</th>
                <th className="px-6 py-3 text-left">{t('root.enrollment')}</th>
                <th className="px-6 py-3 text-left">{t('root.assignedRoom')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockClasses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold">{c.nom}</td>
                  <td className="px-6 py-3"><span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${c.section === 'FR' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>{c.section === 'FR' ? 'Francophone' : 'Anglophone'}</span></td>
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
