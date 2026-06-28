import React, { useState } from 'react';
import { BookOpen, Search, Tags, Layers, BookMarked, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Home } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useTranslation } from 'react-i18next';
import { Button } from '../shared/components/ui/Button';
import { Card } from '../shared/components/ui/Card';
import { KPICard } from '../shared/components/ui/KPICard';
import { FilterDropdown } from '../shared/components/tables/FilterDropdown';
import { PublicNavbar } from '../shared/components/layout/PublicNavbar';
import { PublicFooter } from '../shared/components/layout/PublicFooter';
import { getBooks, allSalles, type LibraryBook } from '../features/library/mockBooksData';

/* ─── BookReaderModal ─────────────────────────────────────────────── */
interface BookReaderModalProps {
  book: LibraryBook;
  onClose: () => void;
}

const BookReaderModal: React.FC<BookReaderModalProps> = ({ book, onClose }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);

  const totalPages = book.pages.length;
  const page = book.pages[currentPage];

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.6));
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));

  const downloadBook = () => {
    // Create a temporary element containing cover image and book content
    const coverImg = book.coverUrl || 'https://via.placeholder.com/600x800.png?text=Cover';
    const contentHtml = `
      <div style="font-family:Arial,sans-serif; padding:20px;">
        <img src="${coverImg}" alt="Cover" style="width:100%; max-width:600px; display:block; margin:0 auto 20px;"/>
        <h2 style="text-align:center;">${book.titre}</h2>
        <p style="text-align:center; color:#555;">${book.auteur}</p>
        ${book.pages.map(p => `<h3>${p.title}</h3><pre style="white-space:pre-wrap;">${p.content}</pre>`).join('')}
      </div>`;
    const container = document.createElement('div');
    container.innerHTML = contentHtml;
    // Use html2pdf to generate PDF
    // @ts-ignore - html2pdf is loaded via script
    html2pdf().from(container).set({
      margin: 10,
      filename: `${book.titre.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col overflow-hidden border border-slate-100">
        {/* Reader Header / Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <BookOpen className="w-5 h-5 text-digi-purple shrink-0" />
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">{book.titre}</p>
              <p className="text-slate-400 text-xs font-semibold">{book.auteur}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={handleZoomOut} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors" aria-label="Zoom out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-slate-300 text-xs font-bold w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors" aria-label="Zoom in">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={downloadBook}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-1"
              aria-label="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-red-800 text-slate-300 hover:text-white transition-colors ml-2" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-amber-50 p-4">
          <div
            className="bg-white rounded-xl shadow-md border border-slate-100 p-8 mx-auto transition-all duration-200 origin-top"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', maxWidth: '680px', minHeight: '500px' }}
          >
            <h2 className="text-lg font-extrabold text-digi-purple mb-4 pb-3 border-b border-slate-100 tracking-tight">{page.title}</h2>
            <pre className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">{page.content}</pre>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-slate-100 shrink-0">
          <div className="hidden sm:flex items-center gap-1">
            {book.pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                  idx === currentPage ? 'bg-digi-purple text-white shadow' : 'bg-slate-100 text-slate-500 hover:bg-digi-purple-bg hover:text-digi-purple'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="sm:hidden text-sm font-semibold text-slate-600">
            {t('library.page', 'Page')} {currentPage + 1} / {totalPages}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-digi-purple-bg hover:text-digi-purple disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('library.prev', 'Précédent')}</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-digi-purple text-white hover:bg-digi-purple-dark disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm transition-all"
            >
              <span className="hidden sm:inline">{t('library.next', 'Suivant')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Library Page ───────────────────────────────────────────── */
export const LibraryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [selectedSalle, setSelectedSalle] = useState('ALL');
  const [openBook, setOpenBook] = useState<LibraryBook | null>(null);

  const books = getBooks(i18n.language);

  const specialties = ['ALL', ...Array.from(new Set(books.map((b) => b.specialty)))];

  const filteredBooks = books.filter((book) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      book.titre.toLowerCase().includes(q) ||
      book.auteur.toLowerCase().includes(q) ||
      book.salles.some((s) => s.toLowerCase().includes(q));
    const matchesSpecialty = selectedSpecialty === 'ALL' || book.specialty === selectedSpecialty;
    const matchesSalle = selectedSalle === 'ALL' || book.salles.includes(selectedSalle);
    return matchesSearch && matchesSpecialty && matchesSalle;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicNavbar />

      {/* Book Reader Modal */}
      {openBook && <BookReaderModal book={openBook} onClose={() => setOpenBook(null)} />}

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-8 flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-slate-800 tracking-tight">📖 {t('library.titlePublic', 'Bibliothèque Scolaire')}</h1>
            <p className="text-slate-400 text-sm font-semibold mt-1">{t('library.subtitlePublic', 'Accédez en ligne aux manuels et ressources du primaire')}</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <KPICard value={books.length} label={t('library.catalog', 'Livres disponibles')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
          <KPICard value={specialties.length - 1} label={t('library.subjects', 'Matières')} icon={<Tags className="w-5 h-5 text-digi-purple" />} />
          <KPICard value={allSalles.length} label={t('library.roomsCovered', 'Salles couvertes')} icon={<Layers className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm sm:flex-row sm:items-center sm:flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('library.searchPublic', 'Rechercher par titre, auteur ou salle…')}
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

          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-slate-400 shrink-0" />
            <FilterDropdown
              label={t('library.room', 'Salle')}
              value={selectedSalle}
              onChange={setSelectedSalle}
              options={[
                { value: 'ALL', label: t('library.allRooms', 'Toutes les salles') },
                ...allSalles.map((s) => ({ value: s, label: s }))
              ]}
            />
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-semibold">{t('library.noBooks', 'Aucun livre trouvé pour ces critères.')}</p>
            <p className="text-sm mt-1">{t('library.noBooksSub', 'Essayez un autre terme de recherche ou filtre.')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <Card
                key={book.id}
                className="border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all overflow-hidden flex flex-col group"
                hover
              >
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold text-digi-purple uppercase tracking-wider bg-digi-purple-bg px-2 py-0.5 rounded-full border border-digi-purple-border/20">
                        {book.specialty}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-snug">{book.titre}</h3>
                    <p className="text-xs text-slate-400 font-semibold">{t('library.author', 'Auteur')} : {book.auteur}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {book.salles.map((salle) => (
                        <span key={salle} className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                          <Home className="w-2.5 h-2.5" />
                          {salle}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button variant="primary" size="sm" className="w-full mt-2" onClick={() => setOpenBook(book)}>
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
