import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../shared/components/ui/Button';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-digi-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-digi-purple/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-lg w-full space-y-8 animate-fade-in">
        {/* Animated 404 SVG illustration */}
        <div className="flex items-center justify-center">
          <svg width="260" height="160" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-in">
            {/* Page with fold */}
            <rect x="70" y="20" width="120" height="130" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2" />
            <path d="M150 20 L190 60 L150 60 Z" fill="#EEEDFE" stroke="#E5E7EB" strokeWidth="1.5" />
            {/* Lines on page */}
            <rect x="90" y="72" width="80" height="6" rx="3" fill="#EEEDFE" />
            <rect x="90" y="86" width="60" height="6" rx="3" fill="#EEEDFE" />
            <rect x="90" y="100" width="70" height="6" rx="3" fill="#EEEDFE" />
            {/* Question mark */}
            <text x="130" y="55" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="22" fill="#534AB7">?</text>
            {/* Magnifier */}
            <circle cx="200" cy="110" r="25" fill="none" stroke="#534AB7" strokeWidth="3" opacity="0.6" />
            <line x1="219" y1="129" x2="238" y2="148" stroke="#534AB7" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            {/* Small decorative dots */}
            <circle cx="45" cy="60" r="4" fill="#AFA9EC" opacity="0.5" className="animate-pulse-soft" />
            <circle cx="30" cy="100" r="3" fill="#AFA9EC" opacity="0.3" />
            <circle cx="240" cy="40" r="5" fill="#AFA9EC" opacity="0.4" className="animate-pulse-soft" />
          </svg>
        </div>

        {/* Content card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-4">
          <h1 className="text-6xl font-extrabold text-digi-purple tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-800">{t('errors.notFound')}</h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            {t('errors.notFoundDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              leftIcon={<Home className="w-4 h-4" />}
            >
              {t('errors.backHome')}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Page précédente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
