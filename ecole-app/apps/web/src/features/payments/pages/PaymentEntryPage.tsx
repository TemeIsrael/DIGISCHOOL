import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { ArrowLeft, CreditCard, CheckCircle2, Search, Loader2 } from 'lucide-react';
import { usePayments } from '../hooks/usePayments';
import { useStudents } from '../../students/hooks/useStudents';

export const PaymentEntryPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { payments, createPayment } = usePayments();
  const { students, isLoading: isLoadingStudents } = useStudents();

  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [montant, setMontant] = useState('');
  const [idMode, setIdMode] = useState('1');
  const [justificatif, setJustificatif] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Determine next tranche automatically for selected student
  const trancheInfo = useMemo(() => {
    if (!selectedStudent) return { nextTranche: 1, paidTranches: [] as number[] };
    const studentPayments = (payments || []).filter(
      (p: any) => p.matricule === selectedStudent.matricule && p.actif
    );
    const paidTranches = [...new Set(studentPayments.map((p: any) => p.trancheCouverte))].sort() as number[];
    let nextTranche = 1;
    while (paidTranches.includes(nextTranche)) {
      nextTranche++;
    }
    return { nextTranche, paidTranches };
  }, [selectedStudent, payments]);

  // Total paid for selected student
  const totalPaid = useMemo(() => {
    if (!selectedStudent) return 0;
    return (payments || [])
      .filter((p: any) => p.matricule === selectedStudent.matricule && p.actif)
      .reduce((s: number, p: any) => s + (p.montant || 0), 0);
  }, [selectedStudent, payments]);

  // Filter students by search
  const filteredStudents = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return (students || [])
      .filter((s: any) =>
        `${s.nom} ${s.prenom}`.toLowerCase().includes(q) ||
        String(s.matricule).toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [students, search]);

  // Auto-fill amount based on selected student and next tranche
  React.useEffect(() => {
    if (selectedStudent) {
      // Ideally this should be fetched from the backend (Tranches / Scolarite table)
      // Here we provide a reasonable default based on the tranche
      let defaultAmount = 50000;
      if (trancheInfo.nextTranche === 1) defaultAmount = 75000;
      else if (trancheInfo.nextTranche === 2) defaultAmount = 50000;
      else if (trancheInfo.nextTranche === 3) defaultAmount = 25000;
      
      setMontant(defaultAmount.toString());
    } else {
      setMontant('');
    }
  }, [selectedStudent, trancheInfo.nextTranche]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !montant) return;

    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await createPayment({
        matricule: selectedStudent.matricule,
        idAca: 1, // Current academic year (should be dynamically fetched)
        idMode: Number(idMode),
        montant: Number(montant),
        trancheCouverte: trancheInfo.nextTranche,
        justificatifUrl: justificatif || undefined,
      });
      setSuccess(true);
      setMontant('');
      setJustificatif('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Erreur lors de l\'enregistrement du paiement');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/payments')} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t('common.back', 'Retour')}
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {t('payments.newPayment', 'Enregistrer un Paiement')}
          </h1>
          <p className="text-sm text-slate-400 font-semibold">
            Saisie manuelle d'un versement de frais de scolarité
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Student Search */}
        <Card className="shadow-sm border border-slate-100 lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
            1. Sélectionner l'élève
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSelectedStudent(null); }}
              placeholder="Rechercher par nom ou matricule..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>

          {isLoadingStudents && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" /> Chargement...
            </div>
          )}

          {filteredStudents.length > 0 && !selectedStudent && (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {filteredStudents.map((s: any) => (
                <button
                  key={s.matricule}
                  onClick={() => { setSelectedStudent(s); setSearch(`${s.nom} ${s.prenom}`); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-digi-purple-bg transition-colors text-sm group"
                >
                  <span className="font-bold text-slate-800 group-hover:text-digi-purple">
                    {s.nom} {s.prenom}
                  </span>
                  <span className="block text-xs text-slate-400 font-mono">{s.matricule}</span>
                </button>
              ))}
            </div>
          )}

          {selectedStudent && (
            <div className="p-4 bg-digi-purple-bg rounded-xl border border-digi-purple/20 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-digi-purple" />
                <span className="font-bold text-digi-purple">Élève sélectionné</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {selectedStudent.nom} {selectedStudent.prenom}
              </p>
              <p className="text-xs text-slate-500 font-mono">{selectedStudent.matricule}</p>
              <div className="pt-2 border-t border-digi-purple/10 text-xs text-slate-600 space-y-1">
                <p>Déjà payé : <strong className="text-digi-success">{totalPaid.toLocaleString('fr-FR')} XAF</strong></p>
                <p>Tranches réglées : <strong>{trancheInfo.paidTranches.length > 0 ? trancheInfo.paidTranches.join(', ') : 'Aucune'}</strong></p>
                <p>Prochaine tranche : <strong className="text-digi-purple">Tranche {trancheInfo.nextTranche}</strong></p>
              </div>
            </div>
          )}
        </Card>

        {/* Right: Payment Form */}
        <Card className="shadow-sm border border-slate-100 lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
            2. Détails du paiement
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Auto tranche info */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-700">Tranche à couvrir</span>
                  <p className="text-2xl font-extrabold text-digi-purple mt-1">
                    Tranche {trancheInfo.nextTranche}
                  </p>
                </div>
                <CreditCard className="w-10 h-10 text-slate-300" />
              </div>
              {trancheInfo.paidTranches.length > 0 && (
                <p className="text-xs text-slate-500 mt-2">
                  ✅ Tranches déjà payées : {trancheInfo.paidTranches.map(t => `Tranche ${t}`).join(', ')}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Montant (XAF) *</label>
                <Input
                  type="number"
                  min="1"
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  placeholder="Ex: 65000"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Mode de paiement</label>
                <select
                  value={idMode}
                  onChange={(e) => setIdMode(e.target.value)}
                  className="w-full h-10 rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-digi-purple/50 focus:border-digi-purple"
                >
                  <option value="1">Espèces</option>
                  <option value="2">MTN Mobile Money</option>
                  <option value="3">Orange Money</option>
                  <option value="4">Virement Bancaire</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Référence / Justificatif (optionnel)</label>
              <Input
                type="text"
                value={justificatif}
                onChange={(e) => setJustificatif(e.target.value)}
                placeholder="Ex: TXN123456789"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-semibold">
                ❌ {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Paiement enregistré avec succès ! Un reçu a été généré.
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/payments')}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="w-full gap-2"
                disabled={!selectedStudent || !montant || submitting}
                isLoading={submitting}
              >
                <CreditCard className="w-4 h-4" />
                Enregistrer le paiement
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
export default PaymentEntryPage;
