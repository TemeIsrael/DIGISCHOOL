import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { useStudents } from '../hooks/useStudents';
import { useToast } from '../../../shared/components/ui/Toast';

export const StudentNewPage: React.FC = () => {
  const { registerStudent } = useStudents();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await registerStudent({
        matricule: data.matricule,
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance,
        idVilleNaissance: Number(data.idVilleNaissance),
        langue: data.langue || 'fr',
        idSalle: Number(data.idSalle),
        idAcademi: Number(data.idAcademi),
        idPersParent: data.idPersParent ? Number(data.idPersParent) : undefined,
        idQuartier: Number(data.idQuartier)
      });
      toast({ type: 'success', title: t('students.toastEnrollSuccess'), description: t('students.toastEnrollSuccessDesc') });
      navigate('/students');
    } catch (err: any) {
      toast({ type: 'danger', title: t('students.toastEnrollError'), description: err.response?.data?.error?.message || t('students.toastEnrollErrorDesc') });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">{t('students.newEnrollment')}</h1>
      <Card className="shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('students.civilStatus')}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('students.nom')} placeholder={t('students.namePlaceholder')} required {...register('nom')} />
            <Input label={t('students.prenom')} placeholder={t('students.firstNamePlaceholder')} required {...register('prenom')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('students.matricule')} placeholder={t('students.matriculePlaceholder')} required {...register('matricule')} />
            <Input type="date" label={t('students.dateNaissance')} required {...register('dateNaissance')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" label={t('students.birthCityId')} required {...register('idVilleNaissance')} />
            <Input label={t('students.languageLabel')} defaultValue="fr" required {...register('langue')} />
          </div>

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-6">{t('students.academicAssignment')}</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input type="number" label={t('students.roomId')} required {...register('idSalle')} />
            <Input type="number" label={t('students.academicYearId')} required {...register('idAcademi')} />
            <Input type="number" label={t('students.residenceDistrictId')} required {...register('idQuartier')} />
          </div>

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-6">{t('students.parentOptional')}</h3>
          <Input type="number" label={t('students.parentPersonId')} {...register('idPersParent')} />

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/students')}>{t('students.cancelBtn')}</Button>
            <Button type="submit">{t('students.validateEnrollment')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default StudentNewPage;
