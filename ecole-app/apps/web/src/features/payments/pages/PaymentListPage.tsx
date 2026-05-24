import React, { useState } from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { CreditCard, Download, Search, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const mockPayments = [
  { id: 1, matricule: 'EL-001', eleve: 'DUPONT Jean', classe: '6ème A', montant: 150000, paye: 100000, statut: 'Partiel', date: '15/03/2026' },
  { id: 2, matricule: 'EL-002', eleve: 'MBARGA Paul', classe: '5ème B', montant: 150000, paye: 150000, statut: 'Complet', date: '10/01/2026' },
  { id: 3, matricule: 'EL-003', eleve: 'NGONO Marie', classe: '4ème C', montant: 175000, paye: 0, statut: 'Impayé', date: '-' },
  { id: 4, matricule: 'EL-004', eleve: 'TAMBA Isaac', classe: '3ème A', montant: 200000, paye: 200000, statut: 'Complet', date: '05/02/2026' },
  { id: 5, matricule: 'EL-005', eleve: 'BELLA Sarah', classe: '6ème A', montant: 150000, paye: 75000, statut: 'Partiel', date: '20/04/2026' },
];

const statusColors: Record<string, string> = {
  Complet: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Partiel: 'bg-amber-50 text-amber-700 border-amber-200',
  Impayé: 'bg-red-50 text-red-700 border-red-200',
};

export const PaymentListPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [search, setSearch] = useState('');

  const filtered = mockPayments.filter((p) => {
    const matchStatus = filterStatus === 'Tous' || p.statut === filterStatus;
    const matchSearch = p.eleve.toLowerCase().includes(search.toLowerCase()) || p.matricule.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalDue = mockPayments.reduce((s, p) => s + p.montant, 0);
  const totalPaid = mockPayments.reduce((s, p) => s + p.paye, 0);
  const totalUnpaid = totalDue - totalPaid;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Paiements</h1>
          <p className="text-sm text-slate-400 font-semibold">Suivi des frais de scolarité et recouvrements</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Exporter PDF
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={totalDue.toLocaleString('fr-FR') + ' F'} label="Total Attendu" icon={<CreditCard className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={totalPaid.toLocaleString('fr-FR') + ' F'} label="Total Recouvré" icon={<TrendingUp className="w-5 h-5 text-digi-success" />} />
        <KPICard value={totalUnpaid.toLocaleString('fr-FR') + ' F'} label="Reste à Recouvrer" icon={<AlertCircle className="w-5 h-5 text-digi-danger" />} />
        <KPICard value={Math.round((totalPaid / totalDue) * 100) + '%'} label="Taux de Recouvrement" icon={<CheckCircle className="w-5 h-5 text-digi-success" />} />
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
              placeholder="Rechercher par nom ou matricule..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown
            label="Statut"
            value={filterStatus}
            options={['Tous', 'Complet', 'Partiel', 'Impayé']}
            onChange={setFilterStatus}
          />
        </div>
      </Card>

      {/* Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Matricule</th>
                <th className="px-4 py-3 text-left">Élève</th>
                <th className="px-4 py-3 text-left">Classe</th>
                <th className="px-4 py-3 text-right">Montant Dû</th>
                <th className="px-4 py-3 text-right">Montant Payé</th>
                <th className="px-4 py-3 text-center">Statut</th>
                <th className="px-4 py-3 text-left">Dernier Paiement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{p.matricule}</td>
                  <td className="px-4 py-3 font-semibold">{p.eleve}</td>
                  <td className="px-4 py-3">{p.classe}</td>
                  <td className="px-4 py-3 text-right font-semibold">{p.montant.toLocaleString('fr-FR')} F</td>
                  <td className="px-4 py-3 text-right font-semibold text-digi-success">{p.paye.toLocaleString('fr-FR')} F</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusColors[p.statut]}`}>
                      {p.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default PaymentListPage;
