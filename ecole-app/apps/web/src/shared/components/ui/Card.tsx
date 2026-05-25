import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'elevated' | 'glass';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className = '',
  variant = 'default',
  hover = false,
  padding = 'md',
  header,
  footer,
  children,
  ...props
}) => {
  const base = 'rounded-2xl transition-all duration-300';

  const variantMap: Record<string, string> = {
    default: 'bg-white border border-[#E5E7EB] shadow-sm',
    flat: 'bg-white border border-[#E5E7EB]',
    elevated: 'bg-white border border-[#E5E7EB] shadow-md',
    glass: 'bg-white/70 backdrop-blur-lg border border-white/30 shadow-lg',
  };

  const paddingMap: Record<string, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'hover:shadow-lg hover:border-slate-200 hover:-translate-y-0.5 cursor-pointer'
    : '';

  const hasHeaderOrFooter = header || footer;

  return (
    <div
      className={`${base} ${variantMap[variant]} ${hoverStyles} ${!hasHeaderOrFooter ? paddingMap[padding] : ''} ${className}`}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-slate-100">
          {header}
        </div>
      )}
      {hasHeaderOrFooter ? (
        <div className={paddingMap[padding]}>{children}</div>
      ) : (
        children
      )}
      {footer && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  );
};
