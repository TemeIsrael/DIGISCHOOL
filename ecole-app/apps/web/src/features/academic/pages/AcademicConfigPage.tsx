import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Layers, Home, GraduationCap, Calendar, FilePlus, Pencil, Trash2 } from 'lucide-react';

/* ──── Mock Data ──── */
const cycles = [
  { id: 1, libelle: 'Cycle 1 — Francophone (SIL, CP)', classes: 4, section: 'FR' },
  { id: 2, libelle: 'Cycle 2 — Francophone (CE1, CE2)', classes: 4, section: 'FR' },
  { id: 3, libelle: 'Cycle 3 — Francophone (CM1, CM2)', classes: 4, section: 'FR' },
  { id: 4, libelle: 'Level 1 — Anglophone (Class 1, 2)', classes: 4, section: 'EN' },
  { id: 5, libelle: 'Level 2 — Anglophone (Class 3, 4)', classes: 4, section: 'EN' },
  { id: 6, libelle: 'Level 3 — Anglophone (Class 5, 6)', classes: 4, section: 'EN' },
];

const classes = [
  { id: 1, cycle: 'Cycle 1 — FR', libelle: 'SIL', salles: 2, section: 'FR' },
  { id: 2, cycle: 'Cycle 1 — FR', libelle: 'CP', salles: 2, section: 'FR' },
  { id: 3, cycle: 'Cycle 2 — FR', libelle: 'CE1', salles: 1, section: 'FR' },
  { id: 4, cycle: 'Cycle 2 — FR', libelle: 'CE2', salles: 1, section: 'FR' },
  { id: 5, cycle: 'Cycle 3 — FR', libelle: 'CM1', salles: 2, section: 'FR' },
  { id: 6, cycle: 'Cycle 3 — FR', libelle: 'CM2', salles: 1, section: 'FR' },
  { id: 7, cycle: 'Level 1 — EN', libelle: 'Class 1', salles: 2, section: 'EN' },
  { id: 8, cycle: 'Level 1 — EN', libelle: 'Class 2', salles: 1, section: 'EN' },
  { id: 9, cycle: 'Level 2 — EN', libelle: 'Class 3', salles: 1, section: 'EN' },
  { id: 10, cycle: 'Level 2 — EN', libelle: 'Class 4', salles: 1, section: 'EN' },
  { id: 11, cycle: 'Level 3 — EN', libelle: 'Class 5', salles: 1, section: 'EN' },
  { id: 12, cycle: 'Level 3 — EN', libelle: 'Class 6', salles: 1, section: 'EN' },
];

const salles = [
  { id: 1, classe: 'SIL', libelle: 'SIL A', surface: '45m²', position: 'Bât. A - RDC' },
  { id: 2, classe: 'SIL', libelle: 'SIL B', surface: '40m²', position: 'Bât. A - 1er' },
  { id: 3, classe: 'CP', libelle: 'CP A', surface: '42m²', position: 'Bât. B - RDC' },
  { id: 4, classe: 'CE1', libelle: 'CE1 A', surface: '38m²', position: 'Bât. B - 1er' },
  { id: 5, classe: 'CM2', libelle: 'CM2 A', surface: '50m²', position: 'Bât. C - RDC' },
  { id: 6, classe: 'Class 1', libelle: 'Class 1 A', surface: '48m²', position: 'Bât. D - RDC' },
];

const annees = [
  { id: 1, libelle: '2025-2026', courante: true },
  { id: 2, libelle: '2024-2025', courante: false },
];

type Tab = 'cycles' | 'classes' | 'salles' | 'annees';

export const AcademicConfigPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('cycles');

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'cycles', label: t('academic.cycles'), icon: <Layers className="w-4 h-4" /> },
    { key: 'classes', label: t('academic.classes'), icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'salles', label: t('academic.rooms'), icon: <Home className="w-4 h-4" /> },
    { key: 'annees', label: t('academic.years'), icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('academic.title')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('academic.subtitle')}</p>
        </div>
        <Button className="gap-2">
          <FilePlus className="w-4 h-4" />
          {t('academic.add')}
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={String(cycles.length)} label={t('academic.cycles')} icon={<Layers className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(classes.length)} label={t('academic.classes')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(salles.length)} label={t('academic.rooms')} icon={<Home className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="2025-2026" label={t('academic.currentYear')} icon={<Calendar className="w-5 h-5 text-digi-purple" />} />
      </div>

      {/* Tab Navigation */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-1 border-b border-slate-100 -mx-6 -mt-5 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-digi-purple text-digi-purple'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'cycles' && (
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">{t('academic.id')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.label')}</th>
                  <th className="px-4 py-3 text-center">{t('academic.nbClasses')}</th>
                  <th className="px-4 py-3 text-right">{t('academic.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {cycles.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{c.id}</td>
                    <td className="px-4 py-3 font-semibold">{c.libelle}</td>
                    <td className="px-4 py-3 text-center">{c.classes}</td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-digi-purple transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'classes' && (
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">{t('academic.id')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.cycle')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.label')}</th>
                  <th className="px-4 py-3 text-center">{t('academic.nbRooms')}</th>
                  <th className="px-4 py-3 text-right">{t('academic.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {classes.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{c.id}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-bold bg-digi-purple-bg text-digi-purple">{c.cycle}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold">{c.libelle}</td>
                    <td className="px-4 py-3 text-center">{c.salles}</td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-digi-purple transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'salles' && (
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">{t('academic.id')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.classes')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.label')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.surface')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.position')}</th>
                  <th className="px-4 py-3 text-right">{t('academic.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {salles.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{s.id}</td>
                    <td className="px-4 py-3">{s.classe}</td>
                    <td className="px-4 py-3 font-semibold">{s.libelle}</td>
                    <td className="px-4 py-3">{s.surface}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{s.position}</td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-digi-purple transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'annees' && (
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">{t('academic.id')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.label')}</th>
                  <th className="px-4 py-3 text-center">{t('academic.status')}</th>
                  <th className="px-4 py-3 text-right">{t('academic.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {annees.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{a.id}</td>
                    <td className="px-4 py-3 font-semibold">{a.libelle}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${a.courante ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {a.courante ? t('academic.current') : t('academic.archived')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-digi-purple transition-colors"><Pencil className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};
export default AcademicConfigPage;
