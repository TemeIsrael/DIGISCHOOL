import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';
import { Button } from '../../../shared/components/ui/Button';
import { LanguageSwitcher } from '../../../shared/components/LanguageSwitcher';
import { useAuth } from '../hooks/useAuth';
import { getRoleDashboardPath, useAuthStore } from '../store';
import { useToast } from '../../../shared/components/ui/Toast';

const loginFormSchema = z.object({
  login: z.string().min(3, 'auth.loginMinLength'),
  password: z.string().min(6, 'auth.passwordMinLength'),
  role: z.enum([
    'ADMIN_ROOT', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE', 'FONDATEUR',
    'DIRECTEUR', 'TEACHER', 'PARENT'
  ])
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      role: 'ADMIN_ROOT'
    }
  });

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await login(data);

      // Apply the user's saved language from the database
      if (response.user?.langue) {
        i18n.changeLanguage(response.user.langue);
      }

      // Store authentication data for all users (admin, teacher, parent)
      useAuthStore.getState().setAuth({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
      });

      // After successful login, validate role consistency for admin accounts
      const roleMap: Record<number, string> = {
        0: 'ADMIN_ROOT',
        1: 'ADMIN_INSCRIPTIONS',
        2: 'ADMIN_SCOLARITE',
        3: 'FONDATEUR',
        4: 'DIRECTEUR'
      };

      // For non-teacher/parent roles, verify typeAdmin matches selected role
      if (response.user.role !== 'TEACHER' && response.user.role !== 'PARENT') {
        const actualRole = roleMap[response.user.typeAdmin] ?? '';
        if (data.role !== actualRole) {
          toast({
            type: 'danger',
            title: t('auth.loginFailed', 'Échec de connexion'),
            description: t('auth.roleMismatch', 'Le rôle sélectionné ne correspond pas à votre compte.')
          });
          useAuthStore.getState().logout();
          return;
        }
      }

      // Navigate to the appropriate dashboard based on the authenticated user's role
      navigate(
        getRoleDashboardPath(
          response.user.role,
          response.user.typeAdmin,
          response.user.typePersonne
        )
      );
    } catch (e) {
      // Handled inside useAuth hook notifications
    }
  };

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-slate-800 relative">
      {/* Top right language switcher */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md mt-10 sm:mt-0">
        {/* Brand Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-extrabold text-digi-purple tracking-tight">{t('app.name')}</h1>
          <p className="text-sm font-semibold text-slate-500 mt-2">{t('app.slogan')}</p>
        </div>

        <Card className="shadow-2xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-digi-purple" />

          <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center mb-6">{t('auth.loginTitle')}</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label={t('auth.username')}
              placeholder={t('auth.usernamePlaceholder')}
              error={errors.login?.message ? t(errors.login.message) : undefined}
              {...register('login')}
            />

            <Input
              type={showPassword ? "text" : "password"}
              label={t('auth.password')}
              placeholder={t('auth.passwordPlaceholder')}
              error={errors.password?.message ? t(errors.password.message) : undefined}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
              {...register('password')}
            />

            <Select
              label={t('auth.role')}
              options={[
                { value: 'ADMIN_ROOT',        label: t('auth.roles.ADMIN_ROOT') },
                { value: 'ADMIN_INSCRIPTIONS', label: t('auth.roles.ADMIN_INSCRIPTIONS') },
                { value: 'ADMIN_SCOLARITE',    label: t('auth.roles.ADMIN_SCOLARITE') },
                { value: 'FONDATEUR',          label: t('auth.roles.FONDATEUR') },
                { value: 'DIRECTEUR',          label: t('auth.roles.DIRECTEUR') },
                { value: 'TEACHER',            label: t('auth.roles.TEACHER') },
                { value: 'PARENT',             label: t('auth.roles.PARENT') }
              ]}
              error={errors.role?.message ? t(errors.role.message) : undefined}
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
