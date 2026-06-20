import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { ScheduleGrid } from '../../../shared/components/business/ScheduleGrid';
import { Clock, BookOpen, Calendar } from 'lucide-react';

const scheduleData = [
  { jour: 'Lundi',    heureDebut: '07:30', heureFin: '08:15', cours: 'Français',               salle: 'CM1 A' },
  { jour: 'Lundi',    heureDebut: '08:15', heureFin: '09:00', cours: 'Mathématiques',           salle: 'CM1 A' },
  { jour: 'Lundi',    heureDebut: '10:00', heureFin: '11:00', cours: 'Sciences & Technologie',  salle: 'CM1 A' },
  { jour: 'Mardi',    heureDebut: '07:30', heureFin: '08:15', cours: 'Français',               salle: 'CM1 A' },
  { jour: 'Mardi',    heureDebut: '08:15', heureFin: '09:00', cours: 'Anglais',                salle: 'CM1 A' },
  { jour: 'Mardi',    heureDebut: '09:00', heureFin: '10:00', cours: 'Mathématiques',           salle: 'CM1 A' },
  { jour: 'Mercredi', heureDebut: '07:30', heureFin: '08:15', cours: 'Français',               salle: 'CM1 A' },
  { jour: 'Mercredi', heureDebut: '08:15', heureFin: '09:00', cours: 'Sciences & Technologie',  salle: 'CM1 A' },
  { jour: 'Jeudi',    heureDebut: '07:30', heureFin: '08:15', cours: 'Mathématiques',           salle: 'CM1 A' },
  { jour: 'Jeudi',    heureDebut: '08:15', heureFin: '09:00', cours: 'Éducation Civique',       salle: 'CM1 A' },
  { jour: 'Vendredi', heureDebut: '07:30', heureFin: '08:15', cours: 'Anglais',                salle: 'CM1 A' },
  { jour: 'Vendredi', heureDebut: '08:15', heureFin: '09:00', cours: 'Français',               salle: 'CM1 A' },
];

export const ParentSchedulePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  const totalDays = new Set(scheduleData.map(s => s.jour)).size;
  const totalSlots = scheduleData.length;
  const totalHours = totalSlots * 0.75; // 45 min each

  const translatedSchedule = isEn
    ? scheduleData.map(s => ({
        ...s,
        cours: s.cours === 'Français' ? 'French'
          : s.cours === 'Mathématiques' ? 'Mathematics'
          : s.cours === 'Anglais' ? 'English'
          : s.cours === 'Sciences & Technologie' ? 'Science & Technology'
          : s.cours === 'Éducation Civique' ? 'Civics'
          : s.cours,
      }))
    : scheduleData;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {t('schedules.title', 'Emploi du Temps')}
        </h1>
        <p className="text-sm text-slate-400 font-semibold">
          {isEn ? 'Weekly schedule for DUPONT Jean — CM1 A' : 'Emploi du temps hebdomadaire — DUPONT Jean · CM1 A'}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          value={String(totalDays)}
          label={t('schedules.days', 'Jours de Cours')}
          icon={<Calendar className="w-5 h-5 text-digi-purple" />}
        />
        <KPICard
          value={String(totalSlots)}
          label={t('schedules.slots', 'Créneaux Planifiés')}
          icon={<BookOpen className="w-5 h-5 text-digi-purple" />}
        />
        <KPICard
          value={`${totalHours}h`}
          label={t('schedules.weeklyVolume', 'Volume Hebdomadaire')}
          icon={<Clock className="w-5 h-5 text-digi-purple" />}
        />
      </div>

      {/* Weekly Schedule Grid */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-digi-purple-bg flex items-center justify-center border border-digi-purple-border/20">
            <Clock className="w-5 h-5 text-digi-purple" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
              {isEn ? 'Weekly Timetable — CM1 A' : 'Emploi du Temps Semaine — CM1 A'}
            </h3>
            <p className="text-xs text-slate-400 font-semibold">
              {isEn ? 'Read-only view' : 'Vue en lecture seule'}
            </p>
          </div>
        </div>
        <ScheduleGrid entries={translatedSchedule} isEn={isEn} />
      </Card>

      {/* Subject Summary */}
      <Card className="shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
          {isEn ? 'Weekly Subject Summary' : 'Récapitulatif Hebdomadaire par Matière'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { subject: isEn ? 'French' : 'Français', slots: 4, color: 'bg-blue-50 text-blue-700 border-blue-100' },
            { subject: isEn ? 'Mathematics' : 'Mathématiques', slots: 4, color: 'bg-purple-50 text-purple-700 border-purple-100' },
            { subject: isEn ? 'English' : 'Anglais', slots: 2, color: 'bg-green-50 text-green-700 border-green-100' },
            { subject: isEn ? 'Science & Technology' : 'Sciences & Tech', slots: 3, color: 'bg-amber-50 text-amber-700 border-amber-100' },
            { subject: isEn ? 'Civics' : 'Éd. Civique', slots: 1, color: 'bg-red-50 text-red-700 border-red-100' },
          ].map(item => (
            <div key={item.subject} className={`flex items-center justify-between p-3 rounded-xl border ${item.color}`}>
              <span className="text-xs font-bold">{item.subject}</span>
              <span className="text-xs font-black">{item.slots}×</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
export default ParentSchedulePage;
