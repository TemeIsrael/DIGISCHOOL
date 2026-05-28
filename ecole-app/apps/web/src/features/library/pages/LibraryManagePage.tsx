import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { BookOpen, Search, FilePlus, Star, Eye, Users } from 'lucide-react';
import { BookCard } from '../../../shared/components/business/BookCard';

const mockBooks = [
  { id: 1, title: 'Mathématiques 6ème', author: 'CIAM', isbn: '978-2-01-111', category: 'Sciences', copies: 25, available: 18, rating: 4.2 },
  { id: 2, title: 'Grammaire Française', author: 'Bescherelle', isbn: '978-2-01-222', category: 'Lettres', copies: 30, available: 12, rating: 4.5 },
  { id: 3, title: 'English Grammar in Use', author: 'R. Murphy', isbn: '978-0-52-333', category: 'Langues', copies: 20, available: 20, rating: 4.8 },
  { id: 4, title: 'Physique-Chimie 4ème', author: 'Hachette', isbn: '978-2-01-444', category: 'Sciences', copies: 15, available: 5, rating: 3.9 },
  { id: 5, title: 'Histoire-Géographie 3ème', author: 'Nathan', isbn: '978-2-09-555', category: 'Humanités', copies: 22, available: 22, rating: 4.0 },
  { id: 6, title: 'SVT Terminale', author: 'Bordas', isbn: '978-2-04-666', category: 'Sciences', copies: 18, available: 10, rating: 4.3 },
];

export const LibraryManagePage: React.FC = () => {
  const { t } = useTranslation();
  const [filterCat, setFilterCat] = useState('Tous');
  const [search, setSearch] = useState('');

  const filtered = mockBooks.filter((b) => {
    const matchCat = filterCat === 'Tous' || b.category === filterCat;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalBooks = mockBooks.reduce((s, b) => s + b.copies, 0);
  const availableBooks = mockBooks.reduce((s, b) => s + b.available, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('library.titleManage')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('library.subtitle')}</p>
        </div>
        <Button className="gap-2">
          <FilePlus className="w-4 h-4" />
          {t('library.addBook')}
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={String(mockBooks.length)} label={t('library.catalog')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(totalBooks)} label={t('library.totalCopies')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(availableBooks)} label={t('library.available')} icon={<Eye className="w-5 h-5 text-digi-success" />} />
        <KPICard value={String(totalBooks - availableBooks)} label={t('library.borrowed')} icon={<Star className="w-5 h-5 text-digi-warning" />} />
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
              placeholder={t('library.search')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown label={t('library.category')} value={filterCat} options={['Tous', 'Sciences', 'Lettres', 'Langues', 'Humanités']} onChange={setFilterCat} />
        </div>
      </Card>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b) => (
          <BookCard
            key={b.id}
            title={b.title}
            author={b.author}
            isbn={b.isbn}
            available={b.available}
            total={b.copies}
          />
        ))}
      </div>
    </div>
  );
};
export default LibraryManagePage;
