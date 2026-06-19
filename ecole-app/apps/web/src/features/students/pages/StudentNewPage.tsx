import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { useStudents } from '../hooks/useStudents';
import { useToast } from '../../../shared/components/ui/Toast';
import { Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { usePermissions } from '../../auth/hooks/usePermissions';

export const StudentNewPage: React.FC = () => {
  const { registerStudent } = useStudents();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { canAddPersonnelOrStudentsOrSchedules } = usePermissions();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [photoUrl, setPhotoUrl] = useState('');
  
  // We keep all data in a single form
  const { register, handleSubmit, trigger } = useForm();

  const handleNextStep = async () => {
    // Validate Step 1 fields before proceeding
    const isValid = await trigger(['nom', 'prenom', 'matricule', 'dateNaissance', 'idVilleNaissance', 'langue', 'idSalle', 'idAcademi', 'idQuartier']);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await registerStudent({
        matricule: data.matricule,
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        idVilleNaissance: data.idVilleNaissance,
        langue: data.langue || 'fr',
        idSalle: data.idSalle,
        idAcademi: data.idAcademi,
        idQuartier: data.idQuartier,
        photoURL: photoUrl || undefined,
        // Parent Info
        parentInfo: {
          nom: data.parentNom,
          prenom: data.parentPrenom,
          email: data.parentEmail,
          telephone: data.parentPhone,
        }
      });
      
      toast({ type: 'success', title: t('common.success'), description: "L'élève et son parent ont été inscrits avec succès. Un email a été envoyé." });
      navigate('/students');
    } catch (err: any) {
      toast({ type: 'danger', title: t('common.error'), description: err.response?.data?.error?.message || t('common.error') });
    }
  };

  if (!canAddPersonnelOrStudentsOrSchedules) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Accès Refusé</h2>
        <p className="text-slate-500 mt-2">Vous n'avez pas l'autorisation d'ajouter un élève.</p>
        <Button onClick={() => navigate('/students')} className="mt-4">Retour</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">{t('students.newStudent', 'Nouvel Élève')}</h1>
        <div className="flex gap-2">
          <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-digi-purple' : 'bg-slate-200'}`} />
          <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-digi-purple' : 'bg-slate-200'}`} />
        </div>
      </div>

      <Card className="shadow-sm border border-slate-100 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="relative group shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-6 h-6 text-slate-300" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-[10px] text-white font-bold uppercase tracking-wider">{t('common.edit', 'Modifier')}</span>
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
                            setPhotoUrl(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{t('common.photo', 'Photo')}</p>
                  <p className="text-xs text-slate-500">{t('common.clickToAdd', 'Cliquez pour ajouter')}</p>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('students.detail', 'Détails')}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Input label={t('students.nom', 'Nom')} placeholder="Ex. NDJE" required {...register('nom')} />
                <Input label={t('students.prenom', 'Prénom')} placeholder="Ex. Paul" required {...register('prenom')} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input label={t('students.matricule', 'Matricule')} placeholder="Ex. EL2026-001" required {...register('matricule')} />
                <Input type="date" label={t('students.dateNaissance', 'Date de Naissance')} required {...register('dateNaissance')} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Ville de Naissance" placeholder="Ex. Yaoundé" required {...register('idVilleNaissance')} />
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Langue *</label>
                  <select required {...register('langue')} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none transition-all bg-white">
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-6">{t('students.assign', 'Affectation')}</h3>
              <div className="grid grid-cols-3 gap-4">
                <Input label="Classe (Salle)" placeholder="Ex. SIL A" required {...register('idSalle')} />
                <Input label="Année Académique" placeholder="Ex. 2025-2026" required {...register('idAcademi')} />
                <Input label="Quartier (Résidence)" placeholder="Ex. Bastos" required {...register('idQuartier')} />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={() => navigate('/students')}>{t('common.cancel', 'Annuler')}</Button>
                <Button type="button" onClick={handleNextStep} className="gap-2">
                  Informations du Parent <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Informations du Parent</h3>
                <p className="text-xs text-slate-500">Un compte Parent sera créé et les accès envoyés par email.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input label="Nom du parent" placeholder="Ex. NDJE" required {...register('parentNom')} />
                <Input label="Prénom du parent" placeholder="Ex. Jean" {...register('parentPrenom')} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input type="email" label="Adresse Email" placeholder="jean.ndje@example.com" required {...register('parentEmail')} />
                <Input type="tel" label="Téléphone" placeholder="+237 600 000 000" required {...register('parentPhone')} />
              </div>

              <div className="flex justify-between gap-4 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Retour
                </Button>
                <Button type="submit" variant="primary">
                  Finaliser l'inscription
                </Button>
              </div>
            </div>
          )}

        </form>
      </Card>
    </div>
  );
};

export default StudentNewPage;
