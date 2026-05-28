import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockTuitions = [
  { id: 1, classe: 'SIL', montant: 50000, inscrits: 45, section: 'FR' },
  { id: 2, classe: 'CP', montant: 55000, inscrits: 42, section: 'FR' },
  { id: 3, classe: 'CE1', montant: 60000, inscrits: 38, section: 'FR' },
  { id: 4, classe: 'CE2', montant: 60000, inscrits: 35, section: 'FR' },
  { id: 5, classe: 'CM1', montant: 65000, inscrits: 32, section: 'FR' },
  { id: 6, classe: 'CM2', montant: 70000, inscrits: 30, section: 'FR' },
  { id: 7, classe: 'Class 1', montant: 55000, inscrits: 40, section: 'EN' },
  { id: 8, classe: 'Class 2', montant: 55000, inscrits: 38, section: 'EN' },
  { id: 9, classe: 'Class 3', montant: 60000, inscrits: 35, section: 'EN' },
  { id: 10, classe: 'Class 4', montant: 60000, inscrits: 32, section: 'EN' },
  { id: 11, classe: 'Class 5', montant: 65000, inscrits: 28, section: 'EN' },
  { id: 12, classe: 'Class 6', montant: 70000, inscrits: 25, section: 'EN' },
];

const TuitionListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('fondateur.tuitions')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('fondateur.tuitionsDesc')}</p>
        </div>
        <Button onClick={() => navigate('/fondateur/tuitions/new')} className="gap-2"><Plus className="w-4 h-4" />{t('fondateur.newTuition')}</Button>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('fondateur.classLevel')}</th>
                <th className="px-6 py-3 text-left">{t('fondateur.annualTuition')}</th>
                <th className="px-6 py-3 text-left">{t('fondateur.enrolled')}</th>
                <th className="px-6 py-3 text-left">{t('fondateur.expectedRevenue')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockTuitions.map((t_) => (
                <tr key={t_.id} className="hover:bg-slate-50 cursor-pointer">
                  <td className="px-6 py-3 font-bold">{t_.classe}</td>
                  <td className="px-6 py-3">{t_.montant.toLocaleString()} F</td>
                  <td className="px-6 py-3">{t_.inscrits}</td>
                  <td className="px-6 py-3 font-bold text-digi-purple">{(t_.montant * t_.inscrits).toLocaleString()} F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default TuitionListPage;
