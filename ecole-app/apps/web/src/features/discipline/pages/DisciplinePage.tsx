import React, { useState } from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { ShieldCheck, AlertTriangle, FilePlus, Search, Eye, UserX } from 'lucide-react';

const mockIncidents = [
  { id: 1, date: '24/05/2026', eleve: 'TAMBA Isaac', classe: '3ème A', type: 'Retard', gravite: 'Mineur', description: 'Arrivé 20 min en retard sans justificatif', sanction: 'Avertissement oral' },
  { id: 2, date: '23/05/2026', eleve: 'NGONO Marie', classe: '4ème C', type: 'Bagarre', gravite: 'Majeur', description: 'Altercation physique dans la cour', sanction: '3 jours d\'exclusion' },
  { id: 3, date: '22/05/2026', eleve: 'DUPONT Jean', classe: '6ème A', type: 'Tricherie', gravite: 'Majeur', description: 'Utilisation de notes pendant l\'examen', sanction: '0/20 à l\'épreuve' },
  { id: 4, date: '20/05/2026', eleve: 'BELLA Sarah', classe: '6ème A', type: 'Absence', gravite: 'Mineur', description: 'Absence non justifiée — 2 jours', sanction: 'Convocation des parents' },
  { id: 5, date: '18/05/2026', eleve: 'FOUDA Pierre', classe: '5ème B', type: 'Insolence', gravite: 'Moyen', description: 'Manque de respect envers un enseignant', sanction: 'Avertissement écrit' },
];

const graviteColors: Record<string, string> = {
  Mineur: 'bg-blue-50 text-blue-700',
  Moyen: 'bg-amber-50 text-amber-700',
  Majeur: 'bg-red-50 text-red-700',
};

export const DisciplinePage: React.FC = () => {
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
          <h1 className="text-2xl font-bold text-slate-800">Gestion Disciplinaire</h1>
          <p className="text-sm text-slate-400 font-semibold">Suivi des incidents et sanctions</p>
        </div>
        <Button className="gap-2">
          <FilePlus className="w-4 h-4" />
          Nouvel Incident
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={String(mockIncidents.length)} label="Total Incidents" icon={<AlertTriangle className="w-5 h-5 text-digi-warning" />} />
        <KPICard value={String(mockIncidents.filter(i => i.gravite === 'Majeur').length)} label="Incidents Majeurs" icon={<ShieldCheck className="w-5 h-5 text-digi-danger" />} />
        <KPICard value={String(mockIncidents.filter(i => i.gravite === 'Mineur').length)} label="Incidents Mineurs" icon={<Eye className="w-5 h-5 text-digi-success" />} />
        <KPICard value="2" label="Exclusions en Cours" icon={<UserX className="w-5 h-5 text-digi-danger" />} />
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
              placeholder="Rechercher un élève..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown label="Gravité" value={filterGravite} options={['Tous', 'Mineur', 'Moyen', 'Majeur']} onChange={setFilterGravite} />
          <FilterDropdown label="Type" value={filterType} options={['Tous', 'Retard', 'Absence', 'Bagarre', 'Tricherie', 'Insolence']} onChange={setFilterType} />
        </div>
      </Card>

      {/* Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Élève</th>
                <th className="px-4 py-3 text-left">Classe</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-center">Gravité</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Sanction</th>
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
