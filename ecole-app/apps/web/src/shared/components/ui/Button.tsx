import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger' | 'ghost' | 'success' | 'link';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      pill = true,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    const roundedStyles = pill ? 'rounded-full' : 'rounded-lg';

    const variantMap: Record<string, string> = {
      primary:
        'bg-digi-purple text-white hover:bg-digi-purple-dark focus-visible:ring-digi-purple shadow-sm hover:shadow-md active:scale-[0.98]',
      outline:
        'border-2 border-digi-purple-border text-digi-purple hover:bg-digi-purple-bg focus-visible:ring-digi-purple active:scale-[0.98]',
      danger:
        'bg-digi-danger text-white hover:bg-red-600 focus-visible:ring-digi-danger shadow-sm hover:shadow-md active:scale-[0.98]',
      ghost:
        'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400',
      success:
        'bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500 shadow-sm hover:shadow-md active:scale-[0.98]',
      link:
        'text-digi-purple hover:text-digi-purple-dark underline-offset-4 hover:underline p-0 h-auto focus-visible:ring-digi-purple',
    };

    const sizeMap: Record<string, string> = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-5 text-sm gap-2',
      lg: 'h-12 px-8 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${roundedStyles} ${variantMap[variant] || ''} ${sizeMap[size] || ''} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
