import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { BookOpen, Search, Eye, Loader2 } from 'lucide-react';
import { Modal } from '../../../shared/components/ui/Modal';
import { Button } from '../../../shared/components/ui/Button';
import { api } from '../../../shared/lib/api';

interface Book {
  id: number;
  titre: string;
  auteur: string;
  fichierUrl: string;
  specialty?: string;
  category?: string;
}

export const ParentLibraryPage: React.FC = () => {
  const { i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await api.get('/library');
        setBooks(res.data?.data || []);
      } catch (err) {
        console.error('Erreur chargement livres', err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filtered = books.filter(b => 
    b.titre?.toLowerCase().includes(search.toLowerCase()) || 
    b.auteur?.toLowerCase().includes(search.toLowerCase()) ||
    b.specialty?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bibliothèque Numérique</h1>
          <p className="text-sm text-slate-400 font-semibold">Consultez les livres et supports de cours</p>
        </div>
      </div>

      {/* Search */}
      <Card className="shadow-sm border border-slate-100">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un livre, un auteur ou une matière..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
          />
        </div>
      </Card>

      {/* Book Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-digi-purple" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Aucun livre trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((b) => (
            <Card key={b.id} className="p-4 border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-3 group hover:border-digi-purple/30 hover:shadow-md transition-all">
              <div className="w-20 h-28 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{b.titre}</h3>
                <p className="text-xs text-slate-500">{b.auteur}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-digi-purple-bg text-digi-purple text-[10px] font-bold rounded-full">{b.specialty || b.category || 'Général'}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                   if (b.fichierUrl) {
                      window.open(b.fichierUrl, '_blank');
                   } else {
                      setSelectedBook(b);
                   }
                }}
              >
                <Eye className="w-3 h-3" /> Lire
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Reader Modal (Fallback si pas de fichierUrl) */}
      <Modal isOpen={!!selectedBook} onClose={() => setSelectedBook(null)} title={selectedBook?.titre || 'Lecture'} size="lg">
        <div className="h-[60vh] bg-slate-100 rounded-xl flex items-center justify-center flex-col gap-4 text-slate-500">
           <BookOpen className="w-12 h-12 text-slate-300" />
           <p className="font-semibold text-center px-4">
             Fichier introuvable pour <br/>
             <strong className="text-slate-700">{selectedBook?.titre}</strong>
           </p>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => setSelectedBook(null)}>Fermer</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ParentLibraryPage;
