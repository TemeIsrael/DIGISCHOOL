import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'admin' | 'teacher' | 'parent' | 'success' | 'warning' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  variant = 'success',
  children,
  ...props
}) => {
  let badgeStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none';

  let variantStyles = '';
  if (variant === 'admin') {
    variantStyles = 'bg-[#5EEAD4] text-[#0F766E]';
  } else if (variant === 'teacher') {
    variantStyles = 'bg-[#DDD6FE] text-[#5B21B6]';
  } else if (variant === 'parent') {
    variantStyles = 'bg-digi-purple-bg text-digi-purple';
  } else if (variant === 'success') {
    variantStyles = 'bg-emerald-100 text-emerald-800';
  } else if (variant === 'warning') {
    variantStyles = 'bg-amber-100 text-amber-800';
  } else if (variant === 'danger') {
    variantStyles = 'bg-rose-100 text-rose-800';
  }

  return (
    <span className={`${badgeStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </span>
  );
};
