import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { BulletinPreview } from '../../shared/components/business/BulletinPreview';
import { GraduationCap, CreditCard, Bell, TrendingUp } from 'lucide-react';
import { exportPDF } from '../../shared/utils/export';

const recentGrades = [
  { cours: 'Français', note: 8, max: 10, date: '20/05/2026' },
  { cours: 'Mathématiques', note: 7, max: 10, date: '18/05/2026' },
  { cours: 'Anglais', note: 9, max: 10, date: '15/05/2026' },
  { cours: 'Sciences & Technologie', note: 6, max: 10, date: '14/05/2026' },
];

const alerts = [
  { messageKey: 'dashboards.meetingAlert', type: 'info' as const },
  { messageKey: 'dashboards.pendingPaymentAlert', type: 'warning' as const },
  { messageKey: 'dashboards.reportCardAlert', type: 'success' as const },
];

const childrenData = [
  {
    id: '1',
    name: 'DUPONT Jean',
    classe: 'CM1 A',
    moyenne: 7.4,
    rang: 5,
    effectif: 32,
    matieres: [
      { nom: 'Français', note: 8, coefficient: 3 },
      { nom: 'Mathématiques', note: 7, coefficient: 3 },
      { nom: 'Anglais', note: 9, coefficient: 1 },
      { nom: 'Sciences & Technologie', note: 6, coefficient: 2 },
    ]
  },
  {
    id: '2',
    name: 'DUPONT Marie',
    classe: 'CE1 B',
    moyenne: 8.2,
    rang: 2,
    effectif: 28,
    matieres: [
      { nom: 'Français', note: 9, coefficient: 3 },
      { nom: 'Mathématiques', note: 8, coefficient: 3 },
      { nom: 'Anglais', note: 7, coefficient: 1 },
      { nom: 'Éducation Civique', note: 9, coefficient: 2 },
    ]
  }
];

export const DashboardParent: React.FC = () => {

  const { t, i18n } = useTranslation();
  const [selectedChildId, setSelectedChildId] = useState(childrenData[0].id);

  const selectedChild = childrenData.find(c => c.id === selectedChildId) || childrenData[0];

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t('dashboards.parentTitle')}</h1>
            <p className="text-sm text-slate-400 font-semibold">{t('dashboards.parentSubtitle')}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500 uppercase">{i18n.language?.startsWith('en') ? 'Select Child:' : 'Enfant:'}</span>
            <select
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-digi-purple/20 focus:border-digi-purple outline-none shadow-sm"
            >
              {childrenData.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.classe})</option>
              ))}
            </select>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value={selectedChild.moyenne.toString()} label={t('stats.generalAvg')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
          <KPICard value={selectedChild.classe} label={t('dashboards.currentClass')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="2/3" label={t('dashboards.paidTrimesters')} icon={<CreditCard className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="3" label={t('dashboards.notifications')} icon={<Bell className="w-5 h-5 text-digi-purple" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Grades */}
          <Card className="shadow-sm border border-slate-100 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-digi-purple" />
              {t('dashboards.recentGrades')}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 font-bold text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left">{t('dashboards.subject')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboards.grade')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboards.outOf')}</th>
                    <th className="px-4 py-3 text-left">{t('dashboards.date')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                  {recentGrades.map((g, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold">{getTranslatedCourse(g.cours)}</td>
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
              {t('dashboards.alerts')}
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
                  {t(a.messageKey)}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bulletin Preview */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
            {t('dashboards.reportCardPreview')}
          </h3>
          <BulletinPreview
            eleve={selectedChild.name}
            classe={selectedChild.classe}
            trimestre="Trimestre 2"
            moyenne={selectedChild.moyenne}
            rang={selectedChild.rang}
            effectif={selectedChild.effectif}
            matieres={selectedChild.matieres}
            onDownload={() => exportPDF([
              { eleve: selectedChild.name, classe: selectedChild.classe, trimestre: "Trimestre 2", moyenne: selectedChild.moyenne, rang: selectedChild.rang }
            ], `bulletin_${selectedChild.name.replace(/\s+/g, '_')}_Trimestre_2`)}
          />
        </Card>
      </div>
  );
};
export default DashboardParent;
