import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PublicFooter: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-slate-100 py-12 px-6 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-lg font-black text-digi-purple tracking-tight">DIGISCHOOL</span>
          <p className="text-xs text-slate-400 font-semibold">{t('footer.rights')}</p>
        </div>

        <div className="flex gap-8 text-xs font-bold text-slate-500">
          <span
            className="hover:text-digi-purple cursor-pointer transition-colors"
            onClick={() => navigate('/a-propos')}
          >
            {t('footer.about')}
          </span>
          <span
            className="hover:text-digi-purple cursor-pointer transition-colors"
            onClick={() => navigate('/aide')}
          >
            {t('footer.help')}
          </span>
          <span
            className="hover:text-digi-purple cursor-pointer transition-colors"
            onClick={() => navigate('/contact')}
          >
            {t('footer.contact')}
          </span>
        </div>
      </div>
    </footer>
  );
};
