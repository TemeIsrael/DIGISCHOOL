import React from 'react';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  message,
  className = '',
  fullScreen = false,
}) => {
  const sizeMap: Record<string, { icon: string; text: string }> = {
    sm: { icon: 'w-5 h-5', text: 'text-xs' },
    md: { icon: 'w-8 h-8', text: 'text-sm' },
    lg: { icon: 'w-12 h-12', text: 'text-base' },
  };

  const s = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status">
      <Loader2 className={`${s.icon} animate-spin text-digi-purple`} />
      {message && (
        <p className={`${s.text} font-semibold text-slate-400 animate-pulse`}>
          {message}
        </p>
      )}
      <span className="sr-only">Chargement</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};
