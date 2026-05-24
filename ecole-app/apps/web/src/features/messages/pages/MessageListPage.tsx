import React, { useState } from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { MessageItem } from '../../../shared/components/business/MessageItem';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { MessageSquare, Search, Inbox, PenSquare } from 'lucide-react';

const mockMessages = [
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
    preview: 'Je vous informe que l\'élève DUPONT Jean sera absent du 25 au 27 mai pour raisons médicales...',
    date: '23/05/2026 14:15',
    read: true,
    category: 'Enseignant',
  },
  {
    id: 3,
    from: 'Mme. NGONO Marie',
    subject: 'Demande de rendez-vous',
    preview: 'Je souhaiterais prendre rendez-vous concernant les résultats scolaires de mon fils...',
    date: '22/05/2026 10:45',
    read: true,
    category: 'Parent',
  },
  {
    id: 4,
    from: 'Directeur',
    subject: 'Réunion pédagogique du 28/05',
    preview: 'Tous les enseignants sont priés d\'assister à la réunion pédagogique prévue le...',
    date: '21/05/2026 16:00',
    read: false,
    category: 'Direction',
  },
  {
    id: 5,
    from: 'Admin Système',
    subject: 'Rapport de présence généré',
    preview: 'Le rapport de présence de la semaine du 19 au 23 mai a été automatiquement généré...',
    date: '20/05/2026 18:00',
    read: true,
    category: 'Système',
  },
];

export const MessageListPage: React.FC = () => {
  const [filterCat, setFilterCat] = useState('Tous');
  const [search, setSearch] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<number | null>(null);

  const filtered = mockMessages.filter((m) => {
    const matchCat = filterCat === 'Tous' || m.category === filterCat;
    const matchSearch =
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.from.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const unreadCount = mockMessages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Messagerie Interne</h1>
          <p className="text-sm text-slate-400 font-semibold">
            <Inbox className="inline w-4 h-4 mr-1" />
            {unreadCount} message{unreadCount > 1 ? 's' : ''} non lu{unreadCount > 1 ? 's' : ''}
          </p>
        </div>
        <Button className="gap-2">
          <PenSquare className="w-4 h-4" />
          Nouveau Message
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un message..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown
            label="Catégorie"
            value={filterCat}
            options={['Tous', 'Système', 'Direction', 'Enseignant', 'Parent']}
            onChange={setFilterCat}
          />
        </div>
      </Card>

      {/* Messages List */}
      <Card className="shadow-sm border border-slate-100 divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-200" />
            <p className="font-semibold">Aucun message trouvé</p>
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
    </div>
  );
};
export default MessageListPage;
