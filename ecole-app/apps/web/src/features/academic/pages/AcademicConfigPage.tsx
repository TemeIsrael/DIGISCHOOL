import React, { useState } from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { BookOpen, Layers, Home, GraduationCap, Calendar, Settings, FilePlus, Pencil, Trash2 } from 'lucide-react';

/* ──── Mock Data ──── */
const cycles = [
  { id: 1, libelle: 'Premier Cycle', classes: 4 },
  { id: 2, libelle: 'Second Cycle', classes: 3 },
];

const classes = [
  { id: 1, cycle: 'Premier Cycle', libelle: '6ème', salles: 2 },
  { id: 2, cycle: 'Premier Cycle', libelle: '5ème', salles: 2 },
  { id: 3, cycle: 'Premier Cycle', libelle: '4ème', salles: 1 },
  { id: 4, cycle: 'Premier Cycle', libelle: '3ème', salles: 1 },
  { id: 5, cycle: 'Second Cycle', libelle: '2nde', salles: 2 },
  { id: 6, cycle: 'Second Cycle', libelle: '1ère', salles: 1 },
  { id: 7, cycle: 'Second Cycle', libelle: 'Tle', salles: 1 },
];

const salles = [
  { id: 1, classe: '6ème', libelle: '6ème A', surface: '45m²', position: 'Bât. A - RDC' },
  { id: 2, classe: '6ème', libelle: '6ème B', surface: '40m²', position: 'Bât. A - 1er' },
  { id: 3, classe: '5ème', libelle: '5ème A', surface: '42m²', position: 'Bât. B - RDC' },
  { id: 4, classe: '5ème', libelle: '5ème B', surface: '38m²', position: 'Bât. B - 1er' },
  { id: 5, classe: '4ème', libelle: '4ème C', surface: '50m²', position: 'Bât. C - RDC' },
  { id: 6, classe: '3ème', libelle: '3ème A', surface: '48m²', position: 'Bât. C - 1er' },
];

const annees = [
  { id: 1, libelle: '2025-2026', courante: true },
  { id: 2, libelle: '2024-2025', courante: false },
];

type Tab = 'cycles' | 'classes' | 'salles' | 'annees';

export const AcademicConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('cycles');

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'cycles', label: 'Cycles', icon: <Layers className="w-4 h-4" /> },
    { key: 'classes', label: 'Classes', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'salles', label: 'Salles', icon: <Home className="w-4 h-4" /> },
    { key: 'annees', label: 'Années Académiques', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Configuration Académique</h1>
          <p className="text-sm text-slate-400 font-semibold">Gestion des cycles, classes, salles et années scolaires</p>
        </div>
        <Button className="gap-2">
          <FilePlus className="w-4 h-4" />
          Ajouter
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={String(cycles.length)} label="Cycles" icon={<Layers className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(classes.length)} label="Classes" icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(salles.length)} label="Salles" icon={<Home className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="2025-2026" label="Année Courante" icon={<Calendar className="w-5 h-5 text-digi-purple" />} />
      </div>

      {/* Tab Navigation */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-1 border-b border-slate-100 -mx-6 -mt-5 px-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
                activeTab === t.key
                  ? 'border-digi-purple text-digi-purple'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'cycles' && (
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Libellé</th>
                  <th className="px-4 py-3 text-center">Nb Classes</th>
                  <th className="px-4 py-3 text-right">Actions</th>
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
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Cycle</th>
                  <th className="px-4 py-3 text-left">Libellé</th>
                  <th className="px-4 py-3 text-center">Nb Salles</th>
                  <th className="px-4 py-3 text-right">Actions</th>
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
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Classe</th>
                  <th className="px-4 py-3 text-left">Libellé</th>
                  <th className="px-4 py-3 text-left">Surface</th>
                  <th className="px-4 py-3 text-left">Position</th>
                  <th className="px-4 py-3 text-right">Actions</th>
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
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Libellé</th>
                  <th className="px-4 py-3 text-center">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {annees.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{a.id}</td>
                    <td className="px-4 py-3 font-semibold">{a.libelle}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${a.courante ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {a.courante ? 'Courante' : 'Archivée'}
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
