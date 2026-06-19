import React from 'react';
import { FileQuestion } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <FileQuestion className="w-12 h-12 text-slate-300" />,
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-white max-w-sm mx-auto">
      <div className="mb-4">{icon}</div>
      <h3 className="text-base font-bold text-slate-800 tracking-tight">{title}</h3>
      {description && <p className="mt-1.5 text-xs text-slate-500 max-w-xs">{description}</p>}
      {actionText && onAction && (
        <Button size="sm" className="mt-5" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
