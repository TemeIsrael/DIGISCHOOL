import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Users, BookOpen, Clock, CheckCircle } from 'lucide-react';

const mockTeachers = [
  { nom: 'M. NKOULOU', matiere: 'Mathématiques', heures: 18, classes: 5, tauxSaisie: 100 },
  { nom: 'Mme FOUDA', matiere: 'Français', heures: 20, classes: 5, tauxSaisie: 90 },
  { nom: 'M. BROWN', matiere: 'Anglais', heures: 16, classes: 5, tauxSaisie: 80 },
  { nom: 'Mme BELLA', matiere: 'Sciences & Technologie', heures: 14, classes: 12, tauxSaisie: 100 },
  { nom: 'M. ESSOMBA', matiere: 'Éducation Civique', heures: 12, classes: 12, tauxSaisie: 60 },
];

const TeacherOverviewPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.teacherOverview')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.teacherOverviewDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="24" label={t('directeur.totalTeachers')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="15" label={t('directeur.totalSubjects')} icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="80h" label={t('directeur.weeklyHours')} icon={<Clock className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="86%" label={t('directeur.gradeEntryRate')} icon={<CheckCircle className="w-5 h-5 text-digi-purple" />} />
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('directeur.teacher')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.subject')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.hours')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.classes')}</th>
                <th className="px-6 py-3 text-left">{t('directeur.gradeEntry')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockTeachers.map((tc) => (
                <tr key={tc.nom} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold">{tc.nom}</td>
                  <td className="px-6 py-3">{tc.matiere}</td>
                  <td className="px-6 py-3">{tc.heures}h</td>
                  <td className="px-6 py-3">{tc.classes}</td>
                  <td className="px-6 py-3"><span className={`font-bold ${tc.tauxSaisie === 100 ? 'text-emerald-600' : tc.tauxSaisie >= 80 ? 'text-amber-600' : 'text-red-600'}`}>{tc.tauxSaisie}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default TeacherOverviewPage;
