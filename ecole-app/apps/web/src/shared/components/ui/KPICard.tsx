import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';

export interface KPICardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'flat';
    value: string; // e.g. "+12%"
  };
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  value,
  label,
  icon,
  trend,
  className = '',
}) => {
  const trendConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    up: {
      icon: <TrendingUp className="w-3.5 h-3.5" />,
      color: 'text-emerald-600 bg-emerald-50',
    },
    down: {
      icon: <TrendingDown className="w-3.5 h-3.5" />,
      color: 'text-rose-600 bg-rose-50',
    },
    flat: {
      icon: <Minus className="w-3.5 h-3.5" />,
      color: 'text-slate-500 bg-slate-50',
    },
  };

  return (
    <Card className={`flex items-center justify-between ${className}`} hover>
      <div className="space-y-1">
        <p className="text-[28px] font-extrabold text-digi-purple tracking-tight leading-tight">
          {value}
        </p>
        <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${trendConfig[trend.direction]?.color}`}
          >
            {trendConfig[trend.direction]?.icon}
            {trend.value}
          </span>
        )}
      </div>
      {icon && (
        <div className="p-3 bg-digi-purple-bg text-digi-purple rounded-xl border border-digi-purple-border/20">
          {icon}
        </div>
      )}
    </Card>
  );
};
