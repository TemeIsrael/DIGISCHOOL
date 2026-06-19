import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  direction?: 'horizontal' | 'vertical';
  required?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  error,
  direction = 'vertical',
  required = false,
}) => {
  return (
    <fieldset className="space-y-2">
      {label && (
        <legend className="block text-sm font-semibold text-slate-700 mb-2">
          {label}
          {required && <span className="text-digi-danger ml-0.5">*</span>}
        </legend>
      )}

      <div className={`
        ${direction === 'horizontal'
          ? 'flex flex-wrap items-start gap-4'
          : 'space-y-2'
        }
      `}>
        {options.map((option) => {
          const inputId = `${name}-${option.value}`;
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`
                flex items-start gap-3 cursor-pointer group
                ${direction === 'horizontal' ? '' : 'p-3 rounded-xl border transition-all duration-200'}
                ${direction !== 'horizontal' && isSelected ? 'border-digi-purple bg-digi-purple-bg' : ''}
                ${direction !== 'horizontal' && !isSelected ? 'border-slate-200 hover:border-slate-300 bg-white' : ''}
                ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="relative mt-0.5">
                <input
                  id={inputId}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => onChange?.(e.target.value)}
                  disabled={option.disabled}
                  className="peer sr-only"
                />
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                  peer-checked:border-digi-purple
                  peer-focus-visible:ring-2 peer-focus-visible:ring-digi-purple/30
                  group-hover:border-digi-purple/50
                  ${error ? 'border-digi-danger' : 'border-slate-300'}
                `}>
                  <div className={`
                    w-2.5 h-2.5 rounded-full bg-digi-purple transition-all duration-200
                    ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                  `} />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-slate-700 block">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-slate-400 font-medium block mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-digi-danger animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </fieldset>
  );
};
