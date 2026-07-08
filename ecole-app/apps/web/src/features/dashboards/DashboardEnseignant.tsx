import React from 'react';
import { useTranslation } from 'react-i18next';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { ScheduleGrid } from '../../shared/components/business/ScheduleGrid';
import { BookOpen, Users, ClipboardList, Clock } from 'lucide-react';
import { useDashboardStats } from './hooks/useDashboardStats';

export const DashboardEnseignant: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const { stats, isLoading } = useDashboardStats('TEACHER');

  const upcomingEvals = stats?.upcomingEvals || [];

  const getTranslatedCourse = (cours: string) => {
    switch(cours) {
      case 'Français':
        return t('stats.labels.fr', 'Français');
      case 'Mathématiques':
        return t('stats.labels.math', 'Maths');
      case 'Sciences & Technologie':
        return t('stats.labels.sc', 'Sciences');
      case 'Anglais':
        return t('stats.labels.en', 'Anglais');
      default:
        return cours;
    }
  };

  return (
    <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('dashboards.enseignantTitle')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('dashboards.enseignantSubtitle')}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value={isLoading ? '...' : String(stats?.assignedClasses || 0)} label={t('dashboards.assignedClasses')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
          <KPICard value={isLoading ? '...' : String(stats?.studentsConcerned || 0)} label={t('dashboards.studentsConcerned')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
          <KPICard value={isLoading ? '...' : String(stats?.plannedEvals || 0)} label={t('dashboards.plannedEvals')} icon={<ClipboardList className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="24h" label={t('dashboards.weeklyVolume')} icon={<Clock className="w-5 h-5 text-digi-purple" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schedule Preview */}
          <Card className="shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-digi-purple" />
              {t('dashboards.weeklySchedule')}
            </h3>
            <ScheduleGrid
              isEn={isEn}
              entries={[
                { jour: 'Lundi', heureDebut: '07:30', heureFin: '08:15', cours: isEn ? 'French' : 'Français', salle: 'CM1 A' },
                { jour: 'Lundi', heureDebut: '08:15', heureFin: '09:00', cours: isEn ? 'Mathematics' : 'Mathématiques', salle: 'CM1 A' },
                { jour: 'Mardi', heureDebut: '07:30', heureFin: '08:15', cours: isEn ? 'French' : 'Français', salle: 'CE2 A' },
                { jour: 'Mardi', heureDebut: '08:15', heureFin: '09:00', cours: isEn ? 'Science & Technology' : 'Sciences & Technologie', salle: 'CE2 A' },
                { jour: 'Mercredi', heureDebut: '07:30', heureFin: '08:15', cours: isEn ? 'Mathematics' : 'Mathématiques', salle: 'CM2 A' },
                { jour: 'Jeudi', heureDebut: '07:30', heureFin: '08:15', cours: isEn ? 'French' : 'Français', salle: 'CM1 A' },
                { jour: 'Vendredi', heureDebut: '07:30', heureFin: '08:15', cours: isEn ? 'Mathematics' : 'Mathématiques', salle: 'CE2 A' },
              ]}
            />
          </Card>

          {/* Upcoming Evaluations */}
          <Card className="shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-digi-purple" />
              {t('dashboards.upcomingEvals')}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 font-bold text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left">{t('dashboards.course')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboards.class')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboards.date')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboards.type')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                  {upcomingEvals.map((e: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">{getTranslatedCourse(e.cours)}</td>
                      <td className="px-4 py-3">{e.classe}</td>
                      <td className="px-4 py-3">{e.date}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-digi-purple-bg text-digi-purple">
                          {e.type.replace('Séquence', isEn ? 'Sequence' : 'Séquence')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
  );
};
export default DashboardEnseignant;
