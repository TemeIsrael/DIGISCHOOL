import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraduationCap, User, Mail, Hash, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../shared/components/ui/Button';
import { PublicNavbar } from '../shared/components/layout/PublicNavbar';
import { PublicFooter } from '../shared/components/layout/PublicFooter';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childMatricule: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to register
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicNavbar />

      <section className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-digi-purple to-digi-purple-dark flex items-center justify-center shadow-lg shadow-digi-purple/30">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {t('auth.registerTitle')}
            </h1>
            <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
              {t('auth.registerSubtitle')}
            </p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-5"
          >
            {/* Parent Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('auth.parentName')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  name="parentName"
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="Ex: NKOA Jean-Pierre"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
                />
              </div>
            </div>

            {/* Child Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('auth.childName')}
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  name="childName"
                  type="text"
                  required
                  value={formData.childName}
                  onChange={handleChange}
                  placeholder="Ex: NKOA Marie-Claire"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
                />
              </div>
            </div>

            {/* Child Matricule */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('auth.childMatricule')}
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  name="childMatricule"
                  type="text"
                  required
                  value={formData.childMatricule}
                  onChange={handleChange}
                  placeholder="Ex: EL-001"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="parent@email.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-digi-purple/20"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t('auth.validate')}
            </Button>

            {/* Back to Login */}
            <p className="text-center text-sm text-slate-500 font-medium pt-2">
              {t('auth.alreadyRegistered')}{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-digi-purple font-bold hover:underline"
              >
                {t('auth.loginHere')}
              </button>
            </p>
          </form>

          {/* Back Link */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
export default RegisterPage;
