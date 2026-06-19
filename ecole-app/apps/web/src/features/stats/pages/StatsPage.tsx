import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { BarChart3, TrendingUp, Users, GraduationCap, CreditCard, PieChart } from 'lucide-react';

/* ──── Simple SVG chart helpers ──── */
const BarChartSimple: React.FC<{ data: { label: string; value: number; color: string }[]; maxVal?: number }> = ({ data, maxVal }) => {
  const max = maxVal || Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-3 h-48">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div
            className="w-full rounded-t-lg transition-all duration-500 min-h-[4px]"
            style={{ height: `${(d.value / max) * 100}%`, backgroundColor: d.color }}
          />
          <span className="text-xs font-bold mt-2 text-slate-600">{d.value}</span>
          <span className="text-xs text-slate-400 mt-1 truncate max-w-full">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const DonutChart: React.FC<{ segments: { label: string; value: number; color: string }[] }> = ({ segments }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;
  const size = 140;
  const radius = 55;
  const strokeWidth = 20;
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        {segments.map((seg, i) => {
          const circumference = 2 * Math.PI * radius;
          const segmentLength = (seg.value / total) * circumference;
          const offset = (cumulative / total) * circumference;
          cumulative += seg.value;
          return (
            <circle
              key={i}
              cx={size / 2} cy={size / 2} r={radius}
              fill="none" stroke={seg.color} strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              className="transition-all duration-500"
            />
          );
        })}
        <text x={size / 2} y={size / 2} textAnchor="middle" dy="0.35em" className="text-lg font-bold fill-slate-700">{total}</text>
      </svg>
      <div className="space-y-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-slate-600">{seg.label}</span>
            <span className="font-bold text-slate-800 ml-auto">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ──── Data ──── */
const dataFrancophone = {
  kpis: { enrolled: '450', staff: '14', average: '6.8', recovery: '78%' },
  classSizes: [
    { label: 'SIL', value: 68, color: '#534AB7' },
    { label: 'CP', value: 72, color: '#7F77DD' },
    { label: 'CE1', value: 65, color: '#AFA9EC' },
    { label: 'CE2', value: 58, color: '#534AB7' },
    { label: 'CM1', value: 52, color: '#7F77DD' },
    { label: 'CM2', value: 48, color: '#AFA9EC' },
    { label: 'PS', value: 30, color: '#D4D0F9' },
  ],
  gender: [
    { label: 'Garçons', value: 248, color: '#534AB7' },
    { label: 'Filles', value: 202, color: '#AFA9EC' },
  ],
  subjects: [
    { label: 'Français', value: 7.1, color: '#534AB7' },
    { label: 'Maths', value: 6.6, color: '#10B981' },
    { label: 'Sciences', value: 7.3, color: '#F59E0B' },
    { label: 'Anglais', value: 7.8, color: '#7F77DD' },
    { label: 'E.Civique', value: 8.2, color: '#AFA9EC' },
    { label: 'Histoire', value: 6.9, color: '#EF4444' },
  ],
  payments: [
    { label: 'Complet', value: 285, color: '#10B981' },
    { label: 'Partiel', value: 105, color: '#F59E0B' },
    { label: 'Non payé', value: 60, color: '#EF4444' },
  ],
  results: [
    { classe: 'SIL A', effectif: 35, moyenne: 7.1, reussite: 88, admis: 31, refuses: 4 },
    { classe: 'SIL B', effectif: 33, moyenne: 6.5, reussite: 80, admis: 26, refuses: 7 },
    { classe: 'CP A', effectif: 36, moyenne: 6.8, reussite: 76, admis: 27, refuses: 9 },
    { classe: 'CP B', effectif: 36, moyenne: 7.2, reussite: 83, admis: 30, refuses: 6 },
    { classe: 'CE1 A', effectif: 33, moyenne: 6.9, reussite: 79, admis: 26, refuses: 7 },
    { classe: 'CE2 A', effectif: 30, moyenne: 7.4, reussite: 87, admis: 26, refuses: 4 },
    { classe: 'CM1 A', effectif: 28, moyenne: 7.0, reussite: 82, admis: 23, refuses: 5 },
    { classe: 'CM2 A', effectif: 32, moyenne: 6.6, reussite: 75, admis: 24, refuses: 8 },
  ],
  exam: {
    title: 'Statistiques CEP — Examen CM2',
    subtitle: 'Certificat d\'Études Primaires — Historique des résultats',
    kpis: [
      { value: '93.7%', label: 'Taux de réussite 2025', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', sub: 'text-emerald-600' },
      { value: '30/32', label: 'Admis / Présentés', bg: 'bg-digi-purple/10 border-digi-purple/20', text: 'text-digi-purple', sub: 'text-digi-purple' },
      { value: '7.8/10', label: 'Moyenne 2025', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', sub: 'text-amber-600' },
      { value: '3ème', label: 'Rang Départemental', bg: 'bg-sky-50 border-sky-200', text: 'text-sky-700', sub: 'text-sky-600' },
    ],
    history: [
      { annee: '2024-2025', inscrits: 32, presentes: 32, admis: 30, taux: 93.7, moy: 7.8, best: 9.6 },
      { annee: '2023-2024', inscrits: 28, presentes: 28, admis: 25, taux: 89.3, moy: 7.2, best: 9.4 },
      { annee: '2022-2023', inscrits: 30, presentes: 29, admis: 27, taux: 93.1, moy: 7.5, best: 9.8 },
    ],
  },
};

const dataAnglophone = {
  kpis: { enrolled: '210', staff: '8', average: '68%', recovery: '81%' },
  classSizes: [
    { label: 'Nursery', value: 25, color: '#059669' },
    { label: 'Class 1', value: 38, color: '#10B981' },
    { label: 'Class 2', value: 35, color: '#34D399' },
    { label: 'Class 3', value: 32, color: '#6EE7B7' },
    { label: 'Class 4', value: 30, color: '#059669' },
    { label: 'Class 5', value: 28, color: '#10B981' },
    { label: 'Class 6', value: 22, color: '#34D399' },
  ],
  gender: [
    { label: 'Boys', value: 112, color: '#059669' },
    { label: 'Girls', value: 98, color: '#6EE7B7' },
  ],
  subjects: [
    { label: 'English', value: 72, color: '#059669' },
    { label: 'Maths', value: 68, color: '#10B981' },
    { label: 'Science', value: 74, color: '#F59E0B' },
    { label: 'French', value: 61, color: '#34D399' },
    { label: 'Civics', value: 79, color: '#6EE7B7' },
    { label: 'History', value: 65, color: '#EF4444' },
  ],
  payments: [
    { label: 'Full', value: 148, color: '#10B981' },
    { label: 'Partial', value: 42, color: '#F59E0B' },
    { label: 'Unpaid', value: 20, color: '#EF4444' },
  ],
  results: [
    { classe: 'Class 1', effectif: 38, moyenne: 72, reussite: 90, admis: 34, refuses: 4 },
    { classe: 'Class 2', effectif: 35, moyenne: 69, reussite: 83, admis: 29, refuses: 6 },
    { classe: 'Class 3', effectif: 32, moyenne: 71, reussite: 84, admis: 27, refuses: 5 },
    { classe: 'Class 4', effectif: 30, moyenne: 68, reussite: 80, admis: 24, refuses: 6 },
    { classe: 'Class 5', effectif: 28, moyenne: 73, reussite: 89, admis: 25, refuses: 3 },
    { classe: 'Class 6', effectif: 22, moyenne: 70, reussite: 86, admis: 19, refuses: 3 },
  ],
  exam: {
    title: 'Common Entrance Exam — Class Six',
    subtitle: 'First School Leaving Certificate (FSLC) — Historical Results',
    kpis: [
      { value: '86.4%', label: 'Success Rate 2025', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', sub: 'text-emerald-600' },
      { value: '19/22', label: 'Passed / Presented', bg: 'bg-digi-purple/10 border-digi-purple/20', text: 'text-digi-purple', sub: 'text-digi-purple' },
      { value: '70/100', label: 'Average 2025', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', sub: 'text-amber-600' },
      { value: '5th', label: 'Divisional Ranking', bg: 'bg-sky-50 border-sky-200', text: 'text-sky-700', sub: 'text-sky-600' },
    ],
    history: [
      { annee: '2024-2025', inscrits: 22, presentes: 22, admis: 19, taux: 86.4, moy: 70, best: 94 },
      { annee: '2023-2024', inscrits: 20, presentes: 20, admis: 16, taux: 80.0, moy: 66, best: 91 },
      { annee: '2022-2023', inscrits: 18, presentes: 18, admis: 16, taux: 88.9, moy: 69, best: 95 },
    ],
  },
};

export const StatsPage: React.FC = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState('2025-2026');
  const [selectedSection, setSelectedSection] = useState('Francophone');

  const data = selectedSection === 'Francophone' ? dataFrancophone : dataAnglophone;
  const isEn = selectedSection === 'Anglophone';
  const noteLabel = isEn ? '/100' : '/10';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('stats.title')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('stats.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <FilterDropdown
            label="Section"
            value={selectedSection}
            options={['Francophone', 'Anglophone']}
            onChange={setSelectedSection}
          />
          <FilterDropdown label={t('stats.year')} value={period} options={['2025-2026', '2024-2025', '2023-2024']} onChange={setPeriod} />
        </div>
      </div>

      {/* Section Badge */}
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isEn ? 'bg-emerald-100 text-emerald-700' : 'bg-digi-purple/10 text-digi-purple'}`}>
          {selectedSection}
        </span>
        <span className="text-sm text-slate-500 font-medium">— Année {period}</span>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard value={data.kpis.enrolled} label={t('stats.kpis.enrolled')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={data.kpis.staff} label={t('stats.kpis.staff')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={data.kpis.average} label={isEn ? 'Average Score' : t('stats.kpis.average')} icon={<TrendingUp className="w-5 h-5 text-digi-success" />} />
        <KPICard value={data.kpis.recovery} label={t('stats.kpis.recovery')} icon={<CreditCard className="w-5 h-5 text-digi-purple" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Effectifs par classe */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-digi-purple" />
            {t('stats.sections.classSize')}
          </h3>
          <BarChartSimple data={data.classSizes} />
        </Card>

        {/* Répartition garçons/filles */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-digi-purple" />
            {t('stats.sections.gender')}
          </h3>
          <div className="flex justify-center">
            <DonutChart segments={data.gender} />
          </div>
        </Card>

        {/* Moyennes par matière */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-digi-purple" />
            {t('stats.sections.subjects')}
          </h3>
          <BarChartSimple maxVal={isEn ? 100 : 10} data={data.subjects} />
        </Card>

        {/* Statut des paiements */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-digi-purple" />
            {t('stats.sections.payments')}
          </h3>
          <div className="flex justify-center">
            <DonutChart segments={data.payments} />
          </div>
        </Card>
      </div>

      {/* Results Summary Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-digi-purple" />
          {t('stats.sections.resultsSummary')}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">{isEn ? 'Class' : t('stats.table.class')}</th>
                <th className="px-4 py-3 text-center">{t('stats.table.size')}</th>
                <th className="px-4 py-3 text-center">{isEn ? 'Average (%)' : t('stats.table.average')}</th>
                <th className="px-4 py-3 text-center">{t('stats.table.success')}</th>
                <th className="px-4 py-3 text-center">{isEn ? 'Passed' : t('stats.table.passed')}</th>
                <th className="px-4 py-3 text-center">{isEn ? 'Failed' : t('stats.table.failed')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {data.results.map((row) => (
                <tr key={row.classe} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold">{row.classe}</td>
                  <td className="px-4 py-3 text-center">{row.effectif}</td>
                  <td className="px-4 py-3 text-center font-bold text-digi-purple">{row.moyenne}{isEn ? '%' : ''}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold ${row.reussite >= 80 ? 'text-digi-success' : row.reussite >= 70 ? 'text-digi-warning' : 'text-digi-danger'}`}>
                      {row.reussite}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-digi-success font-bold">{row.admis}</td>
                  <td className="px-4 py-3 text-center text-digi-danger font-bold">{row.refuses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Examen de fin de cycle */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-digi-purple" />
          {data.exam.title}
        </h3>
        <p className="text-xs text-slate-400 font-semibold mb-6">{data.exam.subtitle}</p>

        {/* Exam KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {data.exam.kpis.map((kpi, i) => (
            <div key={i} className={`${kpi.bg} border rounded-xl p-4 text-center`}>
              <p className={`text-2xl font-extrabold ${kpi.text}`}>{kpi.value}</p>
              <p className={`text-xs font-bold ${kpi.sub} uppercase tracking-wider mt-1`}>{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Exam History */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">{isEn ? 'Year' : t('stats.table.year')}</th>
                <th className="px-4 py-3 text-center">{isEn ? 'Registered' : t('stats.table.registered')}</th>
                <th className="px-4 py-3 text-center">{isEn ? 'Presented' : t('stats.table.presented')}</th>
                <th className="px-4 py-3 text-center">{isEn ? 'Passed' : t('stats.table.passed')}</th>
                <th className="px-4 py-3 text-center">{isEn ? 'Success Rate' : t('stats.table.successRate')}</th>
                <th className="px-4 py-3 text-center">{isEn ? 'Average' : t('stats.table.average')}</th>
                <th className="px-4 py-3 text-center">{isEn ? 'Best Score' : t('stats.table.bestGrade')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {data.exam.history.map((row) => (
                <tr key={row.annee} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold">{row.annee}</td>
                  <td className="px-4 py-3 text-center">{row.inscrits}</td>
                  <td className="px-4 py-3 text-center">{row.presentes}</td>
                  <td className="px-4 py-3 text-center font-bold text-digi-success">{row.admis}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold ${row.taux >= 90 ? 'text-digi-success' : row.taux >= 80 ? 'text-digi-warning' : 'text-digi-danger'}`}>
                      {row.taux}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-digi-purple">{row.moy}{noteLabel}</td>
                  <td className="px-4 py-3 text-center font-bold text-emerald-600">{row.best}{noteLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default StatsPage;
