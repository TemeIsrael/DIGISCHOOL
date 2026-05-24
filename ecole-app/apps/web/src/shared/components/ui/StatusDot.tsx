import React from 'react';

export interface StatusDotProps {
  status: 'success' | 'warning' | 'danger';
  pulse?: boolean;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, pulse = false }) => {
  let colorClass = '';
  if (status === 'success') colorClass = 'bg-emerald-500';
  if (status === 'warning') colorClass = 'bg-amber-500';
  if (status === 'danger') colorClass = 'bg-rose-500';

  return (
    <span className="relative flex h-2 w-2">
      {pulse && (
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`} />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colorClass}`} />
    </span>
  );
};
