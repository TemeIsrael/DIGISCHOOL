import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { api } from '../../../shared/lib/api';
import { Loader2 } from 'lucide-react';

export const NotificationDetailPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [notification, setNotification] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        // Mark as read first
        await api.post(`/messages/${id}/read`).catch(() => {});
        
        // Fetch message details
        const res = await api.get(`/messages/${id}`);
        setNotification(res.data.data);
      } catch (err) {
        setNotification(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchMessage();
    }
  }, [id]);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return isEn ? `${days} day(s) ago` : `Il y a ${days} jour(s)`;
    if (hours > 0) return isEn ? `${hours} hour(s) ago` : `Il y a ${hours} heure(s)`;
    return isEn ? 'Just now' : 'À l\'instant';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-digi-purple" />
      </div>
    );
  }

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
                <p className="text-lg font-semibold text-slate-700">{notification.objet || notification.titre || 'Notification'}</p>
        <p className="text-sm text-slate-500">{timeAgo(notification.dateEnvoi || notification.createdAt)}</p>
        <p className="text-base text-slate-600 whitespace-pre-wrap">{notification.contenu || notification.message}</p>
        <div className="pt-4 border-t border-slate-100">
          <Button onClick={() => navigate('/notifications')}>{t('common.back', 'Retour')}</Button>
        </div>
      </Card>
    </div>
  );
};

export default NotificationDetailPage;
