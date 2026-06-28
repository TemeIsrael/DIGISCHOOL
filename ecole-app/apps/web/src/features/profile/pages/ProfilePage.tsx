import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../features/auth/store';
import { Avatar } from '../../../shared/components/ui/Avatar';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuthStore();

  const [name, setName] = useState(user?.nom || '');
  const [email, setEmail] = useState((user as any)?.email || '');
  const [photo, setPhoto] = useState<string | null>(null);

  const handleSave = () => {
    updateUser({ nom: name, email } as any);
    // In a real app you would also upload the photo
    alert(t('profile.saved', 'Profil mis à jour'));
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
    <div className="max-w-2xl mx-auto p-6 glass-bg rounded-xl shadow-lg mt-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">{t('profile.title', 'Mon Profil')}</h1>
      <div className="flex items-center gap-4 mb-6">
        <Avatar
          name={name || user?.login || 'U'}
          src={photo || undefined}
          size="lg"
        />
        <label className="cursor-pointer text-digi-purple underline">
          {t('profile.changePhoto', 'Changer la photo')}
          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </label>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600">{t('profile.name', 'Nom')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-digi-purple"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600">{t('profile.email', 'E‑mail')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-digi-purple"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-digi-purple text-white rounded-md hover:bg-digi-purple/80 transition-colors"
        >
          {t('profile.save', 'Enregistrer')}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
