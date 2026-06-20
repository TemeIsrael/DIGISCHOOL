import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, BookOpen, Users, CreditCard, Shield, MessageSquare } from 'lucide-react';
import { PublicNavbar } from '../shared/components/layout/PublicNavbar';
import { PublicFooter } from '../shared/components/layout/PublicFooter';
import { Card } from '../shared/components/ui/Card';
import { useTranslation } from 'react-i18next';

export const HelpPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { category: 'Connexion', question: t('helpPage.faqs.connexion_1.q'), answer: t('helpPage.faqs.connexion_1.a') },
    { category: 'Connexion', question: t('helpPage.faqs.connexion_2.q'), answer: t('helpPage.faqs.connexion_2.a') },
    { category: 'Connexion', question: t('helpPage.faqs.connexion_3.q'), answer: t('helpPage.faqs.connexion_3.a') },
    { category: 'Inscription', question: t('helpPage.faqs.inscription_1.q'), answer: t('helpPage.faqs.inscription_1.a') },
    { category: 'Inscription', question: t('helpPage.faqs.inscription_2.q'), answer: t('helpPage.faqs.inscription_2.a') },
    { category: 'Inscription', question: t('helpPage.faqs.inscription_3.q'), answer: t('helpPage.faqs.inscription_3.a') },
    { category: 'Bibliothèque', question: t('helpPage.faqs.bibliotheque_1.q'), answer: t('helpPage.faqs.bibliotheque_1.a') },
    { category: 'Bibliothèque', question: t('helpPage.faqs.bibliotheque_2.q'), answer: t('helpPage.faqs.bibliotheque_2.a') },
    { category: 'Bibliothèque', question: t('helpPage.faqs.bibliotheque_3.q'), answer: t('helpPage.faqs.bibliotheque_3.a') },
    { category: 'Paiements', question: t('helpPage.faqs.paiements_1.q'), answer: t('helpPage.faqs.paiements_1.a') },
    { category: 'Paiements', question: t('helpPage.faqs.paiements_2.q'), answer: t('helpPage.faqs.paiements_2.a') },
    { category: 'Messagerie', question: t('helpPage.faqs.messagerie_1.q'), answer: t('helpPage.faqs.messagerie_1.a') },
    { category: 'Messagerie', question: t('helpPage.faqs.messagerie_2.q'), answer: t('helpPage.faqs.messagerie_2.a') },
    { category: 'Sécurité', question: t('helpPage.faqs.securite_1.q'), answer: t('helpPage.faqs.securite_1.a') },
    { category: 'Sécurité', question: t('helpPage.faqs.securite_2.q'), answer: t('helpPage.faqs.securite_2.a') }
  ];

  const categories = [
    { key: 'Tous', icon: <HelpCircle className="w-4 h-4" /> },
    { key: 'Connexion', icon: <Shield className="w-4 h-4" /> },
    { key: 'Inscription', icon: <Users className="w-4 h-4" /> },
    { key: 'Bibliothèque', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'Paiements', icon: <CreditCard className="w-4 h-4" /> },
    { key: 'Messagerie', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'Sécurité', icon: <Shield className="w-4 h-4" /> },
  ];

  const filtered = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'Tous' || faq.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q) ||
      t(`helpPage.categories.${faq.category}`).toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PublicNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-digi-purple-dark via-slate-900 to-slate-950 py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-digi-purple/20 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-digi-purple-light/10 rounded-full -ml-24 -mb-24 blur-3xl" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-digi-purple flex items-center justify-center mx-auto shadow-lg shadow-digi-purple/30">
            <HelpCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{t('helpPage.title')}</h1>
          <p className="text-slate-300 text-sm font-medium max-w-md mx-auto">
            {t('helpPage.subtitle')}
          </p>
          {/* Search */}
          <div className="relative max-w-md mx-auto mt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('helpPage.searchPlaceholder')}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-white/10 backdrop-blur text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-digi-purple focus:bg-white/15 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 space-y-8 flex-1">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setOpenIndex(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat.key
                  ? 'bg-digi-purple text-white border-digi-purple shadow-sm shadow-digi-purple/30'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-digi-purple hover:text-digi-purple'
              }`}
            >
              {cat.icon}
              {t(`helpPage.categories.${cat.key}`)}
            </button>
          ))}
        </div>

        {/* FAQ count */}
        <p className="text-sm text-slate-400 font-semibold">
          {filtered.length} {t('helpPage.found')}
        </p>

        {/* FAQ items */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-500">{t('helpPage.noQuestions')}</p>
              <p className="text-sm text-slate-400 mt-1">{t('helpPage.tryAnother')}</p>
            </Card>
          ) : (
            filtered.map((faq, i) => (
              <Card
                key={i}
                className={`border transition-all duration-200 overflow-hidden ${
                  openIndex === i ? 'border-digi-purple/40 shadow-md' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <button
                  className="w-full flex items-start justify-between gap-4 p-5 text-left"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="shrink-0 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-digi-purple-bg text-digi-purple border border-digi-purple-border/20 uppercase tracking-wider mt-0.5">
                      {t(`helpPage.categories.${faq.category}`)}
                    </span>
                    <span className="font-semibold text-slate-800 text-sm leading-relaxed">{faq.question}</span>
                  </div>
                  <span className="shrink-0 text-slate-400">
                    {openIndex === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 pt-0 border-t border-slate-50">
                    <p className="text-sm text-slate-600 leading-relaxed mt-4">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Still need help */}
        <Card className="bg-gradient-to-r from-digi-purple-bg to-slate-50 border border-digi-purple-border/30 p-6 text-center space-y-3">
          <p className="font-bold text-slate-800">{t('helpPage.notFound')}</p>
          <p className="text-sm text-slate-500">{t('helpPage.teamAvailable')}</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-digi-purple text-white rounded-xl font-semibold text-sm hover:bg-digi-purple-dark transition-colors shadow-sm shadow-digi-purple/20"
          >
            <MessageSquare className="w-4 h-4" />
            {t('helpPage.contactUs')}
          </a>
        </Card>
      </main>

      <PublicFooter />
    </div>
  );
};
export default HelpPage;
