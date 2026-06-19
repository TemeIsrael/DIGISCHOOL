import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCount?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = '',
      label,
      error,
      hint,
      maxLength,
      showCount = false,
      resize = 'vertical',
      value,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const resizeMap: Record<string, string> = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={`flex w-full min-h-[80px] rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-digi-purple/50 focus-visible:border-digi-purple disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${resizeMap[resize]} ${
            error ? 'border-digi-danger focus-visible:ring-digi-danger/50' : ''
          } ${className}`}
          aria-invalid={!!error}
          {...props}
        />
        <div className="flex items-center justify-between">
          <div>
            {error && (
              <p className="text-xs font-medium text-digi-danger" role="alert">
                {error}
              </p>
            )}
            {!error && hint && (
              <p className="text-xs text-slate-400">{hint}</p>
            )}
          </div>
          {showCount && maxLength && (
            <p className={`text-xs ${charCount > maxLength * 0.9 ? 'text-amber-600' : 'text-slate-400'}`}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
