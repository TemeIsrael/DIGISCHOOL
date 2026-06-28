import React, { useState } from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { MessageItem } from '../../../shared/components/business/MessageItem';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { MessageSquare, Search, Inbox, PenSquare } from 'lucide-react';
import { Modal } from '../../../shared/components/ui/Modal';
import { useTranslation } from 'react-i18next';
import { useMessages } from '../hooks/useMessages';
import { useParents } from '../hooks/useParents';
import { useToast } from '../../../shared/components/ui/Toast';

/* ─── Types ──────────────────────────────────────────────────────── */
interface Message {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  category: string;
}

interface NewMessageData {
  idParent: number;
  subject: string;
  preview: string;
}

/* ─── New Message Form ───────────────────────────────────────────── */
const NewMessageForm: React.FC<{
  parents: any[];
  onSubmit: (data: NewMessageData) => void;
  onCancel: () => void;
}> = ({ parents, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const [idParent, setIdParent] = React.useState<number>(parents.length > 0 ? parents[0].idParent : 0);
  const [subject, setSubject] = React.useState('');
  const [preview, setPreview] = React.useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Destinataire (Parent)</label>
        <select
          className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all bg-white"
          value={idParent}
          onChange={(e) => setIdParent(Number(e.target.value))}
        >
          {parents.length === 0 && <option value={0}>Aucun parent trouvé</option>}
          {parents.map((p: any) => (
            <option key={p.idParent} value={p.idParent}>
              {p.personne ? `${p.personne.nom} ${p.personne.prenom}` : `Parent #${p.idParent}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">{t('messages.subjectLabel', 'Objet')}</label>
        <input
          className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t('messages.subjectPlaceholder', 'Objet du message')}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">{t('messages.messageLabel', 'Message')}</label>
        <textarea
          className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all resize-none"
          rows={4}
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          placeholder={t('messages.messagePlaceholder', 'Votre message…')}
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" type="button" onClick={onCancel}>{t('common.cancel', 'Annuler')}</Button>
        <Button type="button" onClick={() => onSubmit({ idParent, subject, preview })}>{t('messages.send', 'Envoyer')}</Button>
      </div>
    </div>
  );
};

/* ─── Message Detail ─────────────────────────────────────────────── */
const MessageDetail: React.FC<{
  message: Message;
  onClose: () => void;
}> = ({ message, onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800">{message.subject}</h3>
        <p className="text-xs text-slate-400 font-semibold mt-1">
          {t('messages.fromDetail', 'De : {{from}}', { from: message.from })} • {message.date}
        </p>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{message.preview}</p>
      <div className="flex justify-end pt-2">
        <Button variant="ghost" onClick={onClose}>{t('common.close', 'Fermer')}</Button>
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────── */
export const MessageListPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const { messages: rawMessages, isLoading, sendMessage } = useMessages();
  const { parents } = useParents();
  const { toast } = useToast();

  const categories = isEn
    ? ['All', 'System', 'Direction', 'Teacher', 'Parent']
    : ['Tous', 'Système', 'Direction', 'Enseignant', 'Parent'];

  const [filterCat,        setFilterCat]        = useState(isEn ? 'All' : 'Tous');
  const [search,           setSearch]           = useState('');
  const [selectedMsg,      setSelectedMsg]      = useState<number | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

  // Map API messages
  const mappedMessages: Message[] = Array.isArray(rawMessages) ? rawMessages.map((m: any) => ({
    id: m.idMsg,
    from: m.parent?.personne?.nom ? `${m.parent.personne.nom} ${m.parent.personne.prenom}` : 'Utilisateur',
    subject: m.objet,
    preview: m.contenu,
    date: new Date(m.createdAt).toLocaleString(isEn ? 'en-US' : 'fr-FR'),
    read: m.lu,
    category: isEn ? 'System' : 'Système', // Simplified mapping
  })) : [];

  const filtered = mappedMessages.filter((m) => {
    // Check match for "Tous" / "All"
    const isAll = filterCat === 'Tous' || filterCat === 'All';
    
    // Map categories in case user switches language and has active filter
    let messageCat = m.category;
    if (isEn) {
      if (messageCat === 'Système') messageCat = 'System';
      if (messageCat === 'Enseignant') messageCat = 'Teacher';
    } else {
      if (messageCat === 'System') messageCat = 'Système';
      if (messageCat === 'Teacher') messageCat = 'Enseignant';
    }

    const matchCat    = isAll || messageCat === filterCat;
    const matchSearch =
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.from.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const unreadCount = mappedMessages.filter((m) => !m.read).length;

  const handleNewMessage = async (data: NewMessageData) => {
    if (!data.idParent) {
      toast({ type: 'danger', title: 'Erreur', description: 'Veuillez sélectionner un destinataire' });
      return;
    }
    try {
      await sendMessage({
        idParent: data.idParent,
        objet: data.subject || (isEn ? '(No subject)' : '(Sans objet)'),
        contenu: data.preview || '...',
        type: 1 // default type
      });
      toast({ type: 'success', title: 'Succès', description: 'Le message a été envoyé.' });
      setIsNewMessageOpen(false);
    } catch (err: any) {
      toast({ type: 'danger', title: 'Erreur', description: err.response?.data?.error?.message || 'Erreur lors de l\'envoi' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('messages.title', 'Messagerie Interne')}</h1>
          <p className="text-sm text-slate-400 font-semibold flex items-center gap-1 mt-1">
            <Inbox className="w-4 h-4" />
            {t('messages.unreadCount', { count: unreadCount, defaultValue: '{{count}} message(s) non lu(s)' })}
          </p>
        </div>
        <Button className="gap-2 w-full sm:w-auto" onClick={() => setIsNewMessageOpen(true)}>
          <PenSquare className="w-4 h-4" />
          {t('messages.new', 'Nouveau Message')}
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('messages.search', 'Rechercher un message…')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown
            label={t('messages.category', 'Catégorie')}
            value={filterCat}
            options={categories}
            onChange={setFilterCat}
          />
        </div>
      </Card>

      {/* Messages List */}
      <Card className="shadow-sm border border-slate-100 divide-y divide-slate-100">
        {isLoading ? (
          <div className="text-center py-12 text-slate-400">
            <p className="font-semibold">Chargement...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-200" />
            <p className="font-semibold">{t('messages.noMessages', 'Aucun message trouvé')}</p>
          </div>
        ) : (
          filtered.map((m) => (
            <MessageItem
              key={m.id}
              from={m.from}
              subject={m.subject}
              preview={m.preview}
              date={m.date}
              read={m.read}
              onClick={() => setSelectedMsg(m.id)}
              selected={selectedMsg === m.id}
            />
          ))
        )}
      </Card>

      {/* New Message Modal */}
      <Modal
        isOpen={isNewMessageOpen}
        onClose={() => setIsNewMessageOpen(false)}
        title={t('messages.new', 'Nouveau Message')}
        size="md"
      >
        <NewMessageForm
          parents={parents}
          onSubmit={handleNewMessage}
          onCancel={() => setIsNewMessageOpen(false)}
        />
      </Modal>

      {/* Message Detail Modal */}
      <Modal
        isOpen={selectedMsg !== null}
        onClose={() => setSelectedMsg(null)}
        title={mappedMessages.find((m) => m.id === selectedMsg)?.subject || ''}
        size="md"
      >
        {selectedMsg !== null && (
          <MessageDetail
            message={mappedMessages.find((m) => m.id === selectedMsg)!}
            onClose={() => setSelectedMsg(null)}
          />
        )}
      </Modal>
    </div>
  );
};
export default MessageListPage;