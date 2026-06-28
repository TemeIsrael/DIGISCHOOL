import React from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';

// Mock data – in a real app this would come from an API or global store
const mockNotifications = [
  { id: 1, message: 'Nouveau document disponible: Emploi du temps', time: 'Il y a 2 heures', details: 'Le nouveau planning a été publié et est disponible dans la bibliothèque.' },
  { id: 2, message: 'Rappel: Réunion parents-professeurs demain à 16h.', time: 'Hier', details: "N'oubliez pas d'apporter les dossiers d'élèves pour la réunion." },
];

export const NotificationDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const notification = mockNotifications.find((n) => n.id === Number(id));

  if (!notification) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-red-600 mb-4">{t('notifications.notFound', 'Notification introuvable')}</h2>
        <Button onClick={() => navigate('/notifications')}>{t('common.back', 'Retour')}</Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('notifications.detail', 'Détail de la notification')}</h2>
      <Card className="p-6 space-y-4">
        <p className="text-lg font-semibold text-slate-700">{notification.message}</p>
        <p className="text-sm text-slate-500">{notification.time}</p>
        <p className="text-base text-slate-600">{notification.details}</p>
        <Button onClick={() => navigate('/notifications')}>{t('common.back', 'Retour')}</Button>
      </Card>
    </div>
  );
};

export default NotificationDetailPage;
