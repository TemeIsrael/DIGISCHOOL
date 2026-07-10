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
type RoleValue = LoginFormInput['role'];

const slides = [
  { src: '/images/ecole1.jpg', caption: 'Un espace d\'apprentissage bienveillant' },
  { src: '/images/ecole2.jpg', caption: 'Des élèves épanouis, avenir radieux' },
  { src: '/images/ecole3.jpg', caption: 'La salle de classe, lieu de tous les possibles' },
  { src: '/images/ecole4.jpg', caption: 'Encadrement de qualité, réussite garantie' },
];

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { login, isLoggingIn } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { role: 'ADMIN_ROOT' }
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
    } catch (_) {
      // handled by useAuth
    }
  };

  return (
    <div className="min-h-screen flex text-slate-800">

      {/* ═══ GAUCHE : Slider plein écran ═══ */}
      <div className="hidden lg:flex lg:flex-1 flex-col relative overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: idx === current ? 1 : 0,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Texte en bas */}
        <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
          <p className="text-white text-2xl font-bold leading-snug drop-shadow-lg">
            {slides[current].caption}
          </p>
          <div className="flex gap-2 mt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === current ? 'bg-white w-8' : 'bg-white/40 w-4'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Titre appli en haut */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-white text-3xl font-extrabold tracking-tight drop-shadow-lg">
            {t('app.name')}
          </h1>
          <p className="text-white/80 text-sm font-semibold mt-1">{t('app.slogan')}</p>
        </div>
      </div>

      {/* ═══ DROITE : Formulaire ═══ */}
      <div className="w-full lg:w-[520px] bg-digi-bg flex flex-col justify-center p-8 sm:p-12 relative overflow-y-auto">
        <div className="absolute top-5 right-5">
          <LanguageSwitcher />
        </div>

        <div className="w-full max-w-md mx-auto">
          {/* Titre mobile */}
          <div className="text-center mb-8 lg:hidden">
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
                type={showPassword ? 'text' : 'password'}
                label={t('auth.password')}
                placeholder={t('auth.passwordPlaceholder')}
                error={errors.password?.message ? t(errors.password.message) : undefined}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
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
                  { value: 'PARENT',             label: t('auth.roles.PARENT') },
                ]}
                error={errors.role?.message ? t(errors.role.message) : undefined}
                {...register('role')}
              />

              <Button type="submit" className="w-full mt-2" disabled={isLoggingIn}>
                {isLoggingIn ? t('auth.loggingIn') : t('auth.login')}
              </Button>
            </form>

            <div className="mt-4 text-center">
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
    </div>
  );
};

export default LoginPage;
