import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Card } from '../shared/components/ui/Card';
import { Input } from '../shared/components/ui/Input';
import { Button } from '../shared/components/ui/Button';
import { useToast } from '../shared/components/ui/Toast';

const registerSchema = z.object({
  nomParent: z.string().min(2),
  nomEnfant: z.string().min(2),
  matriculeEnfant: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

type RegisterInput = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (_data: RegisterInput) => {
    try {
      toast({
        type: 'success',
        title: t('auth.toastRegisterSuccess'),
        description: t('auth.toastRegisterSuccessDesc')
      });
      navigate('/login');
    } catch (e) {
      toast({
        type: 'danger',
        title: t('auth.toastRegisterError'),
        description: t('auth.toastRegisterErrorDesc')
      });
    }
  };

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="w-full max-w-lg">
        {/* Brand/Heading */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-extrabold text-digi-purple tracking-tight uppercase">
            {t('auth.registerTitle')}
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-2">
            {t('auth.registerSubtitle')}
          </p>
        </div>

        <Card className="shadow-2xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-digi-purple" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t('auth.parentName')}
                placeholder={t('auth.parentNamePlaceholder')}
                error={errors.nomParent?.message ? t('auth.validationParentNameMin') : undefined}
                {...register('nomParent')}
              />
              <Input
                label={t('auth.childName')}
                placeholder={t('auth.childNamePlaceholder')}
                error={errors.nomEnfant?.message ? t('auth.validationChildNameMin') : undefined}
                {...register('nomEnfant')}
              />
            </div>

            <Input
              label={t('auth.childMatricule')}
              placeholder={t('auth.childMatriculePlaceholder')}
              error={errors.matriculeEnfant?.message ? t('auth.validationMatriculeMin') : undefined}
              {...register('matriculeEnfant')}
            />

            <Input
              type="email"
              label={t('auth.email')}
              placeholder={t('auth.emailPlaceholder')}
              error={errors.email?.message ? t('auth.validationEmailInvalid') : undefined}
              {...register('email')}
            />

            <Input
              type="password"
              label={t('auth.password')}
              placeholder="••••••••"
              error={errors.password?.message ? t('auth.validationPasswordMin') : undefined}
              {...register('password')}
            />

            <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
              {isSubmitting ? t('auth.registering') : t('auth.validate')}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400 font-semibold">
            {t('auth.alreadyRegistered')}{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-digi-purple hover:underline"
            >
              {t('auth.loginHere')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default RegisterPage;
