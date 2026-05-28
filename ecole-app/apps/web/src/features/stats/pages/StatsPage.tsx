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
            style={{
              height: `${(d.value / max) * 100}%`,
              backgroundColor: d.color,
            }}
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
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const circumference = 2 * Math.PI * radius;
          const segmentLength = (seg.value / total) * circumference;
          const offset = (cumulative / total) * circumference;
          cumulative += seg.value;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              className="transition-all duration-500"
            />
          );
        })}
        <text x={size / 2} y={size / 2} textAnchor="middle" dy="0.35em" className="text-lg font-bold fill-slate-700">
          {total}
        </text>
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

export const StatsPage: React.FC = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState('2025-2026');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('stats.title')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('stats.subtitle')}</p>
        </div>
        <FilterDropdown label={t('stats.year')} value={period} options={['2025-2026', '2024-2025', '2023-2024']} onChange={setPeriod} />
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value="450" label={t('stats.enrolled')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="24" label={t('stats.staff')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="7.2/10" label={t('stats.generalAvg')} icon={<TrendingUp className="w-5 h-5 text-digi-success" />} />
        <KPICard value="78%" label={t('stats.recoveryRate')} icon={<CreditCard className="w-5 h-5 text-digi-purple" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Effectifs par classe */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-digi-purple" />
            {t('stats.enrollmentByClass')}
          </h3>
          <BarChartSimple
            data={[
              { label: 'SIL', value: 45, color: '#534AB7' },
              { label: 'CP', value: 42, color: '#7F77DD' },
              { label: 'CE1', value: 38, color: '#AFA9EC' },
              { label: 'CE2', value: 35, color: '#534AB7' },
              { label: 'CM1', value: 32, color: '#7F77DD' },
              { label: 'CM2', value: 30, color: '#AFA9EC' },
              { label: 'Cl.1', value: 40, color: '#10B981' },
              { label: 'Cl.2', value: 38, color: '#059669' },
              { label: 'Cl.3', value: 35, color: '#10B981' },
              { label: 'Cl.4', value: 32, color: '#059669' },
              { label: 'Cl.5', value: 28, color: '#10B981' },
              { label: 'Cl.6', value: 25, color: '#059669' },
            ]}
          />
        </Card>

        {/* Répartition garçons/filles */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-digi-purple" />
            {t('stats.genderDistribution')}
          </h3>
          <div className="flex justify-center">
            <DonutChart
              segments={[
                { label: t('stats.boys'), value: 248, color: '#534AB7' },
                { label: t('stats.girls'), value: 202, color: '#AFA9EC' },
              ]}
            />
          </div>
        </Card>

        {/* Moyennes par matière */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-digi-purple" />
            {t('stats.avgBySubject')}
          </h3>
          <BarChartSimple
            maxVal={10}
            data={[
              { label: 'Maths', value: 6.8, color: '#534AB7' },
              { label: 'Français', value: 7.2, color: '#10B981' },
              { label: 'Anglais', value: 7.8, color: '#F59E0B' },
              { label: 'Sciences', value: 6.1, color: '#EF4444' },
              { label: 'Éd. Civique', value: 7.5, color: '#7F77DD' },
              { label: 'Hist-Géo', value: 6.9, color: '#AFA9EC' },
            ]}
          />
        </Card>

        {/* Statut des paiements */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-digi-purple" />
            {t('stats.paymentStatus')}
          </h3>
          <div className="flex justify-center">
            <DonutChart
              segments={[
                { label: t('payments.complete'), value: 285, color: '#10B981' },
                { label: t('payments.partial'), value: 105, color: '#F59E0B' },
                { label: t('payments.unpaid'), value: 60, color: '#EF4444' },
              ]}
            />
          </div>
        </Card>
      </div>

      {/* Results Summary Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-digi-purple" />
          {t('stats.resultsSummary')}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">{t('stats.class')}</th>
                <th className="px-4 py-3 text-center">{t('stats.enrollment')}</th>
                <th className="px-4 py-3 text-center">{t('stats.average')}</th>
                <th className="px-4 py-3 text-center">{t('stats.successRate')}</th>
                <th className="px-4 py-3 text-center">{t('stats.admitted')}</th>
                <th className="px-4 py-3 text-center">{t('stats.rejected')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {[
                { classe: 'SIL A', effectif: 45, moyenne: 7.5, reussite: 88, admis: 40, refuses: 5 },
                { classe: 'CP A', effectif: 42, moyenne: 7.1, reussite: 80, admis: 34, refuses: 8 },
                { classe: 'CE1 A', effectif: 38, moyenne: 6.8, reussite: 76, admis: 29, refuses: 9 },
                { classe: 'CE2 A', effectif: 35, moyenne: 7.3, reussite: 81, admis: 28, refuses: 7 },
                { classe: 'CM1 A', effectif: 32, moyenne: 6.5, reussite: 70, admis: 22, refuses: 10 },
                { classe: 'CM2 A', effectif: 30, moyenne: 7.4, reussite: 82, admis: 25, refuses: 5 },
                { classe: 'Class 1 A', effectif: 40, moyenne: 7.2, reussite: 85, admis: 34, refuses: 6 },
                { classe: 'Class 6 A', effectif: 25, moyenne: 7.0, reussite: 78, admis: 20, refuses: 5 },
              ].map((row) => (
                <tr key={row.classe} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold">{row.classe}</td>
                  <td className="px-4 py-3 text-center">{row.effectif}</td>
                  <td className="px-4 py-3 text-center font-bold text-digi-purple">{row.moyenne}</td>
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
    </div>
  );
};
export default StatsPage;
