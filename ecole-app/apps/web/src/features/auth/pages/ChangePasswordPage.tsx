import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { useToast } from '../../../shared/components/ui/Toast';
import { api } from '../../../shared/lib/api';

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'mismatch',
    path: ['confirmPassword']
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'same',
    path: ['newPassword']
  });

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

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
        title: t('auth.toastPasswordChanged'),
        description: t('auth.toastPasswordChangedDesc')
      });
      reset();
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error?.message ||
        t('auth.toastPasswordErrorDesc');
      toast({
        type: 'danger',
        title: t('auth.toastPasswordError'),
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

  const getErrorMessage = (field: 'oldPassword' | 'newPassword' | 'confirmPassword') => {
    const err = errors[field];
    if (!err?.message) return undefined;
    if (err.message === 'mismatch') return t('auth.validationPasswordsMismatch');
    if (err.message === 'same') return t('auth.validationPasswordSame');
    if (field === 'oldPassword') return t('auth.validationOldPasswordMin');
    if (field === 'newPassword') return t('auth.validationNewPasswordMin');
    return t('auth.validationPasswordMin');
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className="shadow-2xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-digi-purple" />

        <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-2">
          {t('auth.changePasswordTitle')}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          {t('auth.changePasswordSubtitle')}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            type="password"
            label={t('auth.oldPassword')}
            placeholder="••••••••"
            error={getErrorMessage('oldPassword')}
            {...register('oldPassword')}
          />

          <Input
            type="password"
            label={t('auth.newPassword')}
            placeholder="••••••••"
            error={getErrorMessage('newPassword')}
            {...register('newPassword')}
          />

          <Input
            type="password"
            label={t('auth.confirmPassword')}
            placeholder="••••••••"
            error={getErrorMessage('confirmPassword')}
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={changeMutation.isPending}
          >
            {changeMutation.isPending
              ? t('auth.saving')
              : t('auth.saveNewPassword')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-xs font-semibold text-slate-400 hover:text-digi-purple transition-colors"
          >
            {t('auth.cancelAndReturn')}
          </button>
        </div>
      </Card>
    </div>
  );
};
export default ChangePasswordPage;
