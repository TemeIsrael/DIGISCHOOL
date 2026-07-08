import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  GraduationCap,
  CreditCard,
  MessageSquare,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Users,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../shared/components/ui/Button';
import { Card } from '../shared/components/ui/Card';
import { PublicNavbar } from '../shared/components/layout/PublicNavbar';
import { PublicFooter } from '../shared/components/layout/PublicFooter';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      title: t('landingFeatures.academicTitle'),
      desc: t('landingFeatures.academicDesc'),
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-digi-purple-bg text-digi-purple'
    },
    {
      title: t('landingFeatures.financeTitle'),
      desc: t('landingFeatures.financeDesc'),
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: t('landingFeatures.commTitle'),
      desc: t('landingFeatures.commDesc'),
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-sky-50 text-sky-600'
    },
    {
      title: t('landingFeatures.statsTitle'),
      desc: t('landingFeatures.statsDesc'),
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: t('landingFeatures.libraryTitle'),
      desc: t('landingFeatures.libraryDesc'),
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      title: t('landingFeatures.securityTitle'),
      desc: t('landingFeatures.securityDesc'),
      icon: <ShieldCheck className="w-6 h-6" />,
      color: 'bg-violet-50 text-violet-600'
    }
  ];

  const stats = [
    { value: '7+', label: t('landingFeatures.userRoles'), icon: <Users className="w-5 h-5" /> },
    { value: '12+', label: t('landingFeatures.integratedModules'), icon: <CheckCircle2 className="w-5 h-5" /> },
    { value: '24/7', label: t('landingFeatures.availability'), icon: <Clock className="w-5 h-5" /> },
  ];



  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicNavbar />

      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-[560px] bg-slate-950 flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        {/* Gradient overlay — no external image dependency */}
        <div className="absolute inset-0 bg-gradient-to-br from-digi-purple-dark via-slate-900 to-slate-950" />
        {/* Decorative shapes */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-digi-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-digi-purple-light/10 rounded-full blur-3xl" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 py-20 px-6">
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white/80 animate-fade-in">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              {t('landingFeatures.opPlatform')}
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight animate-fade-in">
              {t('landing.hero')}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed animate-fade-in mx-auto lg:mx-0">
              {t('landing.heroSub')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-in">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/login')}
                className="gap-2 shadow-xl shadow-digi-purple/20 px-8"
              >
                {t('landing.signIn')}
              </Button>
            </div>
          </div>

          {/* Hero Images - Maternelle & Primaire */}
          <div className="flex-1 flex gap-4 w-full justify-center lg:justify-end mt-12 lg:mt-0 animate-fade-in hidden md:flex">
            <div className="flex flex-col gap-4 mt-8">
              <img src="/assets/preschool.jpg" alt="Maternelle" className="w-48 md:w-64 h-64 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/10 transform -rotate-3 hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col gap-4">
              <img src="/assets/primary.jpg" alt="Primaire" className="w-48 md:w-64 h-64 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>



      {/* ═══ Stats Bar ═══ */}
      <section className="relative -mt-12 z-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 flex items-center gap-4 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="p-3 bg-digi-purple-bg text-digi-purple rounded-xl border border-digi-purple-border/20">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-extrabold text-digi-purple tracking-tight">{stat.value}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Features Section ═══ */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold text-digi-purple uppercase tracking-widest bg-digi-purple-bg px-3 py-1 rounded-full border border-digi-purple-border/20">
            {t('landing.featuresTitle')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 mt-4">
            {t('landing.featuresTitle')}
          </h2>
          <p className="text-slate-500 font-medium">{t('landing.featuresSub')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <Card
              key={index}
              className="border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 group"
              hover
            >
              <div className={`p-3 rounded-xl w-fit mb-5 ${feat.color} transition-transform duration-300 group-hover:scale-110`}>
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ═══ CTA Section ═══ */}
      <section className="bg-digi-purple py-20 px-6 md:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mb-40 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {t('landing.ctaTitle')}
          </h2>
          <p className="text-digi-purple-bg opacity-90 max-w-md mx-auto text-sm leading-relaxed">
            {t('landing.ctaSub')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t('landing.signIn')}
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
export default LandingPage;
