import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Tags, Layers, BookMarked, X, Download, Home, Loader2, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../shared/components/ui/Button';
import { Card } from '../shared/components/ui/Card';
import { KPICard } from '../shared/components/ui/KPICard';
import { FilterDropdown } from '../shared/components/tables/FilterDropdown';
import { PublicNavbar } from '../shared/components/layout/PublicNavbar';
import { PublicFooter } from '../shared/components/layout/PublicFooter';
import { Modal } from '../shared/components/ui/Modal';
import { api, getFileUrl } from '../shared/lib/api';

/* ─── BookReaderModal ─────────────────────────────────────────────── */
interface BookReaderModalProps {
  book: any;
  onClose: () => void;
}

const BookReaderModal: React.FC<BookReaderModalProps> = ({ book, onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[60vh] flex flex-col overflow-hidden border border-slate-100">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <BookOpen className="w-5 h-5 text-digi-purple shrink-0" />
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">{book.titre}</p>
              <p className="text-slate-400 text-xs font-semibold">{book.auteur}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-red-800 text-slate-300 hover:text-white transition-colors ml-2" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 bg-slate-100 flex items-center justify-center flex-col p-6">
          <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-700">{book.titre}</h2>
          <p className="text-slate-500 mb-4">{book.auteur}</p>
          {book.fichierUrl ? (
            <Button onClick={() => window.open(getFileUrl(book.fichierUrl), '_blank')} className="gap-2">
              <Download className="w-4 h-4" /> Télécharger
            </Button>
          ) : (
            <p className="text-red-500 font-semibold text-sm">Fichier non disponible</p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main Library Page ───────────────────────────────────────────── */
export const LibraryPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [openBook, setOpenBook] = useState<any | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // On the public page we still use the API if accessible, or public endpoint
        const res = await api.get('/library');
        setBooks(res.data?.data || []);
      } catch (err) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const specialties = ['ALL', ...Array.from(new Set(books.map((b) => b.specialty || b.category || 'Général').filter(Boolean)))];

  const filteredBooks = books.filter((book) => {
    const q = searchTerm.toLowerCase();
    const title = book.titre || '';
    const author = book.auteur || '';
    const matchesSearch = title.toLowerCase().includes(q) || author.toLowerCase().includes(q);
    const spec = book.specialty || book.category || 'Général';
    const matchesSpecialty = selectedSpecialty === 'ALL' || spec === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicNavbar />

      {openBook && <BookReaderModal book={openBook} onClose={() => setOpenBook(null)} />}

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-8 flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-slate-800 tracking-tight">📖 {t('library.titlePublic', 'Bibliothèque Scolaire')}</h1>
            <p className="text-slate-400 text-sm font-semibold mt-1">{t('library.subtitlePublic', 'Accédez en ligne aux manuels et ressources du primaire')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <KPICard value={books.length} label={t('library.catalog', 'Livres disponibles')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
          <KPICard value={specialties.length - 1} label={t('library.subjects', 'Matières')} icon={<Tags className="w-5 h-5 text-digi-purple" />} />
        </div>

        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm sm:flex-row sm:items-center sm:flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('library.searchPublic', 'Rechercher par titre ou auteur...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full rounded-full border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-digi-purple/50 focus:border-digi-purple transition-all"
            />
          </div>

          <FilterDropdown
            label={t('library.subject', 'Matière')}
            value={selectedSpecialty}
            onChange={setSelectedSpecialty}
            options={[
              { value: 'ALL', label: t('library.allSubjects', 'Toutes les matières') },
              ...specialties.filter((s) => s !== 'ALL').map((s) => ({ value: s, label: s }))
            ]}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-digi-purple" />
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-semibold">{t('library.noBooks', 'Aucun livre trouvé pour ces critères.')}</p>
            <p className="text-sm mt-1">{t('library.noBooksSub', 'Essayez un autre terme de recherche ou filtre.')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all overflow-hidden flex flex-col group" hover>
                <div className="h-44 w-full relative overflow-hidden rounded-t-xl bg-slate-100">
                  {book.coverUrl ? (
                    <img src={book.coverUrl} alt={book.titre} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-digi-purple/10 to-digi-purple-light/20">
                      <BookMarked className="w-14 h-14 text-digi-purple/50" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-digi-purple uppercase tracking-wider bg-digi-purple-bg px-2 py-0.5 rounded-full border border-digi-purple-border/20">
                      {book.specialty || book.category || 'Général'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-snug">{book.titre}</h3>
                    <p className="text-xs text-slate-400 font-semibold">{t('library.author', 'Auteur')} : {book.auteur}</p>
                  </div>
                  <Button variant="primary" size="sm" className="w-full mt-2" onClick={() => {
                     if (book.fichierUrl) {
                        window.open(getFileUrl(book.fichierUrl), '_blank');
                     } else {
                        setOpenBook(book);
                     }
                  }}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    {t('library.openBook', 'Ouvrir le livre')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <PublicFooter />
    </div>
  );
};
export default LibraryPage;
