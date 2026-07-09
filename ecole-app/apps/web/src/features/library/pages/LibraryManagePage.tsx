import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../auth/store';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { BookOpen, Search, FilePlus, Star, Eye, Users, Home, Trash2, Loader2, Download } from 'lucide-react';
import { BookCard } from '../../../shared/components/business/BookCard';
import { Modal } from '../../../shared/components/ui/Modal';
import { useToast } from '../../../shared/components/ui/Toast';
import { api, getFileUrl } from '../../../shared/lib/api';

type BookItem = {
  id: number;
  titre: string;
  auteur: string;
  fichierUrl?: string;
  specialty?: string;
  category?: string;
};

const inputCls = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all';
const labelCls = 'block text-xs font-bold text-slate-600 uppercase mb-1';

const AddBookForm: React.FC<{ onSuccess: () => void; onCancel: () => void; allCategories: string[] }> = ({ onSuccess, onCancel, allCategories }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [newBook, setNewBook] = useState({ titre: '', auteur: '', specialty: 'Général' });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddBook = async () => {
    if (!newBook.titre || !newBook.auteur || !pdfFile) {
      toast({ type: 'danger', title: t('common.error', 'Erreur'), description: 'Titre, auteur et fichier PDF sont obligatoires.' });
      return;
    }
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('titre', newBook.titre);
      formData.append('auteur', newBook.auteur);
      formData.append('specialty', newBook.specialty);
      formData.append('idSpecialite', '1');
      formData.append('fichier', pdfFile);

      await api.post('/library', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast({ type: 'success', title: t('library.bookAdded', 'Livre ajouté'), description: t('library.bookAddedDesc', 'Le livre a été inséré dans le catalogue.') });
      onSuccess();
    } catch (err: any) {
      toast({ type: 'danger', title: 'Erreur', description: err.response?.data?.error?.message || 'Erreur lors de l\'ajout.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className={labelCls}>{t('library.bookTitle', 'Titre')} *</label>
        <input type="text" className={inputCls} value={newBook.titre} onChange={(e) => setNewBook({ ...newBook, titre: e.target.value })} placeholder="ex: Leçon de géographie CM1" />
      </div>
      <div>
        <label className={labelCls}>{t('library.bookAuthor', 'Auteur')} *</label>
        <input type="text" className={inputCls} value={newBook.auteur} onChange={(e) => setNewBook({ ...newBook, auteur: e.target.value })} placeholder="ex: EDICEF" />
      </div>
      <div>
        <label className={labelCls}>Spécialité *</label>
        <input type="text" className={inputCls} value={newBook.specialty} onChange={(e) => setNewBook({ ...newBook, specialty: e.target.value })} placeholder="ex: Français, Mathématiques..." />
      </div>
      <div>
        <label className={labelCls}>{t('library.bookFile', 'Fichier PDF')} *</label>
        <p className="text-xs text-slate-500 mb-1">Sélectionnez le fichier PDF du livre à téléverser sur le serveur.</p>
        <input
          type="file"
          accept=".pdf,application/pdf"
          className={`${inputCls} file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-digi-purple/10 file:text-digi-purple hover:file:bg-digi-purple/20 cursor-pointer`}
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
        />
        {pdfFile && <p className="text-xs text-emerald-600 mt-1 font-semibold">✓ {pdfFile.name} ({(pdfFile.size / 1024).toFixed(0)} Ko)</p>}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>{t('common.cancel', 'Annuler')}</Button>
        <Button onClick={handleAddBook} disabled={!newBook.titre || !newBook.auteur || !pdfFile || isSubmitting}>
          {isSubmitting ? 'Ajout...' : t('library.addBook', 'Ajouter')}
        </Button>
      </div>
    </div>
  );
};

export const LibraryManagePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuthStore();

  const [booksList, setBooksList] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterCat, setFilterCat] = useState('');
  const [search, setSearch] = useState('');

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isManageModalOpen, setManageModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/library');
      setBooksList(res.data?.data || []);
    } catch (err) {
      console.error(err);
      toast({ type: 'danger', title: 'Erreur', description: 'Impossible de charger la bibliothèque.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const allCategories = Array.from(new Set(booksList.map((b) => b.specialty || b.category || 'Général')));

  const filtered = booksList.filter((b) => {
    const q = search.toLowerCase();
    const title = b.titre || '';
    const author = b.auteur || '';
    const matchSearch = !q || title.toLowerCase().includes(q) || author.toLowerCase().includes(q);
    const cat = b.specialty || b.category || 'Général';
    const matchCat = !filterCat || cat === filterCat;
    return matchSearch && matchCat;
  });

  const handleBookAdded = () => {
    setAddModalOpen(false);
    fetchBooks();
  };

  const handleOpenManage = (book: BookItem) => {
    setSelectedBook(book);
    setManageModalOpen(true);
  };

  const handleDeleteBook = async () => {
    if (!selectedBook) return;
    try {
      await api.delete(`/library/${selectedBook.id}`);
      toast({ type: 'success', title: t('library.bookDeleted', 'Livre supprimé'), description: t('library.bookDeletedDesc', 'Le livre a été retiré du catalogue.') });
      setManageModalOpen(false);
      fetchBooks();
    } catch (err: any) {
      toast({ type: 'danger', title: 'Erreur', description: err.response?.data?.error?.message || 'Erreur lors de la suppression.' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('library.titleManage', 'Gestion de la Bibliothèque')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('library.subtitle', 'Catalogue, prêts et inventaire')}</p>
        </div>
        {user?.typeAdmin !== 4 && (
          <Button onClick={() => setAddModalOpen(true)} className="gap-2 w-full sm:w-auto">
            <FilePlus className="w-4 h-4" />
            {t('library.addBook', 'Ajouter un Livre')}
          </Button>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <KPICard value={String(booksList.length)} label={t('library.catalog', 'Titres au Catalogue')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(booksList.length * 20)} label={t('library.totalCopies', 'Exemplaires Total')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(booksList.length * 15)} label={t('library.available', 'Disponibles')} icon={<Eye className="w-5 h-5 text-digi-success" />} />
        <KPICard value={String(booksList.length * 5)} label={t('library.borrowed', 'Empruntés')} icon={<Star className="w-5 h-5 text-digi-warning" />} />
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('library.search', 'Rechercher un titre ou un auteur...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>

          <FilterDropdown
            label={t('library.category', 'Catégorie')}
            value={filterCat}
            options={[
              { value: '', label: t('library.allCategories', 'Toutes les catégories') },
              ...allCategories.map(c => ({ value: c as string, label: c as string }))
            ]}
            onChange={setFilterCat}
          />
        </div>

        {filterCat && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-digi-purple-bg text-digi-purple rounded-full text-xs font-bold border border-digi-purple-border/20">
              📚 {filterCat}
              <button onClick={() => setFilterCat('')} className="hover:text-red-500 transition-colors ml-1">✕</button>
            </span>
            <span className="text-xs text-slate-400 font-semibold self-center">{filtered.length} {t('library.results', 'résultat(s)')}</span>
          </div>
        )}
      </Card>

      {/* Book Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-digi-purple" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">{t('library.noBooks', 'Aucun livre trouvé pour ces critères.')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <BookCard
              key={b.id}
              title={b.titre}
              author={b.auteur}
              isbn={`ID-${b.id}`}
              available={15}
              total={20}
              onOpen={() => handleOpenManage(b)}
            />
          ))}
        </div>
      )}

      {/* Add Book Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title={t('library.addBook', 'Ajouter un Livre')}>
        <AddBookForm onSuccess={handleBookAdded} onCancel={() => setAddModalOpen(false)} allCategories={allCategories as string[]} />
      </Modal>

      {/* Manage Book Modal */}
      <Modal isOpen={isManageModalOpen} onClose={() => setManageModalOpen(false)} title={t('library.manageBook', 'Gérer le Livre')}>
        <div className="space-y-4 text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-800 text-lg">{selectedBook?.titre}</h3>
          <p className="text-slate-500 mb-6">{selectedBook?.auteur}</p>
          
          <div className="flex flex-col gap-3">
             {selectedBook?.fichierUrl && selectedBook.fichierUrl !== '#' && (
               <Button onClick={() => window.open(getFileUrl(selectedBook.fichierUrl || ''), '_blank')} className="gap-2">
                 <Download className="w-4 h-4" /> Télécharger / Lire
               </Button>
             )}
             {user?.typeAdmin !== 4 && (
               <Button variant="danger" className="gap-2" onClick={handleDeleteBook}>
                 <Trash2 className="w-4 h-4" />
                 {t('common.delete', 'Supprimer')}
               </Button>
             )}
             <Button variant="outline" onClick={() => setManageModalOpen(false)}>Fermer</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default LibraryManagePage;
