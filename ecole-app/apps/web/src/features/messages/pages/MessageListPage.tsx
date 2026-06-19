import React, { useState } from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { MessageItem } from '../../../shared/components/business/MessageItem';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { MessageSquare, Search, Inbox, PenSquare } from 'lucide-react';
import { Modal } from '../../../shared/components/ui/Modal';
import { useTranslation } from 'react-i18next';

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
  from: string;
  subject: string;
  preview: string;
}

/* ─── New Message Form ───────────────────────────────────────────── */
const NewMessageForm: React.FC<{
  onSubmit: (data: NewMessageData) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const [from,    setFrom]    = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [preview, setPreview] = React.useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">{t('messages.from', 'De')}</label>
        <input
          className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder={t('messages.yourName', 'Votre nom')}
        />
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
        <Button variant="ghost" onClick={onCancel}>{t('common.cancel', 'Annuler')}</Button>
        <Button onClick={() => onSubmit({ from, subject, preview })}>{t('messages.send', 'Envoyer')}</Button>
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
      <p className="text-sm text-slate-600 leading-relaxed">{message.preview}</p>
      <div className="flex justify-end pt-2">
        <Button variant="ghost" onClick={onClose}>{t('common.close', 'Fermer')}</Button>
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────── */
export const MessageListPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  /* ─── Initial messages ───────────────────────────────────────────── */
  const initialMessages: Message[] = isEn ? [
    {
      id: 1,
      from: 'System Admin',
      subject: 'School calendar update',
      preview: 'The term 3 calendar has been updated. Please consult the new dates...',
      date: '24/05/2026 08:30',
      read: false,
      category: 'System',
    },
    {
      id: 2,
      from: 'Mr. FOUDA Pierre',
      subject: 'Student absence: DUPONT Jean',
      preview: 'I inform you that the student DUPONT Jean will be absent from May 25 to 27 for medical reasons...',
      date: '23/05/2026 14:15',
      read: true,
      category: 'Teacher',
    },
    {
      id: 3,
      from: 'Mrs. NGONO Marie',
      subject: 'Appointment request',
      preview: 'I would like to make an appointment regarding my son\'s school results...',
      date: '22/05/2026 10:45',
      read: true,
      category: 'Parent',
    },
    {
      id: 4,
      from: 'Director',
      subject: 'Pedagogical meeting on 28/05',
      preview: 'All teachers are requested to attend the pedagogical meeting scheduled on...',
      date: '21/05/2026 16:00',
      read: false,
      category: 'Direction',
    },
    {
      id: 5,
      from: 'System Admin',
      subject: 'Attendance report generated',
      preview: 'The attendance report for the week of May 19 to 23 has been automatically generated...',
      date: '20/05/2026 18:00',
      read: true,
      category: 'System',
    },
  ] : [
    {
      id: 1,
      from: 'Admin Système',
      subject: 'Mise à jour du calendrier scolaire',
      preview: 'Le calendrier du trimestre 3 a été mis à jour. Veuillez consulter les nouvelles dates...',
      date: '24/05/2026 08:30',
      read: false,
      category: 'Système',
    },
    {
      id: 2,
      from: 'M. FOUDA Pierre',
      subject: 'Absence élève DUPONT Jean',
      preview: "Je vous informe que l'élève DUPONT Jean sera absent du 25 au 27 mai pour raisons médicales...",
      date: '23/05/2026 14:15',
      read: true,
      category: 'Enseignant',
    },
    {
      id: 3,
      from: 'Mme. NGONO Marie',
      subject: 'Demande de rendez-vous',
      preview: "Je souhaiterais prendre rendez-vous concernant les résultats scolaires de mon fils...",
      date: '22/05/2026 10:45',
      read: true,
      category: 'Parent',
    },
    {
      id: 4,
      from: 'Directeur',
      subject: 'Réunion pédagogique du 28/05',
      preview: "Tous les enseignants sont priés d'assister à la réunion pédagogique prévue le...",
      date: '21/05/2026 16:00',
      read: false,
      category: 'Direction',
    },
    {
      id: 5,
      from: 'Admin Système',
      subject: 'Rapport de présence généré',
      preview: "Le rapport de présence de la semaine du 19 au 23 mai a été automatiquement généré...",
      date: '20/05/2026 18:00',
      read: true,
      category: 'Système',
    },
  ];

  const categories = isEn
    ? ['All', 'System', 'Direction', 'Teacher', 'Parent']
    : ['Tous', 'Système', 'Direction', 'Enseignant', 'Parent'];

  const [messages,         setMessages]         = useState<Message[]>(initialMessages);
  const [filterCat,        setFilterCat]        = useState(isEn ? 'All' : 'Tous');
  const [search,           setSearch]           = useState('');
  const [selectedMsg,      setSelectedMsg]      = useState<number | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

  const filtered = messages.filter((m) => {
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

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleNewMessage = (data: NewMessageData) => {
    const newMsg: Message = {
      id:       messages.length ? Math.max(...messages.map((m) => m.id)) + 1 : 1,
      from:     data.from || (isEn ? 'Me' : 'Moi'),
      subject:  data.subject || (isEn ? '(No subject)' : '(Sans objet)'),
      preview:  data.preview,
      date:     new Date().toLocaleString(isEn ? 'en-US' : 'fr-FR'),
      read:     false,
      category: isEn ? 'System' : 'Système',
    };
    setMessages([newMsg, ...messages]);
    setIsNewMessageOpen(false);
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
        {filtered.length === 0 ? (
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
          onSubmit={handleNewMessage}
          onCancel={() => setIsNewMessageOpen(false)}
        />
      </Modal>

      {/* Message Detail Modal */}
      <Modal
        isOpen={selectedMsg !== null}
        onClose={() => setSelectedMsg(null)}
        title={messages.find((m) => m.id === selectedMsg)?.subject || ''}
        size="md"
      >
        {selectedMsg !== null && (
          <MessageDetail
            message={messages.find((m) => m.id === selectedMsg)!}
            onClose={() => setSelectedMsg(null)}
          />
        )}
      </Modal>
    </div>
  );
};
export default MessageListPage;