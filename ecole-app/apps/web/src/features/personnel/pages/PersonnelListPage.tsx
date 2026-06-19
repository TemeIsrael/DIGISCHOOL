import React, { useState } from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Modal } from '../../../shared/components/ui/Modal';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { Users, Search, FilePlus, Pencil, Trash2, Shield, BookOpen } from 'lucide-react';
import { usePermissions } from '../../auth/hooks/usePermissions';

const initialPersonnel = [
  { id: 1, nom: 'FOUDA', prenom: 'Pierre', type: 'Maître', cours: 'CM1 A', login: 'fouda.p', actif: true, photoUrl: '' },
  { id: 2, nom: 'EKANGA', prenom: 'Lise', type: 'Maître', cours: 'CE2 A', login: 'ekanga.l', actif: true, photoUrl: '' },
  { id: 3, nom: 'MBARGA', prenom: 'Joseph', type: 'Maître', cours: 'CM2 A', login: 'mbarga.j', actif: true, photoUrl: '' },
  { id: 4, nom: 'ATANGANA', prenom: 'Michel', type: 'Maître', cours: 'CE1 A', login: 'atangana.m', actif: true, photoUrl: '' },
  { id: 5, nom: 'NDJE', prenom: 'Carine', type: 'Maître', cours: 'CP A', login: 'ndje.c', actif: false, photoUrl: '' },
  { id: 6, nom: 'BIYA', prenom: 'Georges', type: 'Maître', cours: 'SIL A', login: 'biya.g', actif: true, photoUrl: '' },
  { id: 7, nom: 'ONANA', prenom: 'Sylvie', type: 'Spécialiste', cours: 'Anglais', login: 'onana.s', actif: true, photoUrl: '' },
  { id: 8, nom: 'ELONG', prenom: 'Martin', type: 'Spécialiste', cours: 'Éducation Physique', login: 'elong.m', actif: true, photoUrl: '' },
];

const PersonnelListPage: React.FC = () => {
  const { canAddPersonnelOrStudentsOrSchedules } = usePermissions();
  const [personnel, setPersonnel] = useState(initialPersonnel);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    nom: '',
    prenom: '',
    type: 'Maître',
    cours: '',
    login: '',
    actif: true,
    photoUrl: '',
  });
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [filterActif, setFilterActif] = useState('Tous');

  const filtered = personnel.filter(p => {
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
          <p className="text-sm text-slate-400 font-semibold">Maîtres de classe, spécialistes et administratifs</p>
        </div>
        {canAddPersonnelOrStudentsOrSchedules && (
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <FilePlus className="w-4 h-4" />
            Nouveau Personnel
          </Button>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          value={String(personnel.length)}
          label="Total Personnel"
          icon={<Users className="w-5 h-5 text-digi-purple" />}
        />
        <KPICard
          value={String(personnel.filter(p => p.type === 'Maître').length)}
          label="Maîtres de Classe"
          icon={<BookOpen className="w-5 h-5 text-digi-purple" />}
        />
        <KPICard
          value={String(personnel.filter(p => p.type === 'Spécialiste').length)}
          label="Spécialistes"
          icon={<Shield className="w-5 h-5 text-digi-purple" />}
        />
        <KPICard
          value={String(personnel.filter(p => p.actif).length)}
          label="Actifs"
          icon={<Users className="w-5 h-5 text-digi-success" />}
        />
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un membre du personnel..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown label="Type" value={filterType} options={['Tous', 'Maître', 'Spécialiste']} onChange={setFilterType} />
          <FilterDropdown label="Statut" value={filterActif} options={['Tous', 'Actif', 'Inactif']} onChange={setFilterActif} />
        </div>
      </Card>

      {/* Add Personnel Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter un nouveau personnel"
        size="md"
      >
        <form
          className="space-y-5"
          onSubmit={e => {
            e.preventDefault();
            const newId = personnel.length > 0 ? Math.max(...personnel.map(p => p.id)) + 1 : 1;
            const newPerson = { id: newId, ...newEntry };
            setPersonnel([...personnel, newPerson]);
            setIsModalOpen(false);
            setNewEntry({ nom: '', prenom: '', type: 'Maître', cours: '', login: '', actif: true, photoUrl: '' });
          }}
        >
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="relative group shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative">
                {newEntry.photoUrl ? (
                  <img src={newEntry.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-6 h-6 text-slate-300" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider">Modifier</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewEntry(prev => ({ ...prev, photoUrl: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Photo de profil</p>
              <p className="text-xs text-slate-500">Cliquez sur l'avatar pour ajouter une image</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Nom</label>
              <input className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all" placeholder="Ex: NDJE" value={newEntry.nom} onChange={e => setNewEntry({ ...newEntry, nom: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Prénom</label>
              <input className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all" placeholder="Ex: Carine" value={newEntry.prenom} onChange={e => setNewEntry({ ...newEntry, prenom: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Type</label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all" value={newEntry.type} onChange={e => setNewEntry({ ...newEntry, type: e.target.value })}>
                <option value="Maître">Maître de Classe</option>
                <option value="Spécialiste">Spécialiste</option>
                <option value="Administratif">Administratif</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Classe / Matière</label>
              <input className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all" placeholder="Ex: CM1 A ou Anglais" value={newEntry.cours} onChange={e => setNewEntry({ ...newEntry, cours: e.target.value })} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Identifiant</label>
              <input className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all" placeholder="Ex: login.c" value={newEntry.login} onChange={e => setNewEntry({ ...newEntry, login: e.target.value })} required />
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-digi-purple border-slate-300 rounded focus:ring-digi-purple" checked={newEntry.actif} onChange={e => setNewEntry({ ...newEntry, actif: e.target.checked })} />
                <span className="text-sm font-semibold text-slate-700">Compte Actif</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Annuler</Button>
            <Button type="submit" variant="primary">Enregistrer</Button>
          </div>
        </form>
      </Modal>

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
                <th className="px-4 py-3 text-left">Classe / Matière</th>
                <th className="px-4 py-3 text-left">Login</th>
                <th className="px-4 py-3 text-center">Statut</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">{p.id}</td>
                  <td className="px-4 py-3 flex items-center">
                    <img 
                      src={p.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.prenom + ' ' + p.nom)}&background=random`} 
                      alt="photo" 
                      className="w-8 h-8 rounded-full mr-3 object-cover shadow-sm border border-slate-200" 
                    />
                    <span className="font-semibold text-slate-800">{p.nom}</span>
                  </td>
                  <td className="px-4 py-3">{p.prenom}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${p.type === 'Maître' ? 'bg-digi-purple-bg text-digi-purple' : 'bg-sky-50 text-sky-700'}`}>{p.type}</span>
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
