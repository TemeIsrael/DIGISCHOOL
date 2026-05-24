import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';
import { Button } from '../../../shared/components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const loginFormSchema = z.object({
  login: z.string().min(3, 'Le login doit contenir au moins 3 caractères'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  role: z.enum(['ADMIN', 'TEACHER', 'PARENT', 'STUDENT'])
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export const LoginPage: React.FC = () => {
  const { login: performLogin, isLoggingIn } = useAuth();
  const navigate = useNavigate();

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
          <h1 className="font-serif text-4xl font-extrabold text-digi-purple tracking-tight">DIGISCHOOL</h1>
          <p className="text-sm font-semibold text-slate-500 mt-2">Votre écosystème scolaire connecté en 2026</p>
        </div>

        <Card className="shadow-2xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-digi-purple" />
          
          <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center mb-6">Connexion</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Nom d'utilisateur / Login"
              placeholder="Saisissez votre nom d'utilisateur"
              error={errors.login?.message}
              {...register('login')}
            />

            <Input
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <Select
              label="Rôle / Espace"
              options={[
                { value: 'ADMIN', label: 'Administrateur / Direction' },
                { value: 'TEACHER', label: 'Espace Enseignant' },
                { value: 'PARENT', label: 'Espace Parent' },
                { value: 'STUDENT', label: 'Espace Élève' }
              ]}
              error={errors.role?.message}
              {...register('role')}
            />

            <Button type="submit" className="w-full mt-2" disabled={isLoggingIn}>
              {isLoggingIn ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/forgot-password')}
              className="text-xs font-semibold text-slate-400 hover:text-digi-purple transition-colors"
            >
              Mot de passe oublié ?
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default LoginPage;
