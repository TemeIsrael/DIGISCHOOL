import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Modal } from '../../../shared/components/ui/Modal';
import { exportPDF } from '../../../shared/utils/export';
import { CreditCard, CheckCircle2, Clock, AlertCircle, Download, Plus, Loader2 } from 'lucide-react';
import { api } from '../../../shared/lib/api';
import { useAuthStore } from '../../auth/store';

type Payment = {
  idPaie: number;
  matricule: string;
  montant: number;
  trancheCouverte: number;
  idMode: number;
  actif: boolean;
  date?: string;
  justificatifUrl?: string;
  createdAt: string;
};

const formatCFA = (n: number) => `${n.toLocaleString('fr-FR')} XAF`;

export const ParentPaymentsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await api.get('/payments');
        setPayments(res.data?.data || []);
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Erreur lors du chargement des paiements');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const activePayments = payments.filter(p => p.actif);
  const totalPaid = activePayments.reduce((s, p) => s + (p.montant || 0), 0);
  // TOTAL_SCOLARITE sera calculé dynamiquement quand l'API scolarite sera disponible
  const TOTAL_SCOLARITE = totalPaid > 0 ? Math.max(totalPaid, 195000) : 195000;
  const remaining = TOTAL_SCOLARITE - totalPaid;
  const rate = TOTAL_SCOLARITE > 0 ? Math.round((totalPaid / TOTAL_SCOLARITE) * 100) : 0;

  const statusBadge = (p: Payment) => {
    if (!p.actif) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-500">
          <AlertCircle className="w-3 h-3" />
          {isEn ? 'Cancelled' : 'Annulé'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700">
        <CheckCircle2 className="w-3 h-3" />
        {isEn ? 'Paid' : 'Payé'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-digi-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-semibold">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          {isEn ? 'Retry' : 'Réessayer'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('payments.title', 'Gestion des Paiements')}</h1>
          <p className="text-sm text-slate-400 font-semibold">
            {isEn ? "Your child's tuition fee history" : "Historique des frais de scolarité de votre enfant"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => exportPDF(payments, 'paiements.pdf')}>
            <Download className="w-4 h-4" />
            {t('payments.export', 'Exporter PDF')}
          </Button>
          {remaining > 0 && (
            <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4" />
              {isEn ? 'Make a Payment' : 'Effectuer un Paiement'}
            </Button>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          value={formatCFA(TOTAL_SCOLARITE)}
          label={t('payments.totalDue', 'Total Attendu')}
          icon={<CreditCard className="w-5 h-5 text-digi-purple" />}
        />
        <KPICard
          value={formatCFA(totalPaid)}
          label={t('payments.totalPaid', 'Total Recouvré')}
          icon={<CheckCircle2 className="w-5 h-5 text-digi-success" />}
        />
        <KPICard
          value={remaining > 0 ? formatCFA(remaining) : isEn ? 'All paid' : 'Soldé'}
          label={t('payments.remaining', 'Reste à Payer')}
          icon={<AlertCircle className={`w-5 h-5 ${remaining > 0 ? 'text-digi-warning' : 'text-digi-success'}`} />}
        />
        <KPICard
          value={`${rate}%`}
          label={t('payments.rate', 'Taux de Paiement')}
          icon={<CreditCard className="w-5 h-5 text-digi-purple" />}
        />
      </div>

      {/* Progress bar */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-slate-700">{isEn ? 'Payment Progress' : 'Avancement des Paiements'}</span>
          <span className="text-sm font-bold text-digi-purple">{rate}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${rate === 100 ? 'bg-digi-success' : 'bg-digi-purple'}`}
            style={{ width: `${rate}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400 font-semibold">
          <span>0 XAF</span>
          <span>{formatCFA(TOTAL_SCOLARITE)}</span>
        </div>
      </Card>

      {/* Payment Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
          {isEn ? 'Payment History' : 'Historique des Versements'}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">N°</th>
                <th className="px-4 py-3 text-left">{t('common.date', 'Date')}</th>
                <th className="px-4 py-3 text-right">{t('payments.amount', 'Montant')}</th>
                <th className="px-4 py-3 text-left">{isEn ? 'Installment' : 'Tranche'}</th>
                <th className="px-4 py-3 text-center">{t('common.status', 'Statut')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                    {isEn ? 'No payments found' : 'Aucun paiement trouvé'}
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.idPaie} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold">{p.idPaie}</td>
                    <td className="px-4 py-3">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3 text-right font-bold">
                      {p.montant > 0 ? formatCFA(p.montant) : formatCFA(p.montant)}
                    </td>
                    <td className="px-4 py-3">
                      {isEn ? `Installment ${p.trancheCouverte}` : `Tranche ${p.trancheCouverte}`}
                    </td>
                    <td className="px-4 py-3 text-center">{statusBadge(p)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Info Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEn ? 'Make a Payment' : 'Effectuer un Paiement'} size="sm">
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm font-semibold text-amber-800">
              {isEn
                ? 'Please contact the school secretary to make a payment. You can also pay via Mobile Money.'
                : 'Veuillez contacter le secrétariat de l\'école pour effectuer un versement. Vous pouvez également payer via Mobile Money.'}
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{isEn ? 'Remaining amount:' : 'Montant restant :'}</span>
              <span className="font-bold text-digi-danger">{formatCFA(remaining)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mobile Money :</span>
              <span className="font-bold text-slate-800">+237 6XX XXX XXX</span>
            </div>
          </div>
          <Button variant="primary" className="w-full" onClick={() => setIsModalOpen(false)}>
            {isEn ? 'Close' : 'Fermer'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default ParentPaymentsPage;
