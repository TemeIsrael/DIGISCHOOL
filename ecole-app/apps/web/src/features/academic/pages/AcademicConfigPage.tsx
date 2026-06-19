import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Layers, Home, GraduationCap, Calendar, FilePlus, Trash2, Globe } from 'lucide-react';
import { Modal } from '../../../shared/components/ui/Modal';
import { useToast } from '../../../shared/components/ui/Toast';

/* ──── Mock Data — École Primaire (MINEDUB Cameroun) ──── */
const mockCycles = [
  { id: 1, libelle: 'Maternel / Nursery', classes: 5 },
  { id: 2, libelle: 'Primaire / Primary',  classes: 15 },
];

const mockClasses = [
  { id: 1,  cycle: 'Maternel / Nursery', libelle: 'Petite Section',  salles: 1, section: 'FRANCOPHONE' as const },
  { id: 2,  cycle: 'Maternel / Nursery', libelle: 'Moyenne Section', salles: 1, section: 'FRANCOPHONE' as const },
  { id: 3,  cycle: 'Maternel / Nursery', libelle: 'Grande Section',  salles: 1, section: 'FRANCOPHONE' as const },
  { id: 4,  cycle: 'Primaire / Primary', libelle: 'SIL',  salles: 2, section: 'FRANCOPHONE' as const },
  { id: 5,  cycle: 'Primaire / Primary', libelle: 'CP',   salles: 2, section: 'FRANCOPHONE' as const },
  { id: 6,  cycle: 'Primaire / Primary', libelle: 'CE1',  salles: 2, section: 'FRANCOPHONE' as const },
  { id: 7,  cycle: 'Primaire / Primary', libelle: 'CE2',  salles: 1, section: 'FRANCOPHONE' as const },
  { id: 8,  cycle: 'Primaire / Primary', libelle: 'CM1',  salles: 1, section: 'FRANCOPHONE' as const },
  { id: 9,  cycle: 'Primaire / Primary', libelle: 'CM2',  salles: 1, section: 'FRANCOPHONE' as const },
  { id: 10, cycle: 'Maternel / Nursery', libelle: 'Nursery 1', salles: 1, section: 'ANGLOPHONE' as const },
  { id: 11, cycle: 'Maternel / Nursery', libelle: 'Nursery 2', salles: 1, section: 'ANGLOPHONE' as const },
  { id: 12, cycle: 'Primaire / Primary', libelle: 'Class 1', salles: 1, section: 'ANGLOPHONE' as const },
  { id: 13, cycle: 'Primaire / Primary', libelle: 'Class 2', salles: 1, section: 'ANGLOPHONE' as const },
  { id: 14, cycle: 'Primaire / Primary', libelle: 'Class 3', salles: 1, section: 'ANGLOPHONE' as const },
  { id: 15, cycle: 'Primaire / Primary', libelle: 'Class 4', salles: 1, section: 'ANGLOPHONE' as const },
  { id: 16, cycle: 'Primaire / Primary', libelle: 'Class 5', salles: 1, section: 'ANGLOPHONE' as const },
  { id: 17, cycle: 'Primaire / Primary', libelle: 'Class 6', salles: 1, section: 'ANGLOPHONE' as const },
];

const mockSalles = [
  { id: 1, classe: 'SIL',     libelle: 'SIL A',   surface: '40m²', position: 'Bât. A — RDC' },
  { id: 2, classe: 'SIL',     libelle: 'SIL B',   surface: '38m²', position: 'Bât. A — RDC' },
  { id: 3, classe: 'CP',      libelle: 'CP A',    surface: '42m²', position: 'Bât. A — 1er' },
  { id: 4, classe: 'CP',      libelle: 'CP B',    surface: '40m²', position: 'Bât. A — 1er' },
  { id: 5, classe: 'CE1',     libelle: 'CE1 A',   surface: '45m²', position: 'Bât. B — RDC' },
  { id: 6, classe: 'CE1',     libelle: 'CE1 B',   surface: '42m²', position: 'Bât. B — RDC' },
  { id: 7, classe: 'CE2',     libelle: 'CE2 A',   surface: '44m²', position: 'Bât. B — 1er' },
  { id: 8, classe: 'CM1',     libelle: 'CM1 A',   surface: '48m²', position: 'Bât. C — RDC' },
  { id: 9, classe: 'CM2',     libelle: 'CM2 A',   surface: '50m²', position: 'Bât. C — 1er' },
  { id: 10, classe: 'Class 1', libelle: 'Class 1', surface: '40m²', position: 'Block D — GF' },
  { id: 11, classe: 'Class 2', libelle: 'Class 2', surface: '40m²', position: 'Block D — GF' },
  { id: 12, classe: 'Class 3', libelle: 'Class 3', surface: '42m²', position: 'Block D — 1F' },
  { id: 13, classe: 'Class 4', libelle: 'Class 4', surface: '42m²', position: 'Block D — 1F' },
  { id: 14, classe: 'Class 5', libelle: 'Class 5', surface: '45m²', position: 'Block E — GF' },
  { id: 15, classe: 'Class 6', libelle: 'Class 6', surface: '48m²', position: 'Block E — 1F' },
];

const mockAnnees = [
  { id: 1, libelle: '2025-2026', courante: true },
  { id: 2, libelle: '2024-2025', courante: false },
];

type Tab = 'cycles' | 'classes' | 'salles' | 'annees';

export const AcademicConfigPage: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('cycles');
  const [sectionFilter, setSectionFilter] = useState<'ALL' | 'FRANCOPHONE' | 'ANGLOPHONE'>('ALL');

  const [cyclesList,  setCyclesList]  = useState(mockCycles);
  const [classesList, setClassesList] = useState(mockClasses);
  const [sallesList,  setSallesList]  = useState(mockSalles);
  const [anneesList,  setAnneesList]  = useState(mockAnnees);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [cycleForm, setCycleForm] = useState({ libelle: '', classes: 0 });
  const [classForm, setClassForm] = useState({ cycle: 'Primaire / Primary', libelle: '', salles: 0, section: 'FRANCOPHONE' as 'FRANCOPHONE' | 'ANGLOPHONE' });
  const [salleForm, setSalleForm] = useState({ classe: '', libelle: '', surface: '', position: '' });
  const [anneeForm, setAnneeForm] = useState({ libelle: '', courante: false });

  const filteredClasses = sectionFilter === 'ALL' ? classesList : classesList.filter(c => c.section === sectionFilter);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'cycles',  label: t('academic.cycles',  'Cycles'),           icon: <Layers        className="w-4 h-4" /> },
    { key: 'classes', label: t('academic.classes', 'Classes'),          icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'salles',  label: t('academic.rooms',   'Salles'),           icon: <Home          className="w-4 h-4" /> },
    { key: 'annees',  label: t('academic.years',   'Années Scolaires'), icon: <Calendar      className="w-4 h-4" /> },
  ];

  const modalTitle = {
    cycles:  t('academic.addCycle',  'Ajouter un Cycle'),
    classes: t('academic.addClass',  'Ajouter une Classe'),
    salles:  t('academic.addRoom',   'Ajouter une Salle'),
    annees:  t('academic.addYear',   'Ajouter une Année Scolaire'),
  }[activeTab];

  const handleAddSubmit = () => {
    if (activeTab === 'cycles') {
      if (!cycleForm.libelle) return;
      setCyclesList(prev => [...prev, { id: Date.now(), libelle: cycleForm.libelle, classes: Number(cycleForm.classes) }]);
      setCycleForm({ libelle: '', classes: 0 });
      toast({ type: 'success', title: t('common.success', 'Succès'), description: t('academic.cycleAdded', 'Le cycle a été ajouté.') });
    } else if (activeTab === 'classes') {
      if (!classForm.libelle) return;
      setClassesList(prev => [...prev, { id: Date.now(), cycle: classForm.cycle, libelle: classForm.libelle, salles: Number(classForm.salles), section: classForm.section }]);
      setClassForm({ cycle: 'Primaire / Primary', libelle: '', salles: 0, section: 'FRANCOPHONE' });
      toast({ type: 'success', title: t('common.success', 'Succès'), description: t('academic.classAdded', 'La classe a été ajoutée.') });
    } else if (activeTab === 'salles') {
      if (!salleForm.libelle || !salleForm.classe) return;
      setSallesList(prev => [...prev, { id: Date.now(), classe: salleForm.classe, libelle: salleForm.libelle, surface: salleForm.surface || '35m²', position: salleForm.position || 'Bâtiment Principal' }]);
      setSalleForm({ classe: '', libelle: '', surface: '', position: '' });
      toast({ type: 'success', title: t('common.success', 'Succès'), description: t('academic.roomAdded', 'La salle a été ajoutée.') });
    } else if (activeTab === 'annees') {
      if (!anneeForm.libelle) return;
      const isCourante = anneeForm.courante;
      const updatedList = isCourante ? anneesList.map(a => ({ ...a, courante: false })) : anneesList;
      setAnneesList([...updatedList, { id: Date.now(), libelle: anneeForm.libelle, courante: isCourante }]);
      setAnneeForm({ libelle: '', courante: false });
      toast({ type: 'success', title: t('common.success', 'Succès'), description: t('academic.yearAdded', "L'année scolaire a été ajoutée.") });
    }
    setAddModalOpen(false);
  };

  const handleDeleteItem = (id: number, type: Tab) => {
    const desc = { cycles: t('academic.cycleRemoved', 'Le cycle a été retiré.'), classes: t('academic.classRemoved', 'La classe a été retirée.'), salles: t('academic.roomRemoved', 'La salle a été retirée.'), annees: '' };
    if (type === 'cycles')  setCyclesList(prev  => prev.filter(c => c.id !== id));
    if (type === 'classes') setClassesList(prev => prev.filter(c => c.id !== id));
    if (type === 'salles')  setSallesList(prev  => prev.filter(s => s.id !== id));
    if (desc[type]) toast({ type: 'success', title: t('common.delete', 'Suppression'), description: desc[type] });
  };

  const inputCls = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all';
  const labelCls = 'block text-xs font-bold text-slate-600 uppercase mb-1';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('academic.title', 'Configuration Académique')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('academic.subtitle', 'Gestion des cycles, classes, salles et années scolaires')}</p>
        </div>
        <Button onClick={() => setAddModalOpen(true)} className="gap-2">
          <FilePlus className="w-4 h-4" />
          {t('academic.add', 'Ajouter')}
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard value={String(cyclesList.length)}  label={t('academic.cycles',  'Cycles')}         icon={<Layers        className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(classesList.length)} label={t('academic.classes', 'Classes')}        icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(sallesList.length)}  label={t('academic.rooms',   'Salles')}         icon={<Home          className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={anneesList.find(a => a.courante)?.libelle || 'N/A'} label={t('academic.currentYear', 'Année Courante')} icon={<Calendar className="w-5 h-5 text-digi-purple" />} />
      </div>

      {/* Tab Navigation */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center gap-1 border-b border-slate-100 -mx-6 -mt-5 px-6 overflow-x-auto whitespace-nowrap scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all shrink-0 ${
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

        <div className="mt-6 overflow-x-auto">
          {/* ─── Cycles ─── */}
          {activeTab === 'cycles' && (
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">{t('academic.label', 'Libellé')}</th>
                  <th className="px-4 py-3 text-center">{t('academic.classCount', 'Nb Classes')}</th>
                  <th className="px-4 py-3 text-right">{t('common.actions', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {cyclesList.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{c.id}</td>
                    <td className="px-4 py-3 font-semibold">{c.libelle}</td>
                    <td className="px-4 py-3 text-center">{c.classes}</td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors" onClick={() => handleDeleteItem(c.id, 'cycles')}><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ─── Classes ─── */}
          {activeTab === 'classes' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase">{t('academic.section', 'Section')} :</span>
                {(['ALL', 'FRANCOPHONE', 'ANGLOPHONE'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSectionFilter(s)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      sectionFilter === s
                        ? s === 'ANGLOPHONE'
                          ? 'bg-blue-100 text-blue-700'
                          : s === 'FRANCOPHONE'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-digi-purple-bg text-digi-purple'
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    {s === 'ALL' ? t('common.all', 'Toutes') : s === 'FRANCOPHONE' ? '🇫🇷 Francophone' : '🇬🇧 Anglophone'}
                  </button>
                ))}
              </div>
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 font-bold text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">{t('academic.cycle', 'Cycle')}</th>
                    <th className="px-4 py-3 text-left">{t('academic.label', 'Libellé')}</th>
                    <th className="px-4 py-3 text-center">{t('academic.section', 'Section')}</th>
                    <th className="px-4 py-3 text-center">{t('academic.roomCount', 'Nb Salles')}</th>
                    <th className="px-4 py-3 text-right">{t('common.actions', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                  {filteredClasses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">{c.id}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-bold bg-digi-purple-bg text-digi-purple">{c.cycle}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold">{c.libelle}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${c.section === 'ANGLOPHONE' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                          {c.section === 'ANGLOPHONE' ? '🇬🇧 Anglophone' : '🇫🇷 Francophone'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">{c.salles}</td>
                      <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors" onClick={() => handleDeleteItem(c.id, 'classes')}><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ─── Salles ─── */}
          {activeTab === 'salles' && (
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">{t('academic.class', 'Classe')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.label', 'Libellé')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.surface', 'Surface')}</th>
                  <th className="px-4 py-3 text-left">{t('academic.position', 'Position')}</th>
                  <th className="px-4 py-3 text-right">{t('common.actions', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {sallesList.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{s.id}</td>
                    <td className="px-4 py-3">{s.classe}</td>
                    <td className="px-4 py-3 font-semibold">{s.libelle}</td>
                    <td className="px-4 py-3">{s.surface}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{s.position}</td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors" onClick={() => handleDeleteItem(s.id, 'salles')}><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ─── Années ─── */}
          {activeTab === 'annees' && (
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">{t('academic.label', 'Libellé')}</th>
                  <th className="px-4 py-3 text-center">{t('common.status', 'Statut')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {anneesList.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{a.id}</td>
                    <td className="px-4 py-3 font-semibold">{a.libelle}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${a.courante ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {a.courante ? t('academic.current', 'Courante') : t('academic.archived', 'Archivée')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* ─── Dynamic Add Modal ─── */}
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title={modalTitle}>
        <div className="space-y-4">
          {activeTab === 'cycles' && (
            <>
              <div>
                <label className={labelCls}>{t('academic.cycleName', 'Nom du Cycle')} *</label>
                <input type="text" placeholder="ex: Cycle Master" value={cycleForm.libelle} onChange={(e) => setCycleForm({ ...cycleForm, libelle: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{t('academic.classCount', 'Nombre de Classes')}</label>
                <input type="number" value={cycleForm.classes} onChange={(e) => setCycleForm({ ...cycleForm, classes: Number(e.target.value) })} className={inputCls} />
              </div>
            </>
          )}

          {activeTab === 'classes' && (
            <>
              <div>
                <label className={labelCls}>{t('academic.cycle', 'Cycle')}</label>
                <select value={classForm.cycle} onChange={(e) => setClassForm({ ...classForm, cycle: e.target.value })} className={`${inputCls} bg-white`}>
                  <option value="Maternel / Nursery">Maternel / Nursery</option>
                  <option value="Primaire / Primary">Primaire / Primary</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>{t('academic.className', 'Libellé de la Classe')} *</label>
                <input type="text" placeholder="ex: CE3 / Class 7" value={classForm.libelle} onChange={(e) => setClassForm({ ...classForm, libelle: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{t('academic.section', 'Section')}</label>
                <select value={classForm.section} onChange={(e) => setClassForm({ ...classForm, section: e.target.value as any })} className={`${inputCls} bg-white`}>
                  <option value="FRANCOPHONE">🇫🇷 Francophone</option>
                  <option value="ANGLOPHONE">🇬🇧 Anglophone</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>{t('academic.roomCount', 'Nombre de Salles')}</label>
                <input type="number" value={classForm.salles} onChange={(e) => setClassForm({ ...classForm, salles: Number(e.target.value) })} className={inputCls} />
              </div>
            </>
          )}

          {activeTab === 'salles' && (
            <>
              <div>
                <label className={labelCls}>{t('academic.linkedClass', 'Classe de Rattachement')} *</label>
                <input type="text" placeholder="ex: SIL / Class 1" value={salleForm.classe} onChange={(e) => setSalleForm({ ...salleForm, classe: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{t('academic.roomLabel', 'Libellé de la Salle')} *</label>
                <input type="text" placeholder="ex: SIL C" value={salleForm.libelle} onChange={(e) => setSalleForm({ ...salleForm, libelle: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{t('academic.surface', 'Surface (m²)')}</label>
                <input type="text" placeholder="ex: 45m²" value={salleForm.surface} onChange={(e) => setSalleForm({ ...salleForm, surface: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{t('academic.position', 'Position / Localisation')}</label>
                <input type="text" placeholder="ex: Bâtiment A — RDC" value={salleForm.position} onChange={(e) => setSalleForm({ ...salleForm, position: e.target.value })} className={inputCls} />
              </div>
            </>
          )}

          {activeTab === 'annees' && (
            <>
              <div>
                <label className={labelCls}>{t('academic.yearLabel', 'Libellé de l\'Année')} *</label>
                <input type="text" placeholder="ex: 2026-2027" value={anneeForm.libelle} onChange={(e) => setAnneeForm({ ...anneeForm, libelle: e.target.value })} className={inputCls} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="courante" checked={anneeForm.courante} onChange={(e) => setAnneeForm({ ...anneeForm, courante: e.target.checked })} className="rounded text-digi-purple focus:ring-digi-purple" />
                <label htmlFor="courante" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">{t('academic.setAsCurrent', 'Définir comme année courante')}</label>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setAddModalOpen(false)}>{t('common.cancel', 'Annuler')}</Button>
            <Button onClick={handleAddSubmit}>{t('common.save', 'Enregistrer')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AcademicConfigPage;
