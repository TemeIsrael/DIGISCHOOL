import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showFirstLast = true,
}) => {
  if (totalPages <= 1) return null;

  const getPages = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('ellipsis');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('ellipsis');

      pages.push(totalPages);
    }

    return pages;
  };

  const btnBase =
    'inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all duration-150 select-none';
  const btnActive =
    'bg-digi-purple text-white shadow-sm';
  const btnInactive =
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900';
  const btnDisabled =
    'text-slate-300 pointer-events-none';

  return (
    <nav className={`flex items-center gap-1 ${className}`} aria-label="Pagination">
      {/* First */}
      {showFirstLast && (
        <button
          className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnInactive}`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="Première page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
      )}

      {/* Previous */}
      <button
        className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnInactive}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Page précédente"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      {getPages().map((page, idx) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-slate-400">
            …
          </span>
        ) : (
          <button
            key={page}
            className={`${btnBase} ${page === currentPage ? btnActive : btnInactive}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnInactive}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Page suivante"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Last */}
      {showFirstLast && (
        <button
          className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnInactive}`}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Dernière page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
};
