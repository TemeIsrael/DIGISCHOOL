import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { CheckCircle, XCircle } from 'lucide-react';

const mockMessages = [
  { id: 1, from: 'M. NKOULOU', to: 'Parents 6ème A', subject: 'Sortie pédagogique', date: '25/05/2026', status: 'pending' },
  { id: 2, from: 'Mme FOUDA', to: 'Tous les parents', subject: 'Réunion trimestrielle', date: '24/05/2026', status: 'pending' },
  { id: 3, from: 'Admin', to: 'Parents 3ème', subject: 'Examen blanc', date: '23/05/2026', status: 'approved' },
];

const MessageValidationPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.messageValidation')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.messageValidationDesc')}</p>
      </div>
      <div className="space-y-4">
        {mockMessages.map((msg) => (
          <Card key={msg.id} className="shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{msg.subject}</h3>
                <p className="text-xs text-slate-400">{t('directeur.from')}: {msg.from} → {msg.to} · {msg.date}</p>
              </div>
              {msg.status === 'pending' ? (
                <div className="flex gap-2">
                  <Button className="gap-1 text-sm"><CheckCircle className="w-4 h-4" />{t('directeur.approve')}</Button>
                  <Button variant="outline" className="gap-1 text-sm text-red-600"><XCircle className="w-4 h-4" />{t('directeur.reject')}</Button>
                </div>
              ) : (
                <span className="flex items-center gap-1 text-emerald-600 text-sm font-bold"><CheckCircle className="w-4 h-4" />{t('directeur.approved')}</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default MessageValidationPage;
