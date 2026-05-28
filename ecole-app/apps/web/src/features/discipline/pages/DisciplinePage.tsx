import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { ShieldCheck, AlertTriangle, FilePlus, Search, Eye, UserX } from 'lucide-react';

const mockIncidents = [
  { id: 1, date: '24/05/2026', eleve: 'TAMBA Isaac', classe: 'CM2 A', type: 'Retard', gravite: 'Mineur', description: 'Arrivé 20 min en retard sans justificatif', sanction: 'Avertissement oral' },
  { id: 2, date: '23/05/2026', eleve: 'NGONO Marie', classe: 'CE2 A', type: 'Bagarre', gravite: 'Majeur', description: 'Altercation physique dans la cour', sanction: '3 jours d\'exclusion' },
  { id: 3, date: '22/05/2026', eleve: 'NGUEMA Jean', classe: 'CM1 A', type: 'Tricherie', gravite: 'Majeur', description: 'Utilisation de notes pendant l\'examen', sanction: '0/10 à l\'épreuve' },
  { id: 4, date: '20/05/2026', eleve: 'BELLA Sarah', classe: 'Class 5 A', type: 'Absence', gravite: 'Mineur', description: 'Absence non justifiée — 2 jours', sanction: 'Convocation des parents' },
  { id: 5, date: '18/05/2026', eleve: 'FOUDA Pierre', classe: 'CP A', type: 'Insolence', gravite: 'Moyen', description: 'Manque de respect envers un enseignant', sanction: 'Avertissement écrit' },
];

const graviteColors: Record<string, string> = {
  Mineur: 'bg-blue-50 text-blue-700',
  Moyen: 'bg-amber-50 text-amber-700',
  Majeur: 'bg-red-50 text-red-700',
};

export const DisciplinePage: React.FC = () => {
  const { t } = useTranslation();
  const [filterGravite, setFilterGravite] = useState('Tous');
  const [filterType, setFilterType] = useState('Tous');
  const [search, setSearch] = useState('');

  const filtered = mockIncidents.filter((inc) => {
    const matchGravite = filterGravite === 'Tous' || inc.gravite === filterGravite;
    const matchType = filterType === 'Tous' || inc.type === filterType;
    const matchSearch = inc.eleve.toLowerCase().includes(search.toLowerCase());
    return matchGravite && matchType && matchSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('discipline.title')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('discipline.subtitle')}</p>
        </div>
        <Button className="gap-2">
          <FilePlus className="w-4 h-4" />
          {t('discipline.newIncident')}
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={String(mockIncidents.length)} label={t('discipline.totalIncidents')} icon={<AlertTriangle className="w-5 h-5 text-digi-warning" />} />
        <KPICard value={String(mockIncidents.filter(i => i.gravite === 'Majeur').length)} label={t('discipline.major')} icon={<ShieldCheck className="w-5 h-5 text-digi-danger" />} />
        <KPICard value={String(mockIncidents.filter(i => i.gravite === 'Mineur').length)} label={t('discipline.minor')} icon={<Eye className="w-5 h-5 text-digi-success" />} />
        <KPICard value="2" label={t('discipline.exclusions')} icon={<UserX className="w-5 h-5 text-digi-danger" />} />
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('discipline.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown label={t('discipline.severity')} value={filterGravite} options={['Tous', 'Mineur', 'Moyen', 'Majeur']} onChange={setFilterGravite} />
          <FilterDropdown label={t('discipline.type')} value={filterType} options={['Tous', 'Retard', 'Absence', 'Bagarre', 'Tricherie', 'Insolence']} onChange={setFilterType} />
        </div>
      </Card>

      {/* Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">{t('discipline.date')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.student')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.class')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.type')}</th>
                <th className="px-4 py-3 text-center">{t('discipline.severity')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.description')}</th>
                <th className="px-4 py-3 text-left">{t('discipline.sanction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {filtered.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">{inc.date}</td>
                  <td className="px-4 py-3 font-semibold">{inc.eleve}</td>
                  <td className="px-4 py-3">{inc.classe}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-digi-purple-bg text-digi-purple">
                      {inc.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${graviteColors[inc.gravite]}`}>
                      {inc.gravite}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate" title={inc.description}>{inc.description}</td>
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
export default DisciplinePage;
