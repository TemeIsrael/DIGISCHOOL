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

export const PaymentListPage: React.FC = () => {
  const { t } = useTranslation();
  const [filterStatus, setFilterStatus] = useState('');
  const [search,       setSearch]       = useState('');

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('payments.title', 'Gestion des Paiements')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('payments.subtitle', 'Suivi des frais de scolarité et recouvrements')}</p>
        </div>
        <Button className="gap-2" onClick={handleExport}>
          <Download className="w-4 h-4" />
          {t('payments.export', 'Exporter PDF')}
        </Button>
      </div>

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
