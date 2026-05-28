import React from 'react';
import { useTranslation } from 'react-i18next';
import { TopnavLayout } from '../../shared/components/layout/TopnavLayout';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { ScheduleGrid } from '../../shared/components/business/ScheduleGrid';
import { BookOpen, Users, ClipboardList, Clock } from 'lucide-react';

const upcomingEvals = [
  { cours: 'Mathématiques', classe: 'CM2 A', date: '28/05/2026', type: 'Devoir' },
  { cours: 'Français', classe: 'CE2 A', date: '30/05/2026', type: 'Examen' },
  { cours: 'Sciences & Technologie', classe: 'CM1 A', date: '02/06/2026', type: 'Interrogation' },
];

export const DashboardEnseignant: React.FC = () => {
  const { t } = useTranslation();

  return (
    <TopnavLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('dashboard.enseignant')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('dashboard.subtitleEnseignant')}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value="3" label={t('dashboard.assignedCourses')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="127" label={t('dashboard.concernedStudents')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="5" label={t('dashboard.plannedEvaluations')} icon={<ClipboardList className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="18h" label={t('dashboard.weeklyVolume')} icon={<Clock className="w-5 h-5 text-digi-purple" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schedule Preview */}
          <Card className="shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-digi-purple" />
              {t('dashboard.weekSchedule')}
            </h3>
            <ScheduleGrid
              entries={[
                { jour: 'Lundi', heureDebut: '08:00', heureFin: '10:00', cours: 'Mathématiques', salle: 'CM2 A' },
                { jour: 'Lundi', heureDebut: '10:15', heureFin: '12:15', cours: 'Français', salle: 'CE2 A' },
                { jour: 'Mardi', heureDebut: '08:00', heureFin: '10:00', cours: 'Sciences & Technologie', salle: 'CM1 A' },
                { jour: 'Mercredi', heureDebut: '14:00', heureFin: '16:00', cours: 'Éducation Civique', salle: 'CP A' },
                { jour: 'Jeudi', heureDebut: '08:00', heureFin: '10:00', cours: 'Mathématiques', salle: 'CM2 A' },
                { jour: 'Vendredi', heureDebut: '10:15', heureFin: '12:15', cours: 'Français', salle: 'CE2 A' },
              ]}
            />
          </Card>

          {/* Upcoming Evaluations */}
          <Card className="shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-digi-purple" />
              {t('dashboard.upcomingEvaluations')}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 font-bold text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left">{t('dashboard.course')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboard.class')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboard.date')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboard.type')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                  {upcomingEvals.map((e, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">{e.cours}</td>
                      <td className="px-4 py-3">{e.classe}</td>
                      <td className="px-4 py-3">{e.date}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-digi-purple-bg text-digi-purple">
                          {e.type}
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
    </TopnavLayout>
  );
};
export default DashboardEnseignant;
