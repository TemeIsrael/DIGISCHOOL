import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Card } from '../shared/components/ui/Card';
import { Input } from '../shared/components/ui/Input';
import { Button } from '../shared/components/ui/Button';
import { useToast } from '../shared/components/ui/Toast';

const registerSchema = z.object({
  nomParent: z.string().min(2, 'Le nom du parent doit faire au moins 2 caractères'),
  nomEnfant: z.string().min(2, 'Le nom de l\'enfant doit faire au moins 2 caractères'),
  matriculeEnfant: z.string().min(3, 'Le matricule doit contenir au moins 3 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères')
});

type RegisterInput = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (_data: RegisterInput) => {
    // Simulating user creation successfully
    try {
      toast({
        type: 'success',
        title: 'Inscription réussie',
        description: 'Votre demande d\'inscription a été envoyée pour vérification.'
      });
      navigate('/login');
    } catch (e) {
      toast({
        type: 'danger',
        title: 'Erreur',
        description: 'Une erreur s\'est produite. Veuillez réessayer.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="w-full max-w-lg">
        {/* Brand/Heading */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-extrabold text-digi-purple tracking-tight uppercase">
            Inscription
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-2">
            Rejoignez l'écosystème scolaire moderne DIGISCHOOL 2026
          </p>
        </div>

        <Card className="shadow-2xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-digi-purple" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nom du parent"
                placeholder="Ex. Jean Martin"
                error={errors.nomParent?.message}
                {...register('nomParent')}
              />
              <Input
                label="Nom de l'enfant"
                placeholder="Ex. Luc Martin"
                error={errors.nomEnfant?.message}
                {...register('nomEnfant')}
              />
            </div>

            <Input
              label="Matricule de l'enfant"
              placeholder="Ex. EL2026-991"
              error={errors.matriculeEnfant?.message}
              {...register('matriculeEnfant')}
            />

            <Input
              type="email"
              label="Adresse e-mail"
              placeholder="parent@exemple.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
              {isSubmitting ? 'Inscription...' : 'VALIDER L\'INSCRIPTION'}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400 font-semibold">
            Déjà inscrit ?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-digi-purple hover:underline"
            >
              Connectez-vous ici
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default RegisterPage;
