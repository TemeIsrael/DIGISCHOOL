import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, ChevronUp, Download, Search, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';
import { useTranslation } from 'react-i18next';

// ─── Types ──────────────────────────────────────────────────────────

export interface ColumnConfig<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  hidden?: boolean;
}

export interface DataTableFilter {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  exportFileName?: string;
  loading?: boolean;
  filters?: DataTableFilter[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  selectable?: boolean;
  selectedRows?: Set<number>;
  onSelectionChange?: (selected: Set<number>) => void;
  onRowClick?: (row: T, index: number) => void;
  actions?: (row: T, index: number) => React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  toolbar?: React.ReactNode;
  rowKey?: keyof T;
  striped?: boolean;
}

// ─── Component ──────────────────────────────────────────────────────

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder,
  searchKey,
  exportFileName = 'export',
  loading = false,
  filters,
  pageSizeOptions = [5, 10, 15, 25, 50],
  defaultPageSize = 10,
  selectable = false,
  selectedRows,
  onSelectionChange,
  onRowClick,
  actions,
  emptyTitle,
  emptyDescription,
  toolbar,
  rowKey,
  striped = false,
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Internal selection state (use external if provided)
  const [internalSelection, setInternalSelection] = useState<Set<number>>(new Set());
  const selected = selectedRows ?? internalSelection;
  const setSelected = onSelectionChange ?? setInternalSelection;

  const visibleColumns = columns.filter((col) => !col.hidden);

  // Filter Data
  const filteredData = useMemo(() => {
    if (!searchTerm || !searchKey) return data;
    return data.filter((item) => {
      const val = item[searchKey as string];
      return val ? String(val).toLowerCase().includes(searchTerm.toLowerCase()) : false;
    });
  }, [data, searchTerm, searchKey]);

  // Sort Data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === undefined || bVal === undefined) return 0;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return sorted;
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, sortedData.length);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // Selection handlers
  const handleSelectAll = useCallback(() => {
    if (selected.size === sortedData.length) {
      setSelected(new Set());
    } else {
      const allIndices = new Set(sortedData.map((_, idx) => idx));
      setSelected(allIndices);
    }
  }, [selected, sortedData, setSelected]);

  const handleSelectRow = useCallback((idx: number) => {
    const newSelection = new Set(selected);
    if (newSelection.has(idx)) {
      newSelection.delete(idx);
    } else {
      newSelection.add(idx);
    }
    setSelected(newSelection);
  }, [selected, setSelected]);

  const getRowKey = (row: T, idx: number): string | number => {
    if (rowKey && row[rowKey as string] !== undefined) return row[rowKey as string];
    return idx;
  };

  // CSV Exporter
  const exportToCSV = () => {
    const headers = visibleColumns.map((col) => col.header).join(',');
    const rows = data.map((row) =>
      visibleColumns
        .map((col) => {
          const val = row[col.key as string];
          return val ? `"${String(val).replace(/"/g, '""')}"` : '""';
        })
        .join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${exportFileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Page number array for pagination
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    
    const pages: (number | '...')[] = [1];
    if (currentPage > 3) pages.push('...');
    
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) pages.push(i);
    
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    
    return pages;
  };

  const totalColSpan = visibleColumns.length + (selectable ? 1 : 0) + (actions ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* ─── Toolbar Row ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          {searchKey && (
            <div className="relative max-w-xs w-full sm:w-auto">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={searchPlaceholder || t('common.search')}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-2 w-full rounded-full border border-slate-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-digi-purple/50 focus-visible:border-digi-purple transition-all"
              />
            </div>
          )}

          {/* Filters */}
          {filters?.map((filter) => (
            <div key={filter.key} className="inline-flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">{filter.label}</span>
              <select
                value={filter.value}
                onChange={(e) => {
                  filter.onChange(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-digi-purple-bg border border-digi-purple-border text-digi-purple px-4 py-1.5 pr-8 rounded-full text-xs font-bold focus:outline-none focus:ring-2 focus:ring-digi-purple/30 cursor-pointer transition-colors hover:bg-digi-purple-border/20"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {toolbar}
          <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t('common.export')} CSV</span>
          </Button>
        </div>
      </div>

      {/* ─── Selection Info ─────────────────────────────────────────── */}
      {selectable && selected.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-digi-purple-bg border border-digi-purple-border rounded-xl animate-fade-in">
          <span className="text-xs font-bold text-digi-purple">
            {selected.size} {selected.size === 1 ? 'élément sélectionné' : 'éléments sélectionnés'}
          </span>
          <button
            onClick={() => setSelected(new Set())}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            {t('common.cancel')}
          </button>
        </div>
      )}

      {/* ─── Main Table ────────────────────────────────────────────── */}
      <div className="overflow-x-auto rounded-xl border border-[#E5E7EB] shadow-sm bg-white">
        <table className="min-w-full divide-y divide-[#E5E7EB] text-sm">
          <thead className="bg-slate-50/80">
            <tr>
              {/* Selection Column */}
              {selectable && (
                <th className="w-12 px-3 py-3">
                  <input
                    type="checkbox"
                    checked={sortedData.length > 0 && selected.size === sortedData.length}
                    ref={(el) => {
                      if (el) el.indeterminate = selected.size > 0 && selected.size < sortedData.length;
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-digi-purple focus:ring-digi-purple/30 cursor-pointer"
                  />
                </th>
              )}

              {/* Data Columns */}
              {visibleColumns.map((col) => (
                <th
                  key={col.key as string}
                  onClick={() => col.sortable && handleSort(col.key as string)}
                  className={`px-4 py-3 font-bold text-slate-600 text-xs uppercase tracking-wider ${
                    col.sortable ? 'cursor-pointer select-none hover:bg-slate-100 transition-colors' : ''
                  } ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}
                  style={col.width ? { width: col.width } : undefined}
                >
                  <div className={`flex items-center gap-1 ${col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : ''}`}>
                    <span>{col.header}</span>
                    {col.sortable && sortKey === col.key && (
                      sortDirection === 'asc'
                        ? <ChevronUp className="w-3.5 h-3.5 text-digi-purple" />
                        : <ChevronDown className="w-3.5 h-3.5 text-digi-purple" />
                    )}
                  </div>
                </th>
              ))}

              {/* Actions Column */}
              {actions && (
                <th className="px-4 py-3 text-right font-bold text-slate-600 text-xs uppercase tracking-wider w-20">
                  <MoreHorizontal className="w-4 h-4 ml-auto text-slate-400" />
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
            {/* Loading State */}
            {loading && (
              <tr>
                <td colSpan={totalColSpan} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Spinner size="md" />
                    <span className="text-sm font-semibold text-slate-400">{t('common.loading')}</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty State */}
            {!loading && paginatedData.length === 0 && (
              <tr>
                <td colSpan={totalColSpan} className="px-4 py-16">
                  <EmptyState
                    title={emptyTitle || t('common.noResults')}
                    description={emptyDescription}
                  />
                </td>
              </tr>
            )}

            {/* Data Rows */}
            {!loading && paginatedData.map((row, rIdx) => {
              const absoluteIdx = (currentPage - 1) * pageSize + rIdx;
              const isSelected = selected.has(absoluteIdx);

              return (
                <tr
                  key={getRowKey(row, rIdx)}
                  onClick={() => onRowClick?.(row, absoluteIdx)}
                  className={`
                    transition-colors duration-150
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${isSelected ? 'bg-digi-purple-bg/50' : ''}
                    ${striped && rIdx % 2 === 1 ? 'bg-slate-50/30' : ''}
                    hover:bg-slate-50/70
                  `}
                >
                  {/* Selection Cell */}
                  {selectable && (
                    <td className="w-12 px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(absoluteIdx)}
                        className="w-4 h-4 rounded border-slate-300 text-digi-purple focus:ring-digi-purple/30 cursor-pointer"
                      />
                    </td>
                  )}

                  {/* Data Cells */}
                  {visibleColumns.map((col) => (
                    <td
                      key={col.key as string}
                      className={`px-4 py-3 whitespace-nowrap ${
                        col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''
                      }`}
                    >
                      {col.render ? col.render(row, absoluteIdx) : row[col.key as string] ?? '—'}
                    </td>
                  ))}

                  {/* Actions Cell */}
                  {actions && (
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      {actions(row, absoluteIdx)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ─── Pagination Bar ────────────────────────────────────────── */}
      {!loading && sortedData.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1">
          {/* Left: page info + page size selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-500">
              {startIndex}–{endIndex} sur {sortedData.length}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">Lignes :</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-digi-purple/30 cursor-pointer"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: page navigation */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-500"
                aria-label="Page précédente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                  <span key={`dots-${idx}`} className="px-2 py-1 text-xs text-slate-400">…</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`
                      min-w-[32px] h-8 rounded-lg text-xs font-bold transition-all duration-200
                      ${currentPage === page
                        ? 'bg-digi-purple text-white shadow-sm'
                        : 'text-slate-500 hover:bg-slate-100'
                      }
                    `}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-slate-500"
                aria-label="Page suivante"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DataTable;
