import React, { useState, useEffect } from 'react';
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
import { getRoleDashboardPath } from '../store';

const loginFormSchema = z.object({
  login: z.string().min(3, 'auth.loginMinLength'),
  password: z.string().min(6, 'auth.passwordMinLength'),
  role: z.enum([
    'ADMIN_ROOT', 'ADMIN_INSCRIPTIONS', 'ADMIN_SCOLARITE', 'FONDATEUR',
    'DIRECTEUR', 'TEACHER', 'PARENT'
  ])
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

const backgroundImages = [
  '/images/ecole1.jpg',
  '/images/ecole2.jpg',
  '/images/ecole3.jpg'
];

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { login, isLoggingIn } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      if (response.user?.langue) {
        i18n.changeLanguage(response.user.langue);
      }
      navigate(
        getRoleDashboardPath(
          response.user.role,
          response.user.typeAdmin,
          response.user.typePersonne
        )
      );
    } catch (e) {
      // Error is handled by useAuth
    }
  };

  return (
    <div className="min-h-screen flex text-slate-800 relative">
      {/* Left side: Animated Background Images */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-digi-purple/80 to-digi-purple/40 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col justify-center p-16 text-white z-10">
          <h1 className="text-5xl font-extrabold mb-6">L'Éducation au Coeur de l'Avenir</h1>
          <p className="text-xl max-w-lg font-medium opacity-90">
            Une plateforme complète pour la gestion du primaire et de la maternelle. Connectez-vous pour accéder à votre espace numérique.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-[550px] bg-digi-bg flex flex-col justify-center p-8 sm:p-12 relative">
        <div className="absolute top-6 right-6">
          <LanguageSwitcher />
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl font-extrabold text-digi-purple tracking-tight">{t('app.name')}</h1>
            <p className="text-sm font-semibold text-slate-500 mt-2">{t('app.slogan')}</p>
          </div>

          <Card className="shadow-xl border border-slate-100 overflow-hidden relative p-8">
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
                    className="focus:outline-none text-slate-400 hover:text-slate-600"
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

          {/* ═══ Demo Accounts ═══ */}
          <div className="mt-8 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 text-center mb-4">Comptes de Démonstration</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { role: 'ADMIN', username: 'admin', password: 'admin123' },
                { role: 'INSCRIPTIONS', username: 'insc', password: 'insc123' },
                { role: 'SCOLARITE', username: 'scol', password: 'scol123' },
                { role: 'TEACHER', username: 'teacher', password: 'teach123' },
                { role: 'PARENT', username: 'parent', password: 'parent123' },
                { role: 'STUDENT', username: 'student', password: 'stud123' },
              ].map((account, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-lg p-2 text-center shadow-sm">
                  <div className="font-bold text-digi-purple mb-1 truncate">{account.role}</div>
                  <div className="text-slate-600">U: <span className="font-semibold uppercase">{account.username}</span></div>
                  <div className="text-slate-600">P: <span className="font-semibold">{account.password}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
