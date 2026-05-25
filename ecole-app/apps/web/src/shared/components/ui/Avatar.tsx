import React from 'react';
import { getInitials } from '../../lib/formatters';

export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | null;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  status = null,
  className = '',
}) => {
  const sizeMap: Record<string, { container: string; text: string; status: string }> = {
    sm: { container: 'w-8 h-8', text: 'text-xs', status: 'w-2 h-2 border' },
    md: { container: 'w-10 h-10', text: 'text-sm', status: 'w-2.5 h-2.5 border-2' },
    lg: { container: 'w-14 h-14', text: 'text-lg', status: 'w-3 h-3 border-2' },
    xl: { container: 'w-20 h-20', text: 'text-2xl', status: 'w-3.5 h-3.5 border-2' },
  };

  const statusColorMap: Record<string, string> = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    away: 'bg-amber-500',
  };

  const s = sizeMap[size] || sizeMap.md;
  const initials = getInitials(name);

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`${s.container} rounded-full object-cover ring-2 ring-white`}
          loading="lazy"
        />
      ) : (
        <div
          className={`${s.container} rounded-full bg-gradient-to-br from-digi-purple to-digi-purple-light flex items-center justify-center ring-2 ring-white`}
        >
          <span className={`${s.text} font-bold text-white`}>{initials}</span>
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${s.status} rounded-full border-white ${statusColorMap[status] || ''}`}
          aria-label={status}
        />
      )}
    </div>
  );
};
