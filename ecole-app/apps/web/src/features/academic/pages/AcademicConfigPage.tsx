import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Layers, Home, GraduationCap, Calendar, FilePlus, Trash2, Globe } from 'lucide-react';
import { Modal } from '../../../shared/components/ui/Modal';
import { useToast } from '../../../shared/components/ui/Toast';
import { useAcademicConfig } from '../hooks/useAcademicConfig';

type Tab = 'cycles' | 'classes' | 'salles' | 'annees';

export const AcademicConfigPage: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('cycles');
  const [sectionFilter, setSectionFilter] = useState<'ALL' | 'FRANCOPHONE' | 'ANGLOPHONE'>('ALL');

  const {
    cycles: cyclesList,
    classes: classesList,
    salles: sallesList,
    years: anneesList,
    createCycle,
    createClass,
    createSalle,
    createYear
  } = useAcademicConfig();

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [cycleForm, setCycleForm] = useState({ libelle: '' });
  const [classForm, setClassForm] = useState({ idCycle: '', libelle: '', section: 'FRANCOPHONE' as 'FRANCOPHONE' | 'ANGLOPHONE' });
  const [salleForm, setSalleForm] = useState({ idClasse: '', libelle: '', surface: '', position: '' });
  const [anneeForm, setAnneeForm] = useState({ libelle: '', courante: false });

  const filteredClasses = sectionFilter === 'ALL' ? classesList : classesList.filter((c: any) => c.section === sectionFilter);

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

  const handleAddSubmit = async () => {
    try {
      if (activeTab === 'cycles') {
        if (!cycleForm.libelle) return;
        await createCycle({ libelle: cycleForm.libelle });
        setCycleForm({ libelle: '' });
        toast({ type: 'success', title: t('common.success', 'Succès'), description: t('academic.cycleAdded', 'Le cycle a été ajouté.') });
      } else if (activeTab === 'classes') {
        if (!classForm.libelle || !classForm.idCycle) return;
        await createClass({ idCycle: Number(classForm.idCycle), libelle: classForm.libelle, section: classForm.section });
        setClassForm({ idCycle: '', libelle: '', section: 'FRANCOPHONE' });
        toast({ type: 'success', title: t('common.success', 'Succès'), description: t('academic.classAdded', 'La classe a été ajoutée.') });
      } else if (activeTab === 'salles') {
        if (!salleForm.libelle || !salleForm.idClasse) return;
        await createSalle({ idClasse: Number(salleForm.idClasse), libelle: salleForm.libelle, surface: salleForm.surface || '35m²', position: salleForm.position || 'Bâtiment Principal' });
        setSalleForm({ idClasse: '', libelle: '', surface: '', position: '' });
        toast({ type: 'success', title: t('common.success', 'Succès'), description: t('academic.roomAdded', 'La salle a été ajoutée.') });
      } else if (activeTab === 'annees') {
        if (!anneeForm.libelle) return;
        await createYear({ libelle: anneeForm.libelle, courante: anneeForm.courante });
        setAnneeForm({ libelle: '', courante: false });
        toast({ type: 'success', title: t('common.success', 'Succès'), description: t('academic.yearAdded', "L'année scolaire a été ajoutée.") });
      }
      setAddModalOpen(false);
    } catch (err: any) {
      toast({ type: 'danger', title: 'Erreur', description: err.response?.data?.error?.message || 'Une erreur est survenue' });
    }
  };

  const handleDeleteItem = (id: number, type: Tab) => {
    toast({ type: 'danger', title: 'Non implémenté', description: "La suppression n'est pas encore disponible via l'API." });
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
        <KPICard value={anneesList.find((a: any) => a.courante)?.libelle || 'N/A'} label={t('academic.currentYear', 'Année Courante')} icon={<Calendar className="w-5 h-5 text-digi-purple" />} />
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
                  <th className="px-4 py-3 text-right">{t('common.actions', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {cyclesList.map((c: any) => (
                  <tr key={c.idCycle} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{c.idCycle}</td>
                    <td className="px-4 py-3 font-semibold">{c.libelle}</td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors" onClick={() => handleDeleteItem(c.idCycle, 'cycles')}><Trash2 className="w-4 h-4" /></button>
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
                    <th className="px-4 py-3 text-right">{t('common.actions', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                  {filteredClasses.map((c: any) => (
                    <tr key={c.idClasse} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">{c.idClasse}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-bold bg-digi-purple-bg text-digi-purple">{c.cycle?.libelle || '-'}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold">{c.libelle}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${c.section === 'ANGLOPHONE' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                          {c.section === 'ANGLOPHONE' ? '🇬🇧 Anglophone' : '🇫🇷 Francophone'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors" onClick={() => handleDeleteItem(c.idClasse, 'classes')}><Trash2 className="w-4 h-4" /></button>
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
                {sallesList.map((s: any) => (
                  <tr key={s.idSalle} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{s.idSalle}</td>
                    <td className="px-4 py-3">{s.classe?.libelle || '-'}</td>
                    <td className="px-4 py-3 font-semibold">{s.libelle}</td>
                    <td className="px-4 py-3">{s.surface}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{s.position}</td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors" onClick={() => handleDeleteItem(s.idSalle, 'salles')}><Trash2 className="w-4 h-4" /></button>
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
                {anneesList.map((a: any) => (
                  <tr key={a.idAca} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">{a.idAca}</td>
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
                <input type="text" placeholder="ex: Primaire" value={cycleForm.libelle} onChange={(e) => setCycleForm({ ...cycleForm, libelle: e.target.value })} className={inputCls} />
              </div>
            </>
          )}

          {activeTab === 'classes' && (
            <>
              <div>
                <label className={labelCls}>{t('academic.cycle', 'Cycle')} *</label>
                <select value={classForm.idCycle} onChange={(e) => setClassForm({ ...classForm, idCycle: e.target.value })} className={`${inputCls} bg-white`}>
                  <option value="">-- Sélectionner --</option>
                  {cyclesList.map((c: any) => (
                    <option key={c.idCycle} value={c.idCycle}>{c.libelle}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>{t('academic.className', 'Libellé de la Classe')} *</label>
                <input type="text" placeholder="ex: CM2" value={classForm.libelle} onChange={(e) => setClassForm({ ...classForm, libelle: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{t('academic.section', 'Section')} *</label>
                <select value={classForm.section} onChange={(e) => setClassForm({ ...classForm, section: e.target.value as any })} className={`${inputCls} bg-white`}>
                  <option value="FRANCOPHONE">🇫🇷 Francophone</option>
                  <option value="ANGLOPHONE">🇬🇧 Anglophone</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'salles' && (
            <>
              <div>
                <label className={labelCls}>{t('academic.linkedClass', 'Classe de Rattachement')} *</label>
                <select value={salleForm.idClasse} onChange={(e) => setSalleForm({ ...salleForm, idClasse: e.target.value })} className={`${inputCls} bg-white`}>
                  <option value="">-- Sélectionner --</option>
                  {classesList.map((c: any) => (
                    <option key={c.idClasse} value={c.idClasse}>{c.libelle}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>{t('academic.roomLabel', 'Libellé de la Salle')} *</label>
                <input type="text" placeholder="ex: CM2 A" value={salleForm.libelle} onChange={(e) => setSalleForm({ ...salleForm, libelle: e.target.value })} className={inputCls} />
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
