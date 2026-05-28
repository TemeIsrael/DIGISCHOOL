import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockRooms = [
  { id: 'P01', libelle: 'Salle 01', surface: 48, position: 'Bâtiment A - RDC', classe: 'SIL A' },
  { id: 'P02', libelle: 'Salle 02', surface: 45, position: 'Bâtiment A - RDC', classe: 'CP A' },
  { id: 'P03', libelle: 'Salle 03', surface: 50, position: 'Bâtiment A - 1er', classe: 'CE1 A' },
  { id: 'A01', libelle: 'Salle 04', surface: 48, position: 'Bâtiment B - RDC', classe: 'Class 1 A' },
  { id: 'A02', libelle: 'Salle 05', surface: 46, position: 'Bâtiment B - RDC', classe: 'Class 2 A' },
  { id: 'BIB1', libelle: 'Bibliothèque', surface: 60, position: 'Bâtiment C - RDC', classe: '-' },
];

const RoomManagePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('root.roomManage')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('root.roomManageDesc')}</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />{t('root.addRoom')}</Button>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('root.roomCode')}</th>
                <th className="px-6 py-3 text-left">{t('root.roomLabel')}</th>
                <th className="px-6 py-3 text-left">{t('root.surface')}</th>
                <th className="px-6 py-3 text-left">{t('root.position')}</th>
                <th className="px-6 py-3 text-left">{t('root.assignedClass')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockRooms.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono text-xs font-bold">{r.id}</td>
                  <td className="px-6 py-3">{r.libelle}</td>
                  <td className="px-6 py-3">{r.surface} m²</td>
                  <td className="px-6 py-3">{r.position}</td>
                  <td className="px-6 py-3">{r.classe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default RoomManagePage;
