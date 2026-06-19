import React, { forwardRef } from 'react';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, indeterminate = false, error, className = '', id, ...props }, ref) => {
    const inputId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className={`${className}`}>
        <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5">
            <input
              ref={(el) => {
                if (el) el.indeterminate = indeterminate;
                if (typeof ref === 'function') ref(el);
                else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
              }}
              id={inputId}
              type="checkbox"
              className="peer sr-only"
              {...props}
            />
            <div className={`
              w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
              peer-checked:bg-digi-purple peer-checked:border-digi-purple
              peer-focus-visible:ring-2 peer-focus-visible:ring-digi-purple/30
              group-hover:border-digi-purple/50
              ${error ? 'border-digi-danger' : 'border-slate-300'}
              ${indeterminate ? 'bg-digi-purple border-digi-purple' : ''}
              ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}>
              {indeterminate ? (
                <Minus className="w-3 h-3 text-white" />
              ) : (
                <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-150" />
              )}
            </div>
          </div>

          {(label || description) && (
            <div className="min-w-0 flex-1">
              {label && (
                <span className={`
                  text-sm font-semibold block
                  ${error ? 'text-digi-danger' : 'text-slate-700'}
                  ${props.disabled ? 'opacity-50' : ''}
                `}>
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-slate-400 font-medium block mt-0.5">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {error && (
          <p className="text-xs font-semibold text-digi-danger mt-1.5 ml-8">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
