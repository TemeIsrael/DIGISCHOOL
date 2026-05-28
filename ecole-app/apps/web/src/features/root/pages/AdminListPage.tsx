import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { Card } from '../../../shared/components/ui/Card';
import { Plus } from 'lucide-react';

const mockAdmins = [
  { id: 1, login: 'admin_inscr', nom: 'KAMGA', prenom: 'Paul', typeAdmin: 1, typeLabel: 'Secrétariat', actif: true },
  { id: 2, login: 'admin_scol', nom: 'FOUDA', prenom: 'Marie', typeAdmin: 2, typeLabel: 'Scolarité', actif: true },
  { id: 3, login: 'fondateur01', nom: 'NKOULOU', prenom: 'Pierre', typeAdmin: 3, typeLabel: 'Fondateur', actif: true },
  { id: 4, login: 'directeur01', nom: 'MBARGA', prenom: 'Jean', typeAdmin: 4, typeLabel: 'Directeur', actif: true },
  { id: 5, login: 'auditeur01', nom: 'ESSOMBA', prenom: 'Cécile', typeAdmin: 5, typeLabel: 'Auditeur', actif: false },
];

const AdminListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('root.adminList')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('root.adminListDesc')}</p>
        </div>
        <Button onClick={() => navigate('/root/admins/new')} className="gap-2">
          <Plus className="w-4 h-4" />
          <span>{t('root.newAdmin')}</span>
        </Button>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('root.login')}</th>
                <th className="px-6 py-3 text-left">{t('root.lastName')}</th>
                <th className="px-6 py-3 text-left">{t('root.firstName')}</th>
                <th className="px-6 py-3 text-left">{t('root.adminType')}</th>
                <th className="px-6 py-3 text-left">{t('root.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockAdmins.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate("/root/admins/" + a.id)}>
                  <td className="px-6 py-3 font-mono text-xs">{a.login}</td>
                  <td className="px-6 py-3 font-semibold">{a.nom}</td>
                  <td className="px-6 py-3">{a.prenom}</td>
                  <td className="px-6 py-3"><span className="px-2 py-0.5 bg-digi-purple-bg text-digi-purple text-xs font-bold rounded-full">{a.typeLabel}</span></td>
                  <td className="px-6 py-3"><span className={`px-2 py-0.5 text-xs font-bold rounded-full ${a.actif ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{a.actif ? t('root.active') : t('root.inactive')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default AdminListPage;
