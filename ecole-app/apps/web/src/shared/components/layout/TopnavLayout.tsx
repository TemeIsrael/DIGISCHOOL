import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './Navbar';

export interface TopnavLayoutProps {
  children: React.ReactNode;
}

export const TopnavLayout: React.FC<TopnavLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-8 border-t border-slate-100 bg-white/50 shrink-0">
        <p className="text-[10px] text-slate-300 font-semibold text-center">
          {t('footer.rights')}
        </p>
      </footer>
    </div>
  );
};
