import React from 'react';

export interface ScheduleEntry {
  jour: string;
  heureDebut: string;
  heureFin: string;
  cours: string;
  salle: string;
}

export interface ScheduleItem {
  id: number;
  subject: string;
  teacher: string;
  hourStart: string;
  hourEnd: string;
  day: string;
}

export interface ScheduleGridProps {
  entries?: ScheduleEntry[];
  items?: ScheduleItem[];
  onItemClick?: (item: ScheduleItem | ScheduleEntry) => void;
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'] as const;

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({ entries, items, onItemClick: _onItemClick }) => {
  // Normalize both APIs into a unified shape
  type NormalizedItem = { day: string; start: string; end: string; title: string; subtitle: string };

  const normalized: NormalizedItem[] = [];

  if (entries) {
    entries.forEach((e) => {
      normalized.push({ day: e.jour, start: e.heureDebut, end: e.heureFin, title: e.cours, subtitle: e.salle });
    });
  }

  if (items) {
    items.forEach((item) => {
      normalized.push({ day: item.day, start: item.hourStart, end: item.hourEnd, title: item.subject, subtitle: item.teacher });
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {DAYS.map((day) => {
        const dayItems = normalized.filter((item) => item.day === day);
        return (
          <div key={day} className="bg-white rounded-2xl border border-[#E5E7EB] p-4 space-y-3 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
              {day}
            </h4>
            <div className="space-y-2">
              {dayItems.length > 0 ? (
                dayItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-digi-purple-bg text-digi-purple border border-digi-purple-border/20 rounded-xl cursor-pointer hover:bg-digi-purple-border/20 transition-all select-none"
                  >
                    <p className="text-xs font-bold leading-tight">{item.title}</p>
                    <p className="text-[10px] text-digi-purple/80 mt-1 truncate">{item.subtitle}</p>
                    <p className="text-[9px] font-black text-digi-purple/60 mt-1.5">
                      {item.start} - {item.end}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-slate-300 italic py-4 text-center">Aucun cours</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
