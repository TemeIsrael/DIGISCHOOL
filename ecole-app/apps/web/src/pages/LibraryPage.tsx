import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Search, Tags, Layers, BookMarked } from 'lucide-react';
import { Button } from '../shared/components/ui/Button';
import { Card } from '../shared/components/ui/Card';
import { KPICard } from '../shared/components/ui/KPICard';
import { FilterDropdown } from '../shared/components/tables/FilterDropdown';

export const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');

  const books = [
    { id: 1, titre: 'Algèbre Linéaire II', auteur: 'Jean Dupont', specialty: 'Sciences', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400' },
    { id: 2, titre: 'Physique Fondamentale', auteur: 'Marie Curie', specialty: 'Sciences', cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400' },
    { id: 3, titre: 'Histoire Contemporaine', auteur: 'Marc Bloch', specialty: 'Lettres', cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400' },
    { id: 4, titre: 'Introduction à la Programmation', auteur: 'Alan Turing', specialty: 'Informatique', cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400' },
    { id: 5, titre: 'Grammaire Française Avancée', auteur: 'Maurice Grevisse', specialty: 'Lettres', cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400' },
    { id: 6, titre: 'Algorithmes Complexes', auteur: 'Donald Knuth', specialty: 'Informatique', cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400' }
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.titre.toLowerCase().includes(searchTerm.toLowerCase()) || book.auteur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'ALL' || book.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Navbar */}
      <nav className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50">
        <span className="text-2xl font-black text-digi-purple tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          DIGISCHOOL
        </span>
        <div className="flex items-center gap-8 font-semibold text-sm text-slate-600">
          <span className="hover:text-digi-purple cursor-pointer transition-colors" onClick={() => navigate('/')}>{t('nav.home')}</span>
          <span className="hover:text-digi-purple cursor-pointer transition-colors text-digi-purple font-bold" onClick={() => navigate('/livres')}>{t('nav.books')}</span>
          <span className="hover:text-digi-purple cursor-pointer transition-colors" onClick={() => navigate('/a-propos')}>{t('nav.about')}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/s-inscrire')}>{t('nav.register')}</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/login')}>{t('nav.login')}</Button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto p-8 space-y-8 flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-slate-850 tracking-tight">{t('library.publicTitle')}</h1>
            <p className="text-slate-400 text-sm font-semibold mt-1">{t('library.publicSubtitle')}</p>
          </div>
        </div>

        {/* 3 KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard value={books.length} label={t('library.booksAvailable')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="3" label={t('library.specialties')} icon={<Tags className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="12" label={t('library.associatedCourses')} icon={<Layers className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder={t('library.searchByTitleAuthor')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full rounded-full border border-slate-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-digi-purple/50 focus-visible:border-digi-purple"
            />
          </div>

          <FilterDropdown
            label={t('library.specialty')}
            value={selectedSpecialty}
            onChange={setSelectedSpecialty}
            options={[
              { value: 'ALL', label: t('library.allSpecialties') },
              { value: 'Sciences', label: 'Sciences' },
              { value: 'Lettres', label: 'Lettres' },
              { value: 'Informatique', label: 'Informatique' }
            ]}
          />
        </div>

        {/* 3 Columns Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all overflow-hidden flex flex-col group" hover>
              {/* Cover Image Placeholder */}
              <div className="h-48 bg-slate-100 w-full relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:scale-105 transition-transform duration-300" />
                <BookMarked className="relative z-10 w-12 h-12 text-slate-400/80" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-digi-purple uppercase tracking-wider bg-digi-purple-bg px-2 py-0.5 rounded-full border border-digi-purple-border/20">
                    {book.specialty}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 tracking-tight mt-3 truncate">{book.titre}</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">{t('library.author')}: {book.auteur}</p>
                </div>
                <Button variant="primary" size="sm" className="w-full mt-6">
                  {t('library.openBook')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 px-8 mt-auto text-center text-xs text-slate-400 font-semibold">
        DIGISCHOOL &bull; {t('library.digitalLibrary')} &bull; 2026
      </footer>
    </div>
  );
};
export default LibraryPage;
