import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { Card } from '../../../shared/components/ui/Card';

const AdminFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{isEdit ? t('root.editAdmin') : t('root.newAdmin')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('root.adminFormDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100 p-6 space-y-4 max-w-2xl">
        <div className="space-y-4">
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.login')}</label><input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder={t('root.loginPlaceholder')} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.lastName')}</label><input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.firstName')}</label><input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.adminType')}</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <option value="1">{t('root.typeSecretariat')}</option>
              <option value="2">{t('root.typeScolarite')}</option>
              <option value="3">{t('root.typeFondateur')}</option>
              <option value="4">{t('root.typeDirecteur')}</option>
              <option value="5">{t('root.typeAuditeur')}</option>
            </select>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.email')}</label><input type="email" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.phone')}</label><input type="tel" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button>{isEdit ? t('common.save') : t('common.create')}</Button>
          <Button variant="outline" onClick={() => navigate('/root/admins')}>{t('common.cancel')}</Button>
        </div>
      </Card>
    </div>
  );
};
export default AdminFormPage;
