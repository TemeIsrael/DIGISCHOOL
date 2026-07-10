import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Modal } from '../../../shared/components/ui/Modal';
import { exportPDF } from '../../../shared/utils/export';
import { CreditCard, CheckCircle2, Clock, AlertCircle, Download, Plus, Loader2, Users } from 'lucide-react';
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

type TrancheInfo = {
  numero: number;
  montant: number;
  dateEcheance: string;
};

type ChildScolarite = {
  matricule: string;
  nom: string;
  totalScolarite: number;
  montantInscription: number;
  pension: number;
  totalPaid: number;
  remaining: number;
  rate: number;
  tranches: TrancheInfo[];
  payments: Payment[];
};

const formatCFA = (n: number) => `${n.toLocaleString('fr-FR')} XAF`;

export const ParentPaymentsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const [scolariteData, setScolariteData] = useState<ChildScolarite[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<ChildScolarite | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch scolarite info (real tranches from DB)
        const [scolariteRes, paymentsRes] = await Promise.all([
          api.get('/payments/scolarite-info'),
          api.get('/payments')
        ]);
        
        const scolData = scolariteRes.data?.data || [];
        setScolariteData(Array.isArray(scolData) ? scolData : [scolData]);
        setPayments(paymentsRes.data?.data || []);
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Erreur lors du chargement des paiements');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Aggregate totals across all children
  const totalScolarite = scolariteData.reduce((s, c) => s + (c.totalScolarite || 0), 0);
  const totalPaid = scolariteData.reduce((s, c) => s + (c.totalPaid || 0), 0);
  const remaining = totalScolarite - totalPaid;
  const rate = totalScolarite > 0 ? Math.round((totalPaid / totalScolarite) * 100) : 0;

  // If no scolarite data from DB, fallback to payments-only calculation
  const effectiveTotalScolarite = totalScolarite > 0 ? totalScolarite : (totalPaid > 0 ? totalPaid : 0);
  const effectiveRemaining = totalScolarite > 0 ? remaining : 0;
  const effectiveRate = totalScolarite > 0 ? rate : (totalPaid > 0 ? 100 : 0);

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
          {effectiveRemaining > 0 && (
            <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4" />
              {isEn ? 'Payment Info' : 'Infos de Paiement'}
            </Button>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          value={totalScolarite > 0 ? formatCFA(totalScolarite) : (isEn ? 'Not configured' : 'Non configuré')}
          label={t('payments.totalDue', 'Total Attendu')}
          icon={<CreditCard className="w-5 h-5 text-digi-purple" />}
        />
        <KPICard
          value={formatCFA(totalPaid)}
          label={t('payments.totalPaid', 'Total Recouvré')}
          icon={<CheckCircle2 className="w-5 h-5 text-digi-success" />}
        />
        <KPICard
          value={totalScolarite > 0 ? formatCFA(effectiveRemaining) : (isEn ? 'N/A' : 'N/A')}
          label={t('payments.remaining', 'Reste à Payer')}
          icon={<AlertCircle className={`w-5 h-5 ${effectiveRemaining > 0 ? 'text-digi-warning' : 'text-digi-success'}`} />}
        />
        <KPICard
          value={totalScolarite > 0 ? `${effectiveRate}%` : '—'}
          label={t('payments.rate', 'Taux de Paiement')}
          icon={<CreditCard className="w-5 h-5 text-digi-purple" />}
        />
      </div>

      {/* Progress bar */}
      {totalScolarite > 0 && (
        <Card className="shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-700">{isEn ? 'Payment Progress' : 'Avancement des Paiements'}</span>
            <span className="text-sm font-bold text-digi-purple">{effectiveRate}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${effectiveRate === 100 ? 'bg-digi-success' : 'bg-digi-purple'}`}
              style={{ width: `${effectiveRate}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400 font-semibold">
            <span>0 XAF</span>
            <span>{formatCFA(totalScolarite)}</span>
          </div>
        </Card>
      )}

      {/* Per-child Tranche Breakdown */}
      {scolariteData.length > 0 && (
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-digi-purple" />
            {isEn ? 'Fee Breakdown by Child' : 'Détail des frais par enfant'}
          </h3>
          <div className="space-y-6">
            {scolariteData.map((child) => (
              <div key={child.matricule} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-800">{child.nom}</h4>
                  <span className="text-xs font-semibold text-slate-500">
                    {isEn ? 'Total' : 'Total'}: {formatCFA(child.totalScolarite)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">{isEn ? 'Registration' : 'Inscription'}</p>
                    <p className="text-sm font-bold text-slate-700">{formatCFA(child.montantInscription)}</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">{isEn ? 'Tuition' : 'Pension'}</p>
                    <p className="text-sm font-bold text-slate-700">{formatCFA(child.pension)}</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">{isEn ? 'Paid' : 'Payé'}</p>
                    <p className="text-sm font-bold text-emerald-600">{formatCFA(child.totalPaid)}</p>
                  </div>
                </div>
                {child.tranches.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className="text-slate-500 font-bold uppercase">
                          <th className="py-1 pr-4 text-left">{isEn ? 'Installment' : 'Tranche'}</th>
                          <th className="py-1 pr-4 text-right">{isEn ? 'Amount' : 'Montant'}</th>
                          <th className="py-1 pr-4 text-left">{isEn ? 'Due date' : 'Échéance'}</th>
                          <th className="py-1 text-center">{isEn ? 'Status' : 'Statut'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {child.tranches
                          .sort((a, b) => a.numero - b.numero)
                          .map((tr) => {
                            const isPaid = child.payments.some(p => p.trancheCouverte === tr.numero && p.actif);
                            return (
                              <tr key={tr.numero} className="border-t border-slate-100">
                                <td className="py-2 pr-4 font-semibold">{isEn ? `Installment ${tr.numero}` : `Tranche ${tr.numero}`}</td>
                                <td className="py-2 pr-4 text-right font-bold">{formatCFA(tr.montant)}</td>
                                <td className="py-2 pr-4 text-slate-500">{tr.dateEcheance ? new Date(tr.dateEcheance).toLocaleDateString('fr-FR') : '—'}</td>
                                <td className="py-2 text-center">
                                  {isPaid ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700">
                                      <CheckCircle2 className="w-3 h-3" /> {isEn ? 'Paid' : 'Payé'}
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-700">
                                      <Clock className="w-3 h-3" /> {isEn ? 'Pending' : 'En attente'}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
                {child.tranches.length === 0 && (
                  <p className="text-xs text-slate-400 italic">
                    {isEn ? 'No installment schedule configured for this cycle.' : 'Aucun échéancier de tranches configuré pour ce cycle.'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

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
                      {formatCFA(p.montant)}
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEn ? 'Payment Information' : 'Informations de Paiement'} size="sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            {isEn
              ? 'To make a payment, please use one of the following methods and contact the school administration with your proof of payment.'
              : 'Pour effectuer un paiement, veuillez utiliser l\'un des moyens suivants et contacter l\'administration de l\'école avec votre preuve de paiement.'}
          </p>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              {isEn ? 'Select Payment Method' : 'Choisir le moyen de paiement'}
            </label>
            <select className="w-full h-10 rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-digi-purple/50 focus:border-digi-purple" onChange={(e) => {
              const el = document.getElementById('payment-info');
              if (el) {
                if (e.target.value === 'MTN') el.innerHTML = '<strong>MTN Mobile Money :</strong> +237 670 00 00 00 (Nom: ECOLE DIGISCHOOL)';
                else if (e.target.value === 'ORANGE') el.innerHTML = '<strong>Orange Money :</strong> +237 690 00 00 00 (Nom: ECOLE DIGISCHOOL)';
                else if (e.target.value === 'BANK') el.innerHTML = '<strong>Virement Bancaire :</strong> IBAN CM21 1000 0000 0000 0000 (Banque Atlantique)';
                else el.innerHTML = isEn ? 'Select a method to see account details.' : 'Sélectionnez un moyen de paiement pour voir les informations.';
              }
            }}>
              <option value="">-- {isEn ? 'Select' : 'Sélectionner'} --</option>
              <option value="MTN">MTN Mobile Money</option>
              <option value="ORANGE">Orange Money</option>
              <option value="BANK">Virement Bancaire</option>
            </select>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[60px] flex items-center justify-center text-sm text-slate-600">
            <p id="payment-info">{isEn ? 'Select a method to see account details.' : 'Sélectionnez un moyen de paiement pour voir les informations.'}</p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            <p className="font-bold mb-1">{isEn ? '⚠️ Important' : '⚠️ Important'}</p>
            <p>
              {isEn
                ? 'After making your payment, please bring your receipt to the school administration. They will record it in the system.'
                : 'Après avoir effectué votre paiement, veuillez apporter votre reçu à l\'administration de l\'école. Ils l\'enregistreront dans le système.'}
            </p>
          </div>

          <div className="pt-2">
            <Button type="button" variant="outline" className="w-full" onClick={() => setIsModalOpen(false)}>
              {isEn ? 'Close' : 'Fermer'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ParentPaymentsPage;
