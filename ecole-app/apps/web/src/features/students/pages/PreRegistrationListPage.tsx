import React, { useEffect, useState } from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { useStudents } from '../hooks/useStudents';
import { useToast } from '../../../shared/components/ui/Toast';
import { ClipboardCheck, X, CheckCircle, Clock, UserPlus } from 'lucide-react';

export const PreRegistrationListPage: React.FC = () => {
  const { preRegistrations, refetchPreRegistrations, validatePreRegistration, rejectPreRegistration } = useStudents();
  const { toast } = useToast();
  const [validating, setValidating] = useState<string | null>(null);
  const [formData, setFormData] = useState({ matricule: '', idSalle: '', idAcademi: '' });

  useEffect(() => {
    refetchPreRegistrations();
  }, []);

  const handleValidate = async (tempMatricule: string) => {
    try {
      await validatePreRegistration({
        tempMatricule,
        data: {
          matricule: formData.matricule,
          idSalle: Number(formData.idSalle),
          idAcademi: Number(formData.idAcademi)
        }
      });
      toast({ type: 'success', title: 'Validée', description: 'Préinscription validée — élève inscrit.' });
      setValidating(null);
      setFormData({ matricule: '', idSalle: '', idAcademi: '' });
    } catch (err: any) {
      toast({ type: 'danger', title: 'Erreur', description: err.response?.data?.error?.message || 'Erreur' });
    }
  };

  const handleReject = async (tempMatricule: string) => {
    if (!confirm('Voulez-vous vraiment rejeter cette préinscription ?')) return;
    try {
      await rejectPreRegistration(tempMatricule);
      toast({ type: 'success', title: 'Rejetée', description: 'Préinscription rejetée.' });
    } catch (err: any) {
      toast({ type: 'danger', title: 'Erreur', description: err.response?.data?.error?.message || 'Erreur' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <ClipboardCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Préinscriptions en attente</h1>
          <p className="text-sm text-slate-400 font-semibold">Validez ou rejetez les demandes soumises par les parents</p>
        </div>
      </div>

      {preRegistrations.length === 0 ? (
        <Card className="shadow-sm border border-slate-100 text-center py-12">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <p className="text-slate-500 font-semibold">Aucune préinscription en attente</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {preRegistrations.map((pre: any) => (
            <Card key={pre.matricule} className="shadow-sm border border-slate-100">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-slate-800">{pre.nom} {pre.prenom}</span>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                      <Clock className="w-3 h-3 inline mr-1" />PRÉ-INSCRIT
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Né(e) le {pre.dateNaissance} — Langue: {pre.langue}</p>
                  <p className="text-xs text-slate-400 font-mono">Ref: {pre.matricule}</p>
                  {pre.parents?.[0]?.personne && (
                    <p className="text-sm text-slate-500">
                      Parent: <span className="font-semibold">{pre.parents[0].personne.login}</span>
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {validating === pre.matricule ? (
                    <Button variant="outline" size="sm" onClick={() => setValidating(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  ) : (
                    <>
                      <Button variant="primary" size="sm" onClick={() => setValidating(pre.matricule)}>
                        Valider
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleReject(pre.matricule)} className="text-red-600 border-red-200 hover:bg-red-50">
                        Rejeter
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Inline validation form */}
              {validating === pre.matricule && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Finaliser l'inscription</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      label="Matricule définitif"
                      placeholder="EL2026-001"
                      required
                      value={formData.matricule}
                      onChange={(e: any) => setFormData({ ...formData, matricule: e.target.value })}
                    />
                    <Input
                      type="number"
                      label="ID Salle"
                      required
                      value={formData.idSalle}
                      onChange={(e: any) => setFormData({ ...formData, idSalle: e.target.value })}
                    />
                    <Input
                      type="number"
                      label="ID Année Académique"
                      required
                      value={formData.idAcademi}
                      onChange={(e: any) => setFormData({ ...formData, idAcademi: e.target.value })}
                    />
                  </div>
                  <Button variant="primary" onClick={() => handleValidate(pre.matricule)}>
                    <CheckCircle className="w-4 h-4 mr-2" /> Confirmer l'inscription
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default PreRegistrationListPage;
