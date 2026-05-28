import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const ReferentialPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('root.referentials')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('root.referentialsDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border border-slate-100 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase">{t('root.cities')}</h3>
            <Button variant="outline" className="text-xs px-2 py-1"><Plus className="w-3 h-3" /></Button>
          </div>
          <ul className="text-sm text-slate-600 space-y-1">
            <li className="py-1 border-b border-slate-50">Yaoundé</li>
            <li className="py-1 border-b border-slate-50">Douala</li>
            <li className="py-1 border-b border-slate-50">Bafoussam</li>
            <li className="py-1">Garoua</li>
          </ul>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase">{t('root.neighborhoods')}</h3>
            <Button variant="outline" className="text-xs px-2 py-1"><Plus className="w-3 h-3" /></Button>
          </div>
          <ul className="text-sm text-slate-600 space-y-1">
            <li className="py-1 border-b border-slate-50">Bastos</li>
            <li className="py-1 border-b border-slate-50">Mvan</li>
            <li className="py-1 border-b border-slate-50">Nsimeyong</li>
            <li className="py-1">Biyem-Assi</li>
          </ul>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase">{t('root.districts')}</h3>
            <Button variant="outline" className="text-xs px-2 py-1"><Plus className="w-3 h-3" /></Button>
          </div>
          <ul className="text-sm text-slate-600 space-y-1">
            <li className="py-1 border-b border-slate-50">Yaoundé I</li>
            <li className="py-1 border-b border-slate-50">Yaoundé II</li>
            <li className="py-1 border-b border-slate-50">Yaoundé III</li>
            <li className="py-1">Yaoundé IV</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
export default ReferentialPage;
