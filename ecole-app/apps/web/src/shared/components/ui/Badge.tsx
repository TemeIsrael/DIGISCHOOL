import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'admin' | 'teacher' | 'parent' | 'student' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  variant = 'success',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const baseBadge =
    'inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none';

  const sizeMap: Record<string, string> = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-xs',
  };

  const variantMap: Record<string, { bg: string; text: string; dot: string }> = {
    admin: { bg: 'bg-[#5EEAD4]/20', text: 'text-[#0F766E]', dot: 'bg-[#0F766E]' },
    teacher: { bg: 'bg-[#DDD6FE]/40', text: 'text-[#5B21B6]', dot: 'bg-[#5B21B6]' },
    parent: { bg: 'bg-digi-purple-bg', text: 'text-digi-purple', dot: 'bg-digi-purple' },
    student: { bg: 'bg-sky-100', text: 'text-sky-800', dot: 'bg-sky-600' },
    success: { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
    warning: { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
    danger: { bg: 'bg-rose-100', text: 'text-rose-800', dot: 'bg-rose-500' },
    info: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
    neutral: { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' },
  };

  const v = variantMap[variant] || variantMap.neutral;

  return (
    <span
      className={`${baseBadge} ${sizeMap[size]} ${v.bg} ${v.text} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${v.dot}`} />
      )}
      {children}
    </span>
  );
};
