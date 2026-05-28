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

const forgotPasswordSchema = z.object({
  login: z.string().min(3)
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const forgotMutation = useMutation({
    mutationFn: async (data: ForgotPasswordInput) => {
      const response = await api.post('/auth/forgot-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        type: 'success',
        title: t('auth.toastResetSent'),
        description: t('auth.toastResetSentDesc')
      });
      navigate('/login');
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error?.message ||
        t('auth.toastResetErrorDesc');
      toast({
        type: 'danger',
        title: t('auth.toastResetError'),
        description: msg
      });
    }
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="w-full max-w-md">
        {/* Brand Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-extrabold text-digi-purple tracking-tight">{t('app.name')}</h1>
          <p className="text-sm font-semibold text-slate-500 mt-2">{t('auth.forgotPasswordRecovery')}</p>
        </div>

        <Card className="shadow-2xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-digi-purple" />

          <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center mb-2">
            {t('auth.forgotPasswordTitle')}
          </h2>
          <p className="text-xs text-slate-400 text-center mb-6">
            {t('auth.forgotPasswordSubtitle')}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label={t('auth.usernameLabel')}
              placeholder={t('auth.usernamePlaceholder')}
              error={errors.login?.message ? t('auth.validationLoginMin') : undefined}
              {...register('login')}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={forgotMutation.isPending}
            >
              {forgotMutation.isPending
                ? t('auth.sending')
                : t('auth.requestReset')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-slate-400 hover:text-digi-purple transition-colors"
            >
              {t('auth.backToLogin')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
