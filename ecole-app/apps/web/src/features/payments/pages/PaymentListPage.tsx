import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { CreditCard, Download, Search, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { exportPDF } from '../../../shared/utils/export';

type PaymentStatus = 'complete' | 'partial' | 'unpaid';

type Payment = {
  id: number;
  matricule: string;
  eleve: string;
  classe: string;
  montant: number;
  paye: number;
  status: PaymentStatus;
  date: string;
};

const mockPayments: Payment[] = [
  { id: 1, matricule: 'EL-001', eleve: 'DUPONT Jean',  classe: 'CM1 A', montant: 75000, paye: 50000, status: 'partial',  date: '15/03/2026' },
  { id: 2, matricule: 'EL-002', eleve: 'MBARGA Paul',  classe: 'CE2 A', montant: 75000, paye: 75000, status: 'complete', date: '10/01/2026' },
  { id: 3, matricule: 'EL-003', eleve: 'NGONO Marie',  classe: 'CE1 A', montant: 65000, paye: 0,     status: 'unpaid',   date: '-'          },
  { id: 4, matricule: 'EL-004', eleve: 'TAMBA Isaac',  classe: 'CM2 A', montant: 85000, paye: 85000, status: 'complete', date: '05/02/2026' },
  { id: 5, matricule: 'EL-005', eleve: 'BELLA Sarah',  classe: 'CM1 A', montant: 75000, paye: 35000, status: 'partial',  date: '20/04/2026' },
];

const statusStyle: Record<PaymentStatus, string> = {
  complete: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  partial:  'bg-amber-50  text-amber-700  border-amber-200',
  unpaid:   'bg-red-50    text-red-700    border-red-200',
};

import { useAuthStore } from '../../auth/store';
import { Modal } from '../../../shared/components/ui/Modal';
import { Input } from '../../../shared/components/ui/Input';
import { Settings, Plus, Trash2 } from 'lucide-react';

export const PaymentListPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [filterStatus, setFilterStatus] = useState('');
  const [search,       setSearch]       = useState('');
  
  // Financial Configuration State
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(['Espèces', 'Mobile Money', 'Virement Bancaire']);
  const [newMethod, setNewMethod] = useState('');
  const [tranches, setTranches] = useState([
    { id: 1, name: 'Tranche 1', amount: 25000 },
    { id: 2, name: 'Tranche 2', amount: 25000 },
    { id: 3, name: 'Tranche 3', amount: 25000 },
  ]);
  const [newTrancheName, setNewTrancheName] = useState('');
  const [newTrancheAmount, setNewTrancheAmount] = useState('');

  const statusLabel = (s: PaymentStatus) => ({
    complete: t('payments.complete', 'Complet'),
    partial:  t('payments.partial',  'Partiel'),
    unpaid:   t('payments.unpaid',   'Impayé'),
  }[s]);

  const filtered = mockPayments.filter((p) => {
    const matchStatus = !filterStatus || p.status === filterStatus;
    const matchSearch = p.eleve.toLowerCase().includes(search.toLowerCase()) || p.matricule.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalDue    = mockPayments.reduce((s, p) => s + p.montant, 0);
  const totalPaid   = mockPayments.reduce((s, p) => s + p.paye,    0);
  const totalUnpaid = totalDue - totalPaid;

  const handleExport = () => {
    const dataToExport = filtered.map((p) => ({
      [t('students.matricule', 'Matricule')]: p.matricule,
      [t('students.nom', 'Élève')]: p.eleve,
      [t('students.classe', 'Classe')]: p.classe,
      [t('payments.totalDue', 'Montant Dû') + ' (F)']: p.montant,
      [t('payments.totalPaid', 'Montant Payé') + ' (F)']: p.paye,
      [t('common.status', 'Statut')]: statusLabel(p.status),
      [t('payments.lastPayment', 'Dernier Paiement')]: p.date,
    }));
    exportPDF(dataToExport, 'Payments_List');
  };

  const handleAddMethod = () => {
    if (newMethod.trim() && !paymentMethods.includes(newMethod)) {
      setPaymentMethods([...paymentMethods, newMethod.trim()]);
      setNewMethod('');
    }
  };

  const handleRemoveMethod = (method: string) => {
    setPaymentMethods(paymentMethods.filter(m => m !== method));
  };

  const handleAddTranche = () => {
    if (newTrancheName.trim() && newTrancheAmount) {
      setTranches([...tranches, { id: Date.now(), name: newTrancheName, amount: Number(newTrancheAmount) }]);
      setNewTrancheName('');
      setNewTrancheAmount('');
    }
  };

  const handleRemoveTranche = (id: number) => {
    setTranches(tranches.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('payments.title', 'Gestion des Paiements')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('payments.subtitle', 'Suivi des frais de scolarité et recouvrements')}</p>
        </div>
        <div className="flex items-center gap-3">
          {user?.typeAdmin === 3 && (
            <Button variant="outline" className="gap-2 text-digi-purple border-digi-purple hover:bg-digi-purple hover:text-white transition-colors" onClick={() => setIsConfigOpen(true)}>
              <Settings className="w-4 h-4" />
              Configuration Financière
            </Button>
          )}
          <Button className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            {t('payments.export', 'Exporter PDF')}
          </Button>
        </div>
      </div>

      <Modal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} title="Configuration Financière" size="lg">
        <div className="space-y-8 pb-4">
          {/* Tranches Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">Définition des Tranches de Paiement</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input placeholder="Nom de la tranche (ex: Tranche 1)" value={newTrancheName} onChange={e => setNewTrancheName(e.target.value)} />
              <Input type="number" placeholder="Montant (FCFA)" value={newTrancheAmount} onChange={e => setNewTrancheAmount(e.target.value)} />
              <Button onClick={handleAddTranche} className="gap-2"><Plus className="w-4 h-4" /> Ajouter</Button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              {tranches.length === 0 && <p className="text-sm text-slate-500 italic">Aucune tranche définie.</p>}
              {tranches.map(tranche => (
                <div key={tranche.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <span className="font-semibold text-slate-700">{tranche.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-digi-purple">{tranche.amount.toLocaleString()} FCFA</span>
                    <button onClick={() => handleRemoveTranche(tranche.id)} className="text-slate-400 hover:text-digi-danger p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end text-sm font-bold text-slate-600">
              Total: <span className="ml-2 text-digi-success">{tranches.reduce((sum, t) => sum + t.amount, 0).toLocaleString()} FCFA</span>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">Modes de Paiement Acceptés</h3>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <Input placeholder="Nouveau mode de paiement (ex: Chèque)" value={newMethod} onChange={e => setNewMethod(e.target.value)} />
              </div>
              <Button onClick={handleAddMethod} className="gap-2"><Plus className="w-4 h-4" /> Ajouter</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {paymentMethods.length === 0 && <p className="text-sm text-slate-500 italic">Aucun mode de paiement défini.</p>}
              {paymentMethods.map(method => (
                <div key={method} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm text-sm font-semibold text-slate-700">
                  {method}
                  <button onClick={() => handleRemoveMethod(method)} className="text-slate-400 hover:text-digi-danger"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <Button variant="ghost" onClick={() => setIsConfigOpen(false)}>Fermer</Button>
            <Button variant="primary" onClick={() => setIsConfigOpen(false)}>Enregistrer la configuration</Button>
          </div>
        </div>
      </Modal>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={totalDue.toLocaleString('fr-FR') + ' F'}    label={t('payments.totalDue',   'Total Attendu')}         icon={<CreditCard   className="w-5 h-5 text-digi-purple"  />} />
        <KPICard value={totalPaid.toLocaleString('fr-FR') + ' F'}   label={t('payments.totalPaid',  'Total Recouvré')}        icon={<TrendingUp   className="w-5 h-5 text-digi-success" />} />
        <KPICard value={totalUnpaid.toLocaleString('fr-FR') + ' F'} label={t('payments.remaining',  'Reste à Recouvrer')}     icon={<AlertCircle  className="w-5 h-5 text-digi-danger"  />} />
        <KPICard value={Math.round((totalPaid / totalDue) * 100) + '%'} label={t('payments.rate',   'Taux de Recouvrement')}  icon={<CheckCircle  className="w-5 h-5 text-digi-success" />} />
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={t('payments.searchPlaceholder', 'Rechercher par nom ou matricule...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown
            label={t('common.status', 'Statut')}
            value={filterStatus}
            options={[
              { value: '',         label: t('common.all',      'Tous') },
              { value: 'complete', label: t('payments.complete','Complet') },
              { value: 'partial',  label: t('payments.partial', 'Partiel') },
              { value: 'unpaid',   label: t('payments.unpaid',  'Impayé') },
            ]}
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
                <th className="px-4 py-3 text-left">{t('students.matricule', 'Matricule')}</th>
                <th className="px-4 py-3 text-left">{t('students.nom', 'Élève')}</th>
                <th className="px-4 py-3 text-left">{t('students.classe', 'Classe')}</th>
                <th className="px-4 py-3 text-right">{t('payments.totalDue', 'Montant Dû')}</th>
                <th className="px-4 py-3 text-right">{t('payments.totalPaid', 'Montant Payé')}</th>
                <th className="px-4 py-3 text-center">{t('common.status', 'Statut')}</th>
                <th className="px-4 py-3 text-left">{t('payments.lastPayment', 'Dernier Paiement')}</th>
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusStyle[p.status]}`}>
                      {statusLabel(p.status)}
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
