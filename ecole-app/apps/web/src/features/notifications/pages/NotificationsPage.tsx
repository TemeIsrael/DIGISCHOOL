import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

// Mock notification data
const mockNotifications = [
  { id: 1, message: 'Nouveau document disponible: Emploi du temps', time: 'Il y a 2 heures' },
  { id: 2, message: 'Rappel: Réunion parents-professeurs demain à 16h.', time: 'Hier' },
];

export const NotificationsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        {t('dashboards.notifications', 'Notifications')}
      </h1>
      <Card className="space-y-4 p-4">
          {mockNotifications.map((n) => (
            <NavLink key={n.id} to={`/notifications/${n.id}`} className="block p-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
              <p className="text-sm text-slate-700">{n.message}</p>
              <p className="text-xs text-slate-400 mt-1">{n.time}</p>
            </NavLink>
          ))}
      </Card>
    </div>
  );
};

export default NotificationsPage;
