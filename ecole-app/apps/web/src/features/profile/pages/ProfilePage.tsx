import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../features/auth/store';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { User, Mail, Camera, Shield, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../../../shared/components/ui/Toast';
import { api } from '../../../shared/lib/api';

// ─── Validation Schema for Password ────────────────────────────────
const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, 'L\'ancien mot de passe doit contenir au moins 6 caractères'),
    newPassword: z
      .string()
      .min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'Le nouveau mot de passe doit être différent de l\'ancien',
    path: ['newPassword']
  });

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(user?.nom || '');
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.login?.toUpperCase() || '');
  // Initialiser la photo depuis le store (photo déjà enregistrée)
  const [photo, setPhoto] = useState<string | null>(user?.photoUrl || null);
  const [saved, setSaved] = useState(false);

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile', { nom: name, email, login: username, photoUrl: photo });
      // Persister dans le store (affiché partout : Topbar, Avatar, etc.)
      updateUser({ nom: name, email, login: username, photoUrl: photo ?? undefined });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      toast({
        type: 'success',
        title: 'Profil mis à jour',
        description: 'Vos informations ont été enregistrées avec succès.'
      });
    } catch (err) {
      toast({
        type: 'danger',
        title: 'Erreur',
        description: 'Impossible de sauvegarder le profil.'
      });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        title: 'Mot de passe modifié',
        description: 'Votre mot de passe a été mis à jour avec succès.'
      });
      reset();
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error?.message ||
        'Échec de la modification. Vérifiez votre ancien mot de passe.';
      toast({
        type: 'danger',
        title: 'Erreur',
        description: msg
      });
    }
  });

  const onSubmitPassword = (data: ChangePasswordInput) => {
    changeMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('profile.title', 'Mon Profil')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('profile.subtitle', 'Gérez vos informations personnelles et votre sécurité')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonne Avatar */}
        <Card className="md:col-span-1 flex flex-col items-center text-center p-6 space-y-4 self-start">
          <div className="relative group">
            <Avatar
              name={name || user?.login || 'U'}
              src={photo || undefined}
              size="lg"
            />
            <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <Camera className="w-6 h-6" />
              <span className="text-[10px] font-bold mt-1 uppercase">Modifier</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{name || user?.login}</h3>
            <p className="text-sm font-semibold text-digi-purple flex items-center justify-center gap-1 mt-1">
              <Shield className="w-4 h-4" />
              {user?.role}
            </p>
          </div>
          {photo && (
            <p className="text-xs text-emerald-600 font-semibold">
              📸 Photo sélectionnée — cliquez sur « Enregistrer »
            </p>
          )}
        </Card>

        {/* Colonne Formulaires */}
        <div className="md:col-span-2 space-y-8">
          {/* Informations Personnelles */}
          <Card className="p-6">
            <form onSubmit={handleSaveInfo} className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Informations Personnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label={t('profile.name', 'Nom complet')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                />
                <Input
                  label={t('profile.username', "Nom d'utilisateur")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toUpperCase())}
                  leftIcon={<User className="w-4 h-4" />}
                />
                <Input
                  type="email"
                  label={t('profile.email', 'E-mail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                  className="md:col-span-2"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button type="submit" variant="primary">
                  {saved ? '✅ Enregistré !' : t('profile.save', 'Enregistrer les modifications')}
                </Button>
              </div>
            </form>
          </Card>

          {/* Mot de passe */}
          <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Key className="w-4 h-4" />
                Sécurité et Mot de passe
              </h3>
              
              <div className="space-y-5">
                <Input
                  type="password"
                  label="Ancien mot de passe"
                  placeholder="••••••••"
                  error={errors.oldPassword?.message}
                  {...register('oldPassword')}
                />

                <Input
                  type="password"
                  label="Nouveau mot de passe"
                  placeholder="••••••••"
                  error={errors.newPassword?.message}
                  {...register('newPassword')}
                />

                <Input
                  type="password"
                  label="Confirmer le nouveau mot de passe"
                  placeholder="••••••••"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={changeMutation.isPending}
                >
                  {changeMutation.isPending
                    ? 'Modification...'
                    : 'Modifier le mot de passe'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
