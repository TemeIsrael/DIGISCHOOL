import React, { forwardRef } from 'react';

export interface ToggleSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md';
}

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  ({ label, description, size = 'md', className = '', id, ...props }, ref) => {
    const inputId = id || `toggle-${Math.random().toString(36).slice(2, 9)}`;

    const sizeClasses = {
      sm: { track: 'w-8 h-[18px]', thumb: 'w-3.5 h-3.5 peer-checked:translate-x-3.5' },
      md: { track: 'w-11 h-6', thumb: 'w-5 h-5 peer-checked:translate-x-5' },
    };

    return (
      <label
        htmlFor={inputId}
        className={`inline-flex items-start gap-3 cursor-pointer group ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        <div className="relative shrink-0 mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            className="peer sr-only"
            {...props}
          />
          <div className={`
            ${sizeClasses[size].track}
            rounded-full transition-all duration-300 ease-in-out
            bg-slate-200 peer-checked:bg-digi-purple
            peer-focus-visible:ring-2 peer-focus-visible:ring-digi-purple/30 peer-focus-visible:ring-offset-1
            group-hover:bg-slate-300 peer-checked:group-hover:bg-digi-purple-light
          `} />
          <div className={`
            ${sizeClasses[size].thumb}
            absolute top-[1px] left-[1px] rounded-full
            bg-white shadow-sm
            transition-all duration-300 ease-in-out
          `} />
        </div>

        {(label || description) && (
          <div className="min-w-0 flex-1">
            {label && (
              <span className="text-sm font-semibold text-slate-700 block">
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
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch';
