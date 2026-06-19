import React from 'react';

export interface GradeCellProps {
  note: number | null;
  max?: number;
  maxNote?: number;
}

export const GradeCell: React.FC<GradeCellProps> = ({ note, max, maxNote }) => {
  const maximum = max || maxNote || 10;

  if (note === null || note === undefined) {
    return (
      <span className="inline-flex items-center justify-center font-bold px-2 py-0.5 rounded-md border text-xs bg-slate-50 text-slate-400 border-slate-200">
        —
      </span>
    );
  }

  const ratio = note / maximum;
  let colorClass = '';
  if (ratio >= 0.7) {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (ratio >= 0.5) {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
  } else {
    colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <span className={`inline-flex items-center justify-center font-bold px-2 py-0.5 rounded-md border text-xs ${colorClass}`}>
      {note} / {maximum}
    </span>
  );
};
