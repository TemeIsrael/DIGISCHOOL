import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../features/auth/store';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { User, Mail, Camera, Shield, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.nom || '');
  const [email, setEmail] = useState((user as any)?.email || '');
  const [username, setUsername] = useState(user?.login || '');
  // Initialiser la photo depuis le store (photo déjà enregistrée)
  const [photo, setPhoto] = useState<string | null>((user as any)?.photoUrl || (user as any)?.photoURL || null);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Persister dans le store (affiché partout : Topbar, Avatar, etc.)
    updateUser({ nom: name, email, login: username, photoUrl: photo } as any);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('profile.title', 'Mon Profil')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('profile.subtitle', 'Gérez vos informations personnelles')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 flex flex-col items-center text-center p-6 space-y-4">
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

        <Card className="md:col-span-2 p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">Informations Personnelles</h3>
            
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
                onChange={(e) => setUsername(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
              />
              <Input
                type="email"
                label={t('profile.email', 'E-mail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={() => navigate('/change-password')} className="gap-2 mr-auto text-slate-600 hover:text-slate-800">
                <Key className="w-4 h-4" />
                {t('profile.changePassword', 'Changer le mot de passe')}
              </Button>
              <Button type="submit" variant="primary">
                {saved ? '✅ Enregistré !' : t('profile.save', 'Enregistrer les modifications')}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
