import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button } from '../shared/components/ui/Button';
import { Card } from '../shared/components/ui/Card';
import { PublicNavbar } from '../shared/components/layout/PublicNavbar';
import { PublicFooter } from '../shared/components/layout/PublicFooter';
import { useTranslation } from 'react-i18next';

export const About: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicNavbar />

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto p-8 space-y-8 flex-1">
        <Card className="shadow-lg border border-slate-100 p-8 space-y-6">
          <GraduationCap className="w-12 h-12 text-digi-purple" />
          <h1 className="font-serif text-3xl font-extrabold text-slate-850 tracking-tight">{t('aboutPage.title')}</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t('aboutPage.desc1')}
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t('aboutPage.desc2')}
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>{t('aboutPage.backToHome')}</Button>
        </Card>
      </main>

      <PublicFooter />
    </div>
  );
};
export default About;
