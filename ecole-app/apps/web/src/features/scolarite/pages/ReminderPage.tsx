import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Send } from 'lucide-react';

const ReminderPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('scolarite.reminders')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('scolarite.remindersDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100 p-6 max-w-2xl space-y-4">
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('scolarite.targetGroup')}</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
            <option>{t('scolarite.allOverdue')}</option>
            <option>{t('scolarite.tranche1Overdue')}</option>
            <option>{t('scolarite.tranche2Overdue')}</option>
            <option>{t('scolarite.tranche3Overdue')}</option>
          </select>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('scolarite.messageTemplate')}</label>
          <textarea className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm h-32" defaultValue={t('scolarite.reminderTemplate')} />
        </div>
        <p className="text-xs text-amber-600 font-semibold">{t('scolarite.reminderCount', { count: 3 })}</p>
        <Button className="gap-2"><Send className="w-4 h-4" />{t('scolarite.sendReminders')}</Button>
      </Card>
    </div>
  );
};
export default ReminderPage;
