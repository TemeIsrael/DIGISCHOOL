import React from 'react';
import { useTranslation } from 'react-i18next';
import { TopnavLayout } from '../../shared/components/layout/TopnavLayout';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { BulletinPreview } from '../../shared/components/business/BulletinPreview';
import { GraduationCap, CreditCard, Bell, TrendingUp } from 'lucide-react';

const recentGrades = [
  { cours: 'Mathématiques', note: 8, max: 10, date: '20/05/2026' },
  { cours: 'Français', note: 7, max: 10, date: '18/05/2026' },
  { cours: 'Anglais', note: 9, max: 10, date: '15/05/2026' },
  { cours: 'Sciences & Technologie', note: 6, max: 10, date: '14/05/2026' },
];

const alerts = [
  { message: 'Réunion parents-professeurs le 05/06/2026 à 14h', type: 'info' as const },
  { message: 'Paiement Trimestre 3 en attente — Échéance: 30/05/2026', type: 'warning' as const },
  { message: 'Bulletin Trimestre 2 disponible au téléchargement', type: 'success' as const },
];

export const DashboardParent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <TopnavLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('dashboard.parent')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('dashboard.subtitleParent')}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value="7.5/10" label={t('dashboard.generalAverage')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="CM1 A" label={t('dashboard.currentClass')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="2/3" label={t('dashboard.trimestersPaid')} icon={<CreditCard className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="3" label={t('dashboard.notifications')} icon={<Bell className="w-5 h-5 text-digi-purple" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Grades */}
          <Card className="shadow-sm border border-slate-100 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-digi-purple" />
              {t('dashboard.recentGrades')}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 font-bold text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left">{t('dashboard.subject')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboard.grade')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboard.scale')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboard.date')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                  {recentGrades.map((g, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">{g.cours}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${g.note >= 7 ? 'text-digi-success' : g.note >= 5 ? 'text-digi-warning' : 'text-digi-danger'}`}>
                          {g.note}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">/{g.max}</td>
                      <td className="px-4 py-3">{g.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-digi-purple" />
              {t('dashboard.alerts')}
            </h3>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border text-sm font-medium ${
                    a.type === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : a.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-blue-50 border-blue-200 text-blue-700'
                  }`}
                >
                  {a.message}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bulletin Preview */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
            {t('dashboard.bulletinPreviewTitle')}
          </h3>
          <BulletinPreview
            eleve="NGUEMA Jean"
            classe="CM1 A"
            trimestre="Trimestre 2"
            moyenne={7.5}
            rang={5}
            effectif={32}
            matieres={[
              { nom: 'Mathématiques', note: 8, coefficient: 4 },
              { nom: 'Français', note: 7, coefficient: 3 },
              { nom: 'Anglais', note: 9, coefficient: 2 },
              { nom: 'Sciences & Technologie', note: 6, coefficient: 3 },
            ]}
          />
        </Card>
      </div>
    </TopnavLayout>
  );
};
export default DashboardParent;
