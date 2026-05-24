import React from 'react';
import { Card } from './Card';

export interface KPICardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  value,
  label,
  icon,
  className = ''
}) => {
  return (
    <Card className={`flex items-center justify-between ${className}`} hover>
      <div className="space-y-1">
        <p className="text-[28px] font-extrabold text-digi-purple tracking-tight leading-tight">
          {value}
        </p>
        <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </p>
      </div>
      {icon && (
        <div className="p-3 bg-digi-purple-bg text-digi-purple rounded-xl border border-digi-purple-border/20">
          {icon}
        </div>
      )}
    </Card>
  );
};
