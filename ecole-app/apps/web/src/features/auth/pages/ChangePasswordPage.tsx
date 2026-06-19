import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { useToast } from '../../../shared/components/ui/Toast';
import { api } from '../../../shared/lib/api';

// ─── Validation Schema ─────────────────────────────────────────────
const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, 'L\'ancien mot de passe doit contenir au moins 6 caractères'),
    newPassword: z
      .string()
      .min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'Le nouveau mot de passe doit être différent de l\'ancien',
    path: ['newPassword']
  });

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// ─── Component ──────────────────────────────────────────────────────
export const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema)
  });

  const changeMutation = useMutation({
    mutationFn: async (data: Omit<ChangePasswordInput, 'confirmPassword'>) => {
      const response = await api.post('/auth/change-password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        type: 'success',
        title: 'Mot de passe modifié',
        description: 'Votre mot de passe a été mis à jour avec succès.'
      });
      reset();
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error?.message ||
        'Échec de la modification. Vérifiez votre ancien mot de passe.';
      toast({
        type: 'danger',
        title: 'Erreur',
        description: msg
      });
    }
  });

  const onSubmit = (data: ChangePasswordInput) => {
    changeMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className="shadow-2xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-digi-purple" />

        <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-2">
          Modifier le mot de passe
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Pour des raisons de sécurité, choisissez un mot de passe d'au moins 6 caractères.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            type="password"
            label="Ancien mot de passe"
            placeholder="••••••••"
            error={errors.oldPassword?.message}
            {...register('oldPassword')}
          />

          <Input
            type="password"
            label="Nouveau mot de passe"
            placeholder="••••••••"
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />

          <Input
            type="password"
            label="Confirmer le nouveau mot de passe"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={changeMutation.isPending}
          >
            {changeMutation.isPending
              ? 'Enregistrement...'
              : 'Enregistrer le nouveau mot de passe'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-xs font-semibold text-slate-400 hover:text-digi-purple transition-colors"
          >
            Annuler et revenir
          </button>
        </div>
      </Card>
    </div>
  );
};
export default ChangePasswordPage;
