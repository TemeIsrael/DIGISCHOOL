import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { KPICard } from '../../../shared/components/ui/KPICard';
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
  sanction: string;
};

const graviteColors: Record<string, string> = {
  Mineur: 'bg-blue-50 text-blue-700',
  Moyen: 'bg-amber-50 text-amber-700',
  Majeur: 'bg-red-50 text-red-700',
  Minor: 'bg-blue-50 text-blue-700',
  Moderate: 'bg-amber-50 text-amber-700',
  Major: 'bg-red-50 text-red-700',
};

export const TeacherDisciplinePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const initialIncidents: Incident[] = isEn ? [
    { id: 1, date: '24/05/2026', eleve: 'TAMBA Isaac',  classe: 'CM2 A', type: 'Late arrival',  gravite: 'Minor',    description: 'Arrived 15 min late without a pass',                sanction: 'Verbal warning'       },
    { id: 2, date: '22/05/2026', eleve: 'DUPONT Jean',  classe: 'CM1 A', type: 'Talking',       gravite: 'Minor',    description: 'Persistent talking despite reminders',               sanction: 'Text copy assignment' },
    { id: 3, date: '20/05/2026', eleve: 'BELLA Sarah',  classe: 'CM1 A', type: 'Absence',       gravite: 'Minor',    description: 'Unjustified absence — 2 days',                       sanction: 'Parent summoning'     },
    { id: 4, date: '18/05/2026', eleve: 'FOUDA Pierre', classe: 'CE2 A', type: 'Disobedience',  gravite: 'Moderate', description: 'Refused to follow the class teacher instructions',   sanction: 'Written warning'      },
  ] : [
    { id: 1, date: '24/05/2026', eleve: 'TAMBA Isaac',  classe: 'CM2 A', type: 'Retard',       gravite: 'Mineur', description: 'Arrivé 15 min en retard sans justificatif',          sanction: 'Avertissement oral'   },
    { id: 2, date: '22/05/2026', eleve: 'DUPONT Jean',  classe: 'CM1 A', type: 'Bavardage',    gravite: 'Mineur', description: 'Bavardage persistant en classe malgré rappels',       sanction: 'Copie de texte'       },
    { id: 3, date: '20/05/2026', eleve: 'BELLA Sarah',  classe: 'CM1 A', type: 'Absence',      gravite: 'Mineur', description: 'Absence non justifiée — 2 jours',                     sanction: 'Convocation parents'  },
    { id: 4, date: '18/05/2026', eleve: 'FOUDA Pierre', classe: 'CE2 A', type: 'Indiscipline', gravite: 'Moyen',  description: "Refus d'obéir au maître de classe",                  sanction: 'Avertissement écrit'  },
  ];

  const severities = isEn ? ['Minor', 'Moderate', 'Major'] : ['Mineur', 'Moyen', 'Majeur'];
  const types = isEn
    ? ['Late arrival', 'Absence', 'Talking', 'Disobedience', 'Fighting']
    : ['Retard', 'Absence', 'Bavardage', 'Indiscipline', 'Bagarre'];

  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [search, setSearch] = useState('');
  const [filterGravite, setFilterGravite] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: '', eleve: '', classe: 'CM1 A', type: types[0], gravite: severities[0], description: '', sanction: ''
  });

  const filtered = incidents.filter(inc => {
    const matchG = !filterGravite || inc.gravite === filterGravite;
    const matchS = inc.eleve.toLowerCase().includes(search.toLowerCase());
    return matchG && matchS;
  });

  const inputCls = 'w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-digi-purple outline-none transition-all';
  const labelCls = 'block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1';

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
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
        <KPICard value="0" label={t('discipline.exclusions', 'Exclusions en Cours')} icon={<UserX className="w-5 h-5 text-digi-danger" />} />
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
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
        </div>
      </Card>

      {/* New Incident Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('discipline.newIncident', 'Nouvel Incident')} size="md">
        <form className="space-y-4" onSubmit={e => {
          e.preventDefault();
          if (!newEntry.eleve) return;
          const newId = incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1;
          setIncidents([...incidents, {
            id: newId, ...newEntry,
            date: newEntry.date || new Date().toLocaleDateString(isEn ? 'en-GB' : 'fr-FR')
          }]);
          setIsModalOpen(false);
          setNewEntry({ date: '', eleve: '', classe: 'CM1 A', type: types[0], gravite: severities[0], description: '', sanction: '' });
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{t('common.date', 'Date')}</label>
              <input className={inputCls} type="date" value={newEntry.date} onChange={e => setNewEntry({ ...newEntry, date: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>{t('discipline.student', 'Élève')}</label>
              <input className={inputCls} placeholder={t('discipline.studentName', "Nom de l'élève")} value={newEntry.eleve} onChange={e => setNewEntry({ ...newEntry, eleve: e.target.value })} required />
            </div>
            <div>
              <label className={labelCls}>{t('discipline.class', 'Classe')}</label>
              <select className={`${inputCls} bg-white`} value={newEntry.classe} onChange={e => setNewEntry({ ...newEntry, classe: e.target.value })}>
                {['CM1 A', 'CE2 A', 'CM2 A'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
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
                <th className="px-4 py-3 text-left">{t('discipline.sanction', 'Sanction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {filtered.map(inc => (
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
                  <td className="px-4 py-3 text-xs font-semibold text-slate-500">{inc.sanction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default TeacherDisciplinePage;
