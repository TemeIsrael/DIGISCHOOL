import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  hint,
  error,
  required = false,
  children,
  className = '',
  htmlFor,
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-semibold text-slate-700"
        >
          {label}
          {required && <span className="text-digi-danger ml-0.5">*</span>}
        </label>
      )}

      {children}

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
};
