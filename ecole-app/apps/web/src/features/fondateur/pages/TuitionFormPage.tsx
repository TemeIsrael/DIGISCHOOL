import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { Card } from '../../../shared/components/ui/Card';

const TuitionFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('fondateur.newTuition')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('fondateur.tuitionFormDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100 p-6 space-y-4 max-w-2xl">
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('fondateur.classLevel')}</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            <option>6ème</option><option>5ème</option><option>4ème</option><option>3ème</option>
          </select>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('fondateur.annualTuition')}</label><input type="number" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="150000" /></div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('fondateur.inscriptionFee')}</label><input type="number" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="25000" /></div>
        <div className="flex gap-3 pt-4">
          <Button>{t('common.save')}</Button>
          <Button variant="outline" onClick={() => navigate('/fondateur/tuitions')}>{t('common.cancel')}</Button>
        </div>
      </Card>
    </div>
  );
};
export default TuitionFormPage;
