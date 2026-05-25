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
const forgotPasswordSchema = z.object({
  login: z.string().min(3, 'Le login doit contenir au moins 3 caractères')
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// ─── Component ──────────────────────────────────────────────────────
export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
        title: 'Demande envoyée',
        description: 'Votre demande de réinitialisation a été transmise à l\'administrateur.'
      });
      navigate('/login');
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error?.message ||
        'Une erreur est survenue lors de la demande. Veuillez réessayer.';
      toast({
        type: 'danger',
        title: 'Erreur',
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
          <h1 className="font-serif text-4xl font-extrabold text-digi-purple tracking-tight">DIGISCHOOL</h1>
          <p className="text-sm font-semibold text-slate-500 mt-2">Récupération de vos accès</p>
        </div>

        <Card className="shadow-2xl border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-digi-purple" />

          <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center mb-2">
            Mot de passe oublié
          </h2>
          <p className="text-xs text-slate-400 text-center mb-6">
            Entrez votre identifiant pour que votre administrateur réinitialise vos accès.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Nom d'utilisateur / Login"
              placeholder="Saisissez votre nom d'utilisateur"
              error={errors.login?.message}
              {...register('login')}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={forgotMutation.isPending}
            >
              {forgotMutation.isPending
                ? 'Envoi en cours...'
                : 'Demander la réinitialisation'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-slate-400 hover:text-digi-purple transition-colors"
            >
              Retour à la connexion
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
