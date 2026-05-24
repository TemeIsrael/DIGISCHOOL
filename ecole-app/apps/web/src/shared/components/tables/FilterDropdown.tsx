import React from 'react';

export interface FilterOption {
  value: string | number;
  label: string;
}

export interface FilterDropdownProps {
  options: (FilterOption | string)[];
  value: string | number;
  onChange: (val: string) => void;
  label?: string;
}

/** Normalize string[] and FilterOption[] inputs */
const normalizeOptions = (options: (FilterOption | string)[]): FilterOption[] =>
  options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt));

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  value,
  onChange,
  label
}) => {
  const normalized = normalizeOptions(options);

  return (
    <div className="inline-flex items-center gap-2">
      {label && <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-digi-purple-bg border border-digi-purple-border text-digi-purple px-4 py-1.5 pr-8 rounded-full text-xs font-bold focus:outline-none focus:ring-2 focus:ring-digi-purple/30 cursor-pointer transition-colors hover:bg-digi-purple-border/20"
        >
          {normalized.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-digi-purple">
          <svg className="fill-current h-3.5 w-3.5" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
