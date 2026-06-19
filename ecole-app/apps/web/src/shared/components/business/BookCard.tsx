import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface BookCardProps {
  title?: string;
  author?: string;
  isbn?: string;
  available?: number;
  total?: number;
  // Legacy props (backward compatible)
  titre?: string;
  auteur?: string;
  specialty?: string;
  onOpen?: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  isbn,
  available,
  total,
  titre,
  auteur,
  specialty,
  onOpen
}) => {
  const { t } = useTranslation();
  
  const displayTitle = title || titre || '';
  const displayAuthor = author || auteur || '';
  const displayTag = specialty || isbn || '';
  const hasStock = available !== undefined && total !== undefined;
  const stockPct = hasStock ? Math.round((available! / total!) * 100) : null;

  return (
    <Card hover className="flex flex-col group overflow-hidden border border-slate-100 p-0">
      {/* Grey Placeholder Cover */}
      <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-digi-purple-bg to-slate-100 group-hover:scale-105 transition-transform duration-300" />
        <BookOpen className="w-10 h-10 text-digi-purple/40 relative z-10" />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-digi-purple bg-digi-purple-bg px-2 py-0.5 rounded-full border border-digi-purple-border/20 uppercase tracking-wider">
            {displayTag}
          </span>
          <h4 className="text-sm font-bold text-slate-800 tracking-tight mt-3 truncate">{displayTitle}</h4>
          <p className="text-xs text-slate-400 font-semibold truncate">{displayAuthor}</p>
        </div>

        {hasStock && (
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-semibold">{t('library.available', 'Disponibles')}</span>
              <span className="font-bold text-digi-purple">{available} / {total}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  stockPct! > 50 ? 'bg-digi-success' : stockPct! > 20 ? 'bg-digi-warning' : 'bg-digi-danger'
                }`}
                style={{ width: `${stockPct}%` }}
              />
            </div>
          </div>
        )}

        <Button variant="primary" size="sm" className="w-full mt-4" onClick={onOpen}>
          {hasStock ? t('library.manage', 'Gérer') : t('library.open', 'Ouvrir')}
        </Button>
      </div>
    </Card>
  );
};
