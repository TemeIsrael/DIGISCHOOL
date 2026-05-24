import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', pill = true, children, ...props }, ref) => {
    let baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    // Rounded pill by default
    const roundedStyles = pill ? 'rounded-full' : 'rounded-lg';

    // Variant Styles
    let variantStyles = '';
    if (variant === 'primary') {
      variantStyles = 'bg-digi-purple text-white hover:bg-digi-purple-dark focus-visible:ring-digi-purple';
    } else if (variant === 'outline') {
      variantStyles = 'border border-digi-purple-border text-digi-purple hover:bg-digi-purple-bg focus-visible:ring-digi-purple';
    } else if (variant === 'danger') {
      variantStyles = 'bg-digi-danger text-white hover:bg-red-600 focus-visible:ring-digi-danger';
    }

    // Size Styles
    let sizeStyles = '';
    if (size === 'sm') {
      sizeStyles = 'h-8 px-3 text-xs';
    } else if (size === 'md') {
      sizeStyles = 'h-10 px-5 text-sm';
    } else if (size === 'lg') {
      sizeStyles = 'h-12 px-8 text-base';
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${roundedStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
