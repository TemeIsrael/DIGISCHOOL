import React, { useState } from 'react';
import { useAuthStore } from '../../auth/store';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { BookOpen, Search, FilePlus, Star, Eye, Users, Home, Trash2 } from 'lucide-react';
import { BookCard } from '../../../shared/components/business/BookCard';
import { Modal } from '../../../shared/components/ui/Modal';
import { useToast } from '../../../shared/components/ui/Toast';
import { getBooks, allSalles } from '../mockBooksData';

type BookItem = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  copies: number;
  available: number;
  rating: number;
  salles: string[];
  fileUrl?: string;
  coverUrl?: string;
};

export const LibraryManagePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuthStore();

  const initialBooks = (): BookItem[] =>
    getBooks(i18n.language).map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      isbn: b.isbn,
      category: b.category,
      copies: b.copies,
      available: b.available,
      rating: b.rating,
      salles: b.salles,
      coverUrl: b.coverUrl,
    }));

  const [booksList, setBooksList] = useState<BookItem[]>(initialBooks());
  const [filterCat,   setFilterCat]   = useState('');
  const [filterSalle, setFilterSalle] = useState('');
  const [search,      setSearch]      = useState('');

  const allCategories = Array.from(new Set(getBooks(i18n.language).map((b) => b.category)));

  // Modals States
  const [isAddModalOpen,    setAddModalOpen]    = useState(false);
  const [isManageModalOpen, setManageModalOpen] = useState(false);
  const [selectedBook,      setSelectedBook]    = useState<BookItem | null>(null);

  // Form States
  const [newBook, setNewBook] = useState({
    title: '', author: '', isbn: '',
    category: allCategories[0] ?? '',
    copies: 20, available: 20, salles: [] as string[],
    file: null as File | null
  });

  const [editForm, setEditForm] = useState({
    title: '', author: '', isbn: '', category: '',
    copies: 0, available: 0, salles: [] as string[],
    fileUrl: ''
  });

  const filtered = booksList.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.salles.some(s => s.toLowerCase().includes(q));
    const matchCat   = !filterCat   || b.category === filterCat;
    const matchSalle = !filterSalle || b.salles.includes(filterSalle);
    return matchSearch && matchCat && matchSalle;
  });

  const totalBooks     = booksList.reduce((s, b) => s + b.copies,    0);
  const availableBooks = booksList.reduce((s, b) => s + b.available, 0);

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.isbn) {
      toast({ type: 'danger', title: t('common.error', 'Erreur'), description: t('library.fillRequired', 'Veuillez remplir tous les champs obligatoires.') });
      return;
    }
    setBooksList((prev) => [...prev, {
      id: Date.now(), ...newBook,
      copies: Number(newBook.copies), available: Number(newBook.available), rating: 5.0, fileUrl: newBook.file ? URL.createObjectURL(newBook.file) : ''
    }]);
    setAddModalOpen(false);
    setNewBook({ title: '', author: '', isbn: '', category: allCategories[0] ?? '', copies: 20, available: 20, salles: [], file: null });
    toast({ type: 'success', title: t('library.bookAdded', 'Livre ajouté'), description: t('library.bookAddedDesc', 'Le livre a été inséré dans le catalogue.') });
  };

  const handleOpenManage = (book: BookItem) => {
    setSelectedBook(book);
    setEditForm({ title: book.title, author: book.author, isbn: book.isbn, category: book.category, copies: book.copies, available: book.available, salles: [...book.salles], fileUrl: book.fileUrl || '' });
    setManageModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedBook) return;
    setBooksList((prev) => prev.map((b) =>
      b.id === selectedBook.id
        ? { ...b, ...editForm, copies: Number(editForm.copies), available: Number(editForm.available) }
        : b
    ));
    setManageModalOpen(false);
    toast({ type: 'success', title: t('library.bookUpdated', 'Livre mis à jour'), description: t('library.bookUpdatedDesc', 'Les modifications ont été enregistrées.') });
  };

  const handleDeleteBook = () => {
    if (!selectedBook) return;
    setBooksList((prev) => prev.filter((b) => b.id !== selectedBook.id));
    setManageModalOpen(false);
    toast({ type: 'success', title: t('library.bookDeleted', 'Livre supprimé'), description: t('library.bookDeletedDesc', 'Le livre a été retiré du catalogue.') });
  };

  const handleToggleSalle = (salle: string, type: 'new' | 'edit') => {
    if (type === 'new') {
      setNewBook(prev => ({ ...prev, salles: prev.salles.includes(salle) ? prev.salles.filter(s => s !== salle) : [...prev.salles, salle] }));
    } else {
      setEditForm(prev => ({ ...prev, salles: prev.salles.includes(salle) ? prev.salles.filter(s => s !== salle) : [...prev.salles, salle] }));
    }
  };

  const inputCls = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all';
  const labelCls = 'block text-xs font-bold text-slate-600 uppercase mb-1';

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
        <KPICard value={String(booksList.length)}            label={t('library.catalog', 'Titres au Catalogue')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(totalBooks)}                  label={t('library.totalCopies', 'Exemplaires Total')}  icon={<Users   className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(availableBooks)}              label={t('library.available', 'Disponibles')}         icon={<Eye     className="w-5 h-5 text-digi-success" />} />
        <KPICard value={String(totalBooks - availableBooks)} label={t('library.borrowed', 'Empruntés')}            icon={<Star    className="w-5 h-5 text-digi-warning" />} />
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
              ...allCategories.map(c => ({ value: c, label: c }))
            ]}
            onChange={setFilterCat}
          />

          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-slate-400 shrink-0" />
            <FilterDropdown
              label={t('library.room', 'Salle')}
              value={filterSalle}
              options={[
                { value: '', label: t('library.allRooms', 'Toutes les salles') },
                ...allSalles.map(s => ({ value: s, label: s }))
              ]}
              onChange={setFilterSalle}
            />
          </div>
        </div>

        {/* Active filter tags */}
        {(filterSalle || filterCat) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
            {filterCat && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-digi-purple-bg text-digi-purple rounded-full text-xs font-bold border border-digi-purple-border/20">
                📚 {filterCat}
                <button onClick={() => setFilterCat('')} className="hover:text-red-500 transition-colors ml-1">✕</button>
              </span>
            )}
            {filterSalle && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
                <Home className="w-3 h-3" /> {filterSalle}
                <button onClick={() => setFilterSalle('')} className="hover:text-red-500 transition-colors ml-1">✕</button>
              </span>
            )}
            <span className="text-xs text-slate-400 font-semibold self-center">{filtered.length} {t('library.results', 'résultat(s)')}</span>
          </div>
        )}
      </Card>

      {/* Book Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">{t('library.noBooks', 'Aucun livre trouvé pour ces critères.')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <BookCard
              key={b.id}
              title={b.title}
              author={b.author}
              isbn={b.isbn}
              available={b.available}
              total={b.copies}
              coverUrl={b.coverUrl}
              onOpen={() => handleOpenManage(b)}
            />
          ))}
        </div>
      )}

      {/* ─── Add Book Modal ─────────────────────────────────────── */}
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title={t('library.addBook', 'Ajouter un Livre')}>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>{t('library.bookTitle', 'Titre')} *</label>
            <input type="text" className={inputCls} value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} placeholder="ex: Leçon de géographie CM1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{t('library.bookAuthor', 'Auteur')} *</label>
              <input type="text" className={inputCls} value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} placeholder="ex: EDICEF" />
            </div>
            <div>
              <label className={labelCls}>ISBN / Tag *</label>
              <input type="text" className={inputCls} value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} placeholder="ex: 978-2..." />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t('library.category', 'Catégorie')}</label>
            <select className={`${inputCls} bg-white`} value={newBook.category} onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}>
              {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Fichier du livre (PDF)</label>
            <input type="file" accept=".pdf" className={inputCls} onChange={(e) => setNewBook({ ...newBook, file: e.target.files?.[0] || null })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{t('library.totalCopies', 'Exemplaires Totaux')}</label>
              <input type="number" className={inputCls} value={newBook.copies} onChange={(e) => setNewBook({ ...newBook, copies: Number(e.target.value) })} />
            </div>
            <div>
              <label className={labelCls}>{t('library.available', 'Disponibles')}</label>
              <input type="number" className={inputCls} value={newBook.available} onChange={(e) => setNewBook({ ...newBook, available: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t('library.assignedRooms', 'Salles Affectées')}</label>
            <div className="grid grid-cols-3 gap-2 border border-slate-100 rounded-xl p-3 bg-slate-50/50 max-h-40 overflow-y-auto">
              {allSalles.map(s => (
                <label key={s} className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                  <input type="checkbox" checked={newBook.salles.includes(s)} onChange={() => handleToggleSalle(s, 'new')} className="rounded text-digi-purple focus:ring-digi-purple" />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setAddModalOpen(false)}>{t('common.cancel', 'Annuler')}</Button>
            <Button onClick={handleAddBook}>{t('library.addBook', 'Ajouter')}</Button>
          </div>
        </div>
      </Modal>

      {/* ─── Manage Book Modal ──────────────────────────────────── */}
      <Modal isOpen={isManageModalOpen} onClose={() => setManageModalOpen(false)} title={t('library.manageBook', 'Gérer le Livre')}>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>{t('library.bookTitle', 'Titre')}</label>
            <input type="text" className={inputCls} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{t('library.bookAuthor', 'Auteur')}</label>
              <input type="text" className={inputCls} value={editForm.author} onChange={(e) => setEditForm({ ...editForm, author: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>ISBN / Tag</label>
              <input type="text" className={inputCls} value={editForm.isbn} onChange={(e) => setEditForm({ ...editForm, isbn: e.target.value })} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t('library.category', 'Catégorie')}</label>
            <select className={`${inputCls} bg-white`} value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}>
              {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Mettre à jour le fichier (PDF)</label>
            <input type="file" accept=".pdf" className={inputCls} onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setEditForm({ ...editForm, fileUrl: URL.createObjectURL(file) });
            }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{t('library.totalCopies', 'Exemplaires Totaux')}</label>
              <input type="number" className={inputCls} value={editForm.copies} onChange={(e) => setEditForm({ ...editForm, copies: Number(e.target.value) })} />
            </div>
            <div>
              <label className={labelCls}>{t('library.available', 'Disponibles')}</label>
              <input type="number" className={inputCls} value={editForm.available} onChange={(e) => setEditForm({ ...editForm, available: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t('library.assignedRooms', 'Salles Affectées')}</label>
            <div className="grid grid-cols-3 gap-2 border border-slate-100 rounded-xl p-3 bg-slate-50/50 max-h-40 overflow-y-auto">
              {allSalles.map(s => (
                <label key={s} className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                  <input type="checkbox" checked={editForm.salles.includes(s)} onChange={() => handleToggleSalle(s, 'edit')} className="rounded text-digi-purple focus:ring-digi-purple" />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between gap-2 pt-2 border-t border-slate-100">
            {user?.typeAdmin !== 4 ? (
              <Button variant="danger" className="gap-2" onClick={handleDeleteBook}>
                <Trash2 className="w-4 h-4" />
                {t('common.delete', 'Supprimer')}
              </Button>
            ) : <div />}
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setManageModalOpen(false)}>
                {user?.typeAdmin !== 4 ? t('common.cancel', 'Annuler') : t('common.close', 'Fermer')}
              </Button>
              {user?.typeAdmin !== 4 && (
                <Button onClick={handleSaveEdit}>{t('common.save', 'Enregistrer')}</Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default LibraryManagePage;
