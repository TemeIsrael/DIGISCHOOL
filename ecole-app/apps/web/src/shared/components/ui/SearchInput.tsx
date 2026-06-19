import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../lib/hooks';

export interface SearchInputProps {
  value?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onSearch,
  placeholder = 'Rechercher...',
  debounceMs = 300,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue || '');
  const displayValue = controlledValue ?? internalValue;

  const debouncedSearch = useDebounce(displayValue, debounceMs);

  // Trigger search when debounced value changes
  React.useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (controlledValue === undefined) {
        setInternalValue(val);
      }
    },
    [controlledValue]
  );

  const handleClear = useCallback(() => {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onSearch('');
  }, [controlledValue, onSearch]);

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-10 rounded-lg border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-digi-purple/50 focus-visible:border-digi-purple transition-all duration-200"
        aria-label={placeholder}
      />
      {displayValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Effacer la recherche"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
