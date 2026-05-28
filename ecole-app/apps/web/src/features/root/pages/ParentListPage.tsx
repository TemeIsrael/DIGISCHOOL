import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

const mockParents = [
  { id: 1, nom: 'DUPONT', prenom: 'Alain', tel: '699000001', enfants: 2, quartier: 'Bastos' },
  { id: 2, nom: 'NGONO', prenom: 'Suzanne', tel: '699000002', enfants: 1, quartier: 'Mvan' },
  { id: 3, nom: 'TAMBA', prenom: 'Roger', tel: '699000003', enfants: 3, quartier: 'Nsimeyong' },
];

const ParentListPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('root.parentList')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('root.parentListDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('root.lastName')}</th>
                <th className="px-6 py-3 text-left">{t('root.firstName')}</th>
                <th className="px-6 py-3 text-left">{t('root.phone')}</th>
                <th className="px-6 py-3 text-left">{t('root.children')}</th>
                <th className="px-6 py-3 text-left">{t('root.neighborhood')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockParents.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold">{p.nom}</td>
                  <td className="px-6 py-3">{p.prenom}</td>
                  <td className="px-6 py-3 font-mono text-xs">{p.tel}</td>
                  <td className="px-6 py-3">{p.enfants}</td>
                  <td className="px-6 py-3">{p.quartier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default ParentListPage;
