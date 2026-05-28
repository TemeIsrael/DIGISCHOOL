import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { Card } from '../../../shared/components/ui/Card';

const PersonnelFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{isEdit ? t('root.editPersonnel') : t('root.newPersonnel')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('root.personnelFormDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100 p-6 space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.lastName')}</label><input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.firstName')}</label><input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.personnelType')}</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            <option>{t('root.teacher')}</option>
            <option>{t('root.administrative')}</option>
          </select>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.email')}</label><input type="email" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.phone')}</label><input type="tel" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
        <div className="flex gap-3 pt-4">
          <Button>{isEdit ? t('common.save') : t('common.create')}</Button>
          <Button variant="outline" onClick={() => navigate('/root/personnel')}>{t('common.cancel')}</Button>
        </div>
      </Card>
    </div>
  );
};
export default PersonnelFormPage;
