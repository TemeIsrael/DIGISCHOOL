import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';
import { Button } from '../../../shared/components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const loginFormSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'])
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export const LoginPage: React.FC = () => {
  const { login: performLogin, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      role: 'ADMIN'
    }
  });

  const onSubmit = async (data: LoginFormInput) => {
    try {
      await performLogin(data);
      navigate('/dashboard');
    } catch (e) {
      // Handled inside useAuth hook notifications
    }
  };

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="w-full max-w-md">
        {/* Brand Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-extrabold text-digi-purple tracking-tight">{t('app.name')}</h1>
          <p className="text-sm font-semibold text-slate-500 mt-2">{t('app.slogan2026')}</p>
        </div>

        <Card className="shadow-2xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-digi-purple" />
          
          <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center mb-6">{t('auth.loginTitle')}</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label={t('auth.usernameLabel')}
              placeholder={t('auth.usernamePlaceholder')}
              error={errors.login?.message ? t('auth.validationLoginMin') : undefined}
              {...register('login')}
            />

            <Input
              type="password"
              label={t('auth.password')}
              placeholder="••••••••"
              error={errors.password?.message ? t('auth.validationPasswordMin') : undefined}
              {...register('password')}
            />

            <Select
              label={t('auth.role')}
              options={[
                { value: 'ADMIN', label: t('auth.roleAdmin') },
                { value: 'TEACHER', label: t('auth.roleTeacher') },
                { value: 'PARENT', label: t('auth.roleParent') },
                { value: 'STUDENT', label: t('auth.roleStudent') }
              ]}
              error={errors.role?.message}
              {...register('role')}
            />

            <Button type="submit" className="w-full mt-2" disabled={isLoggingIn}>
              {isLoggingIn ? t('auth.loggingIn') : t('auth.login')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/forgot-password')}
              className="text-xs font-semibold text-slate-400 hover:text-digi-purple transition-colors"
            >
              {t('auth.forgotPassword')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default LoginPage;
