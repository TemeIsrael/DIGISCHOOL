import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Send } from 'lucide-react';

const CredentialSendPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('root.credentialSend')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('root.credentialSendDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100 p-6 max-w-2xl space-y-4">
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.recipientType')}</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            <option>{t('root.allNewAccounts')}</option>
            <option>{t('root.parentsOnly')}</option>
            <option>{t('root.teachersOnly')}</option>
            <option>{t('root.adminsOnly')}</option>
          </select>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('root.sendMethod')}</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            <option>SMS</option>
            <option>Email</option>
            <option>SMS + Email</option>
          </select>
        </div>
        <p className="text-xs text-slate-400">{t('root.credentialWarning')}</p>
        <Button className="gap-2"><Send className="w-4 h-4" />{t('root.sendCredentials')}</Button>
      </Card>
    </div>
  );
};
export default CredentialSendPage;
