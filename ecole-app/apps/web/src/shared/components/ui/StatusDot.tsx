import React from 'react';

export interface StatusDotProps {
  status: 'success' | 'warning' | 'danger' | 'info';
  pulse?: boolean;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  pulse = false,
  label,
  size = 'sm',
}) => {
  const colorMap: Record<string, string> = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-blue-500',
  };

  const sizeMap: Record<string, string> = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
  };

  const colorClass = colorMap[status] || colorMap.success;
  const sizeClass = sizeMap[size] || sizeMap.sm;

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`relative flex ${sizeClass}`}>
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`}
          />
        )}
        <span className={`relative inline-flex rounded-full ${sizeClass} ${colorClass}`} />
      </span>
      {label && (
        <span className="text-xs font-medium text-slate-600">{label}</span>
      )}
    </span>
  );
};
