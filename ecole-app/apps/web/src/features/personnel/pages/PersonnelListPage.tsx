import React, { useState } from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { Users, Search, FilePlus, Pencil, Trash2, Shield, BookOpen } from 'lucide-react';

const mockPersonnel = [
  { id: 1, nom: 'FOUDA', prenom: 'Pierre', type: 'Enseignant', cours: 'Mathématiques', login: 'fouda.p', actif: true },
  { id: 2, nom: 'EKANGA', prenom: 'Lise', type: 'Enseignant', cours: 'Français', login: 'ekanga.l', actif: true },
  { id: 3, nom: 'MBARGA', prenom: 'Joseph', type: 'Enseignant', cours: 'Physique', login: 'mbarga.j', actif: true },
  { id: 4, nom: 'ATANGANA', prenom: 'Michel', type: 'Titulaire', cours: '6ème A', login: 'atangana.m', actif: true },
  { id: 5, nom: 'NDJE', prenom: 'Carine', type: 'Enseignant', cours: 'Anglais', login: 'ndje.c', actif: false },
  { id: 6, nom: 'BIYA', prenom: 'Georges', type: 'Enseignant', cours: 'SVT', login: 'biya.g', actif: true },
];

export const PersonnelListPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [filterActif, setFilterActif] = useState('Tous');

  const filtered = mockPersonnel.filter((p) => {
    const matchType = filterType === 'Tous' || p.type === filterType;
    const matchActif = filterActif === 'Tous' || (filterActif === 'Actif' ? p.actif : !p.actif);
    const matchSearch = `${p.nom} ${p.prenom}`.toLowerCase().includes(search.toLowerCase());
    return matchType && matchActif && matchSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion du Personnel</h1>
          <p className="text-sm text-slate-400 font-semibold">Enseignants, titulaires et administratifs</p>
        </div>
        <Button className="gap-2">
          <FilePlus className="w-4 h-4" />
          Nouveau Personnel
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={String(mockPersonnel.length)} label="Total Personnel" icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(mockPersonnel.filter(p => p.type === 'Enseignant').length)} label="Enseignants" icon={<BookOpen className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(mockPersonnel.filter(p => p.type === 'Titulaire').length)} label="Titulaires" icon={<Shield className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(mockPersonnel.filter(p => p.actif).length)} label="Actifs" icon={<Users className="w-5 h-5 text-digi-success" />} />
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
              placeholder="Rechercher un membre du personnel..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown label="Type" value={filterType} options={['Tous', 'Enseignant', 'Titulaire']} onChange={setFilterType} />
          <FilterDropdown label="Statut" value={filterActif} options={['Tous', 'Actif', 'Inactif']} onChange={setFilterActif} />
        </div>
      </Card>

      {/* Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Prénom</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Cours / Salle</th>
                <th className="px-4 py-3 text-left">Login</th>
                <th className="px-4 py-3 text-center">Statut</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">{p.id}</td>
                  <td className="px-4 py-3 font-semibold">{p.nom}</td>
                  <td className="px-4 py-3">{p.prenom}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      p.type === 'Enseignant' ? 'bg-digi-teacher-bg text-digi-teacher-text' : 'bg-digi-admin-bg text-digi-admin-text'
                    }`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">{p.cours}</td>
                  <td className="px-4 py-3 font-mono text-xs">{p.login}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center w-2.5 h-2.5 rounded-full ${p.actif ? 'bg-digi-success' : 'bg-slate-300'}`} />
                  </td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-digi-purple transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-digi-danger transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default PersonnelListPage;
