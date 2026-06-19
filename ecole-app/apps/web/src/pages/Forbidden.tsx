import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../shared/components/ui/Button';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';

export const Forbidden: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 -right-20 w-72 h-72 bg-rose-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-20 w-64 h-64 bg-digi-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-lg w-full space-y-8 animate-fade-in">
        {/* Animated Shield SVG */}
        <div className="flex items-center justify-center">
          <svg width="200" height="180" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce-in">
            {/* Shield shape */}
            <path d="M100 15 L165 45 L165 95 C165 130 140 155 100 170 C60 155 35 130 35 95 L35 45 Z"
              fill="white" stroke="#E5E7EB" strokeWidth="2.5" />
            <path d="M100 25 L155 50 L155 93 C155 123 133 145 100 158 C67 145 45 123 45 93 L45 50 Z"
              fill="#FEF2F2" />
            {/* Lock icon on shield */}
            <rect x="82" y="82" width="36" height="28" rx="4" fill="#EF4444" opacity="0.15" stroke="#EF4444" strokeWidth="2" />
            <path d="M90 82 L90 72 C90 65 95 60 100 60 C105 60 110 65 110 72 L110 82"
              fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="100" cy="96" r="3" fill="#EF4444" />
            <line x1="100" y1="99" x2="100" y2="105" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            {/* Decorative crosses */}
            <g opacity="0.3">
              <line x1="20" y1="40" x2="30" y2="50" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              <line x1="30" y1="40" x2="20" y2="50" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g opacity="0.2">
              <line x1="170" y1="30" x2="180" y2="40" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              <line x1="180" y1="30" x2="170" y2="40" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            </g>
            {/* Small dots */}
            <circle cx="15" cy="120" r="3" fill="#AFA9EC" opacity="0.4" className="animate-pulse-soft" />
            <circle cx="185" cy="140" r="4" fill="#FCA5A5" opacity="0.4" className="animate-pulse-soft" />
          </svg>
        </div>

        {/* Content card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-4">
          <h1 className="text-6xl font-extrabold text-digi-danger tracking-tight">403</h1>
          <h2 className="text-xl font-bold text-slate-800">{t('errors.forbidden')}</h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            {t('errors.forbiddenDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              onClick={() => navigate('/dashboard')}
              leftIcon={<LayoutDashboard className="w-4 h-4" />}
            >
              Tableau de Bord
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
export default Forbidden;
