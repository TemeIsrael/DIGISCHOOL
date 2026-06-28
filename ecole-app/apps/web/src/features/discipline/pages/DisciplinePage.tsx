import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { Modal } from '../../../shared/components/ui/Modal';
import { ShieldCheck, AlertTriangle, FilePlus, Search, Eye, UserX } from 'lucide-react';

type Incident = {
  id: number;
  date: string;
  eleve: string;
  classe: string;
  type: string;
  gravite: string;
  description: string;
  description: string;
  sanction: string;
  points: number;
};

const graviteColors: Record<string, string> = {
  // FR keys
  Mineur: 'bg-blue-50 text-blue-700',
  Moyen: 'bg-amber-50 text-amber-700',
  Majeur: 'bg-red-50 text-red-700',
  // EN keys
  Minor: 'bg-blue-50 text-blue-700',
  Moderate: 'bg-amber-50 text-amber-700',
  Major: 'bg-red-50 text-red-700',
};

export const DisciplinePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  const getInitialIncidents = (): Incident[] => isEn ? [
    { id: 1, date: '24/05/2026', eleve: 'TAMBA Isaac',  classe: 'Class 5', type: 'Late arrival', gravite: 'Minor',    description: 'Arrived 15 min late without a pass',          sanction: 'Verbal warning', points: -2 },
    { id: 2, date: '23/05/2026', eleve: 'NGONO Marie',  classe: 'Class 4', type: 'Fighting',     gravite: 'Major',    description: 'Physical altercation in the playground',      sanction: '2-day suspension', points: -20 },
    { id: 3, date: '22/05/2026', eleve: 'DUPONT Jean',  classe: 'Class 5', type: 'Talking',      gravite: 'Minor',    description: 'Persistent talking despite reminders',        sanction: 'Text copy assignment', points: -3 },
    { id: 4, date: '20/05/2026', eleve: 'BELLA Sarah',  classe: 'Class 5', type: 'Absence',      gravite: 'Minor',    description: 'Unjustified absence — 2 days',                sanction: 'Parent summoning', points: -5 },
    { id: 5, date: '18/05/2026', eleve: 'FOUDA Pierre', classe: 'Class 3', type: 'Disobedience', gravite: 'Moderate', description: 'Refused to follow the class teacher instructions', sanction: 'Written warning', points: -10 },
  ] : [
    { id: 1, date: '24/05/2026', eleve: 'TAMBA Isaac',  classe: 'CM2 A',  type: 'Retard',      gravite: 'Mineur', description: 'Arrivé 15 min en retard sans justificatif',        sanction: 'Avertissement oral', points: -2 },
    { id: 2, date: '23/05/2026', eleve: 'NGONO Marie',  classe: 'CE2 A',  type: 'Bagarre',     gravite: 'Majeur', description: 'Altercation physique dans la cour de récréation',  sanction: "2 jours d'exclusion", points: -20 },
    { id: 3, date: '22/05/2026', eleve: 'DUPONT Jean',  classe: 'CM1 A',  type: 'Bavardage',   gravite: 'Mineur', description: 'Bavardage persistant en classe malgré rappels',    sanction: 'Copie de texte', points: -3 },
    { id: 4, date: '20/05/2026', eleve: 'BELLA Sarah',  classe: 'CM1 A',  type: 'Absence',     gravite: 'Mineur', description: 'Absence non justifiée — 2 jours',                  sanction: 'Convocation des parents', points: -5 },
    { id: 5, date: '18/05/2026', eleve: 'FOUDA Pierre', classe: 'CE1 A',  type: 'Indiscipline',gravite: 'Moyen', description: "Refus d'obéir au maître de classe",               sanction: 'Avertissement écrit', points: -10 },
  ];

  const severities = isEn
    ? ['Minor', 'Moderate', 'Major']
    : ['Mineur', 'Moyen', 'Majeur'];

  const types = isEn
    ? ['Late arrival', 'Absence', 'Fighting', 'Talking', 'Disobedience']
    : ['Retard', 'Absence', 'Bagarre', 'Bavardage', 'Indiscipline'];

  const [filterGravite, setFilterGravite] = useState('');
  const [filterType,    setFilterType]    = useState('');
  const [search,        setSearch]        = useState('');
  const [isModalOpen,   setIsModalOpen]   = useState(false);
  const [newEntry, setNewEntry] = useState({ date: '', eleve: '', classe: '', type: types[0], gravite: severities[0], description: '', sanction: '', points: -2 });
  const [incidents, setIncidents] = useState<Incident[]>(getInitialIncidents);

  const filtered = incidents.filter((inc) => {
    const matchGravite  = !filterGravite || inc.gravite === filterGravite;
    const matchType     = !filterType    || inc.type === filterType;
    const matchSearch   = inc.eleve.toLowerCase().includes(search.toLowerCase());
    return matchGravite && matchType && matchSearch;
  });

  const inputCls = 'w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-digi-purple outline-none transition-all';
  const labelCls = 'block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('discipline.title', 'Gestion Disciplinaire')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('discipline.subtitle', 'Suivi des incidents et sanctions')}</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <FilePlus className="w-4 h-4" />
          {t('discipline.newIncident', 'Nouvel Incident')}
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={String(incidents.length)} label={t('discipline.totalIncidents', 'Total Incidents')} icon={<AlertTriangle className="w-5 h-5 text-digi-warning" />} />
        <KPICard value={String(incidents.filter(i => i.gravite === (isEn ? 'Major' : 'Majeur')).length)} label={t('discipline.major', 'Incidents Majeurs')} icon={<ShieldCheck className="w-5 h-5 text-digi-danger" />} />
        <KPICard value={String(incidents.filter(i => i.gravite === (isEn ? 'Minor' : 'Mineur')).length)} label={t('discipline.minor', 'Incidents Mineurs')} icon={<Eye className="w-5 h-5 text-digi-success" />} />
        <KPICard value="1" label={t('discipline.exclusions', 'Exclusions en Cours')} icon={<UserX className="w-5 h-5 text-digi-danger" />} />
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={t('discipline.search', 'Rechercher un élève...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown
            label={t('discipline.severity', 'Gravité')}
            value={filterGravite}
            options={[{ value: '', label: t('common.all', 'Tous') }, ...severities.map(s => ({ value: s, label: s }))]}
            onChange={setFilterGravite}
          />
          <FilterDropdown
            label={t('discipline.type', 'Type')}
            value={filterType}
            options={[{ value: '', label: t('common.all', 'Tous') }, ...types.map(tp => ({ value: tp, label: tp }))]}
            onChange={setFilterType}
          />
        </div>
      </Card>

      {/* Add Incident Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('discipline.newIncident', 'Nouvel Incident')} size="md">
        <form className="space-y-4" onSubmit={e => {
          e.preventDefault();
          if (!newEntry.eleve) return;
          const newId = incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1;
          const newIncident = { id: newId, ...newEntry, date: newEntry.date || new Date().toLocaleDateString(isEn ? 'en-GB' : 'fr-FR') };
          setIncidents([...incidents, newIncident]);
          setIsModalOpen(false);
          setNewEntry({ date: '', eleve: '', classe: '', type: types[0], gravite: severities[0], description: '', sanction: '', points: -2 });
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{t('common.date', 'Date')}</label>
              <input className={inputCls} type="date" value={newEntry.date} onChange={e => setNewEntry({ ...newEntry, date: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>{t('discipline.student', 'Élève')}</label>
              <input className={inputCls} placeholder={t('discipline.studentName', "Nom de l'élève")} value={newEntry.eleve} onChange={e => setNewEntry({ ...newEntry, eleve: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>{t('discipline.class', 'Classe')}</label>
              <input className={inputCls} placeholder="Ex: CM1 A" value={newEntry.classe} onChange={e => setNewEntry({ ...newEntry, classe: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>{t('discipline.type', 'Type')}</label>
              <select className={`${inputCls} bg-white`} value={newEntry.type} onChange={e => setNewEntry({ ...newEntry, type: e.target.value })}>
                {types.map(tp => <option key={tp} value={tp}>{tp}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{t('discipline.severity', 'Gravité')}</label>
              <select className={`${inputCls} bg-white`} value={newEntry.gravite} onChange={e => setNewEntry({ ...newEntry, gravite: e.target.value })}>
                {severities.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{t('discipline.sanction', 'Sanction')}</label>
              <input className={inputCls} placeholder={t('discipline.sanctionPlaceholder', 'Ex: Avertissement')} value={newEntry.sanction} onChange={e => setNewEntry({ ...newEntry, sanction: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>{t('discipline.points', 'Points retirés')}</label>
              <input type="number" className={inputCls} placeholder="-2" value={newEntry.points} onChange={e => setNewEntry({ ...newEntry, points: Number(e.target.value) })} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>{t('discipline.description', 'Description')}</label>
              <textarea className={inputCls} placeholder={t('discipline.descriptionPlaceholder', "Détails de l'incident...")} value={newEntry.description} onChange={e => setNewEntry({ ...newEntry, description: e.target.value })} rows={3} />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4 border-t border-slate-100 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>{t('common.cancel', 'Annuler')}</Button>
            <Button type="submit" variant="primary">{t('common.save', 'Enregistrer')}</Button>
          </div>
        </form>
      </Modal>

      {/* Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">{t('common.date', 'Date')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.student', 'Élève')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.class', 'Classe')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.type', 'Type')}</th>
                <th className="px-4 py-3 text-center">{t('discipline.severity', 'Gravité')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.description', 'Description')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.sanction', 'Sanction')}</th>
                <th className="px-4 py-3 text-center">{t('discipline.points', 'Points')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {filtered.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">{inc.date}</td>
                  <td className="px-4 py-3 font-semibold">{inc.eleve}</td>
                  <td className="px-4 py-3">{inc.classe}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-digi-purple-bg text-digi-purple">{inc.type}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${graviteColors[inc.gravite] ?? 'bg-slate-100 text-slate-600'}`}>{inc.gravite}</span>
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate" title={inc.description}>{inc.description}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-500">{inc.sanction}</td>
                  <td className="px-4 py-3 text-center font-bold text-digi-danger">{inc.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default DisciplinePage;
