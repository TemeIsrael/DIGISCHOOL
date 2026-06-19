import React, { forwardRef } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  hint?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id || `datepicker-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700">
            {label}
            {props.required && <span className="text-digi-danger ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
          <input
            ref={ref}
            id={inputId}
            type="date"
            className={`
              w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium
              transition-all duration-200
              bg-white text-slate-800
              placeholder:text-slate-400
              ${error
                ? 'border-digi-danger focus:ring-2 focus:ring-digi-danger/20 focus:border-digi-danger'
                : 'border-slate-200 focus:ring-2 focus:ring-digi-purple/20 focus:border-digi-purple'
              }
              focus-visible:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50
              ${className}
            `}
            {...props}
          />
        </div>

        {hint && !error && (
          <p className="text-[11px] text-slate-400 font-medium">{hint}</p>
        )}

        {error && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-digi-danger animate-fade-in">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
