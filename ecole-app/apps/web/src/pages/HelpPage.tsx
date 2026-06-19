import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, BookOpen, Users, CreditCard, Shield, MessageSquare } from 'lucide-react';
import { PublicNavbar } from '../shared/components/layout/PublicNavbar';
import { PublicFooter } from '../shared/components/layout/PublicFooter';
import { Card } from '../shared/components/ui/Card';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Connexion
  {
    category: 'Connexion',
    question: 'Comment me connecter à la plateforme ?',
    answer: 'Rendez-vous sur la page de connexion (/login). Saisissez votre identifiant (login) et votre mot de passe qui vous ont été fournis par votre administrateur scolaire. Cliquez sur "Se connecter". Si vous n\'avez pas encore reçu vos identifiants, contactez l\'administration de votre école.'
  },
  {
    category: 'Connexion',
    question: 'J\'ai oublié mon mot de passe, que faire ?',
    answer: 'Cliquez sur le lien "Mot de passe oublié ?" sur la page de connexion. Entrez votre identifiant (login). Vous recevrez un e-mail avec les instructions pour réinitialiser votre mot de passe. Si le problème persiste, contactez directement votre administrateur scolaire.'
  },
  {
    category: 'Connexion',
    question: 'Ma session expire trop vite, est-ce normal ?',
    answer: 'Oui, pour des raisons de sécurité, les sessions sont automatiquement fermées après une période d\'inactivité (généralement 30 minutes). C\'est une mesure de protection de vos données. Reconnectez-vous simplement avec vos identifiants habituels.'
  },
  // Inscription
  {
    category: 'Inscription',
    question: 'Comment inscrire mon enfant à l\'école via la plateforme ?',
    answer: 'L\'inscription des élèves se fait directement par l\'administration de l\'école. Vous devez vous présenter à l\'établissement scolaire avec les documents requis (acte de naissance, photos d\'identité, carnet de vaccination, etc.). L\'administration créera ensuite votre compte parent et le profil de votre enfant.'
  },
  {
    category: 'Inscription',
    question: 'Pourquoi ne puis-je pas m\'inscrire moi-même sur le site ?',
    answer: 'Pour garantir la sécurité des données des élèves et la conformité avec les réglementations scolaires, tous les comptes (parents, enseignants) sont créés et validés directement par les administrateurs habilités de l\'établissement. Cela évite les inscriptions frauduleuses.'
  },
  {
    category: 'Inscription',
    question: 'Comment accéder aux informations de mon enfant en tant que parent ?',
    answer: 'Une fois votre compte parent créé par l\'administration, vous recevrez vos identifiants de connexion. En vous connectant, vous pourrez consulter les notes, les bulletins, l\'emploi du temps, les paiements et les messages concernant votre enfant.'
  },
  // Bibliothèque
  {
    category: 'Bibliothèque',
    question: 'Comment accéder aux livres numériques ?',
    answer: 'La bibliothèque numérique est accessible depuis le menu "Livres" dans la barre de navigation. Vous pouvez parcourir le catalogue, filtrer par matière ou par salle de classe, et ouvrir n\'importe quel livre pour le lire directement en ligne. Aucune inscription n\'est requise pour accéder aux livres.'
  },
  {
    category: 'Bibliothèque',
    question: 'Comment rechercher les livres par salle de classe ?',
    answer: 'Sur la page Bibliothèque, utilisez le menu déroulant "Salle" pour filtrer les livres disponibles dans une salle spécifique (SIL A, CP A, CM1 A, etc.). Vous pouvez aussi taper directement le nom d\'une salle dans la barre de recherche principale.'
  },
  {
    category: 'Bibliothèque',
    question: 'Puis-je télécharger les livres ?',
    answer: 'Les livres en version numérique intégrale (PDF) peuvent être téléchargés depuis le lecteur de livres en cliquant sur l\'icône de téléchargement (↓). Cette fonctionnalité peut être limitée selon les droits d\'accès de votre compte et les droits d\'auteur de chaque ouvrage.'
  },
  // Paiements
  {
    category: 'Paiements',
    question: 'Comment payer la scolarité en ligne ?',
    answer: 'Les paiements de scolarité sont enregistrés par l\'administration scolaire. En tant que parent, vous pouvez consulter l\'historique de vos paiements et les tranches restantes dans la section "Paiements" de votre tableau de bord. Pour effectuer un nouveau paiement, rapprochez-vous de la comptabilité de l\'école.'
  },
  {
    category: 'Paiements',
    question: 'Comment obtenir un reçu de paiement ?',
    answer: 'Connectez-vous à votre compte parent, rendez-vous dans la section "Paiements", puis cliquez sur "Exporter PDF" pour le paiement concerné. Un reçu officiel sera généré automatiquement avec le cachet de l\'établissement et les informations de transaction.'
  },
  // Messagerie
  {
    category: 'Messagerie',
    question: 'Comment envoyer un message à l\'administration ?',
    answer: 'Depuis votre tableau de bord, cliquez sur "Messages" dans le menu. Composez votre message en sélectionnant le destinataire (administration, directeur, etc.) et envoyez-le. Vous recevrez une notification lorsque votre message sera lu et qu\'une réponse vous sera adressée.'
  },
  {
    category: 'Messagerie',
    question: 'Puis-je contacter directement l\'enseignant de mon enfant ?',
    answer: 'La messagerie de la plateforme permet aux parents d\'échanger avec l\'administration de l\'école. Les messages destinés aux enseignants sont d\'abord filtrés et validés par la direction avant d\'être transmis, conformément à la politique de communication de l\'établissement.'
  },
  // Sécurité
  {
    category: 'Sécurité',
    question: 'Mes données personnelles sont-elles sécurisées ?',
    answer: 'Oui, EcoleApp 2026 utilise des technologies de sécurité avancées : authentification JWT (JSON Web Token), tokens d\'accès rotatifs, chiffrement des mots de passe avec bcrypt, et traçabilité complète de toutes les actions via des journaux d\'audit. Vos données ne sont jamais partagées avec des tiers.'
  },
  {
    category: 'Sécurité',
    question: 'Comment changer mon mot de passe ?',
    answer: 'Une fois connecté, allez dans "Mon Profil" ou "Paramètres" et sélectionnez "Changer le mot de passe". Saisissez votre ancien mot de passe, puis votre nouveau mot de passe deux fois pour confirmation. Votre nouveau mot de passe doit faire au moins 6 caractères.'
  }
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

export const HelpPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'Tous' || faq.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q);
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Centre d'Aide</h1>
          <p className="text-slate-300 text-sm font-medium max-w-md mx-auto">
            Trouvez rapidement les réponses à vos questions sur l'utilisation d'EcoleApp 2026.
          </p>
          {/* Search */}
          <div className="relative max-w-md mx-auto mt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une question…"
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
              {cat.key}
            </button>
          ))}
        </div>

        {/* FAQ count */}
        <p className="text-sm text-slate-400 font-semibold">
          {filtered.length} question{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* FAQ items */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-500">Aucune question trouvée.</p>
              <p className="text-sm text-slate-400 mt-1">Essayez un autre terme ou contactez-nous directement.</p>
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
                      {faq.category}
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
          <p className="font-bold text-slate-800">Vous n'avez pas trouvé votre réponse ?</p>
          <p className="text-sm text-slate-500">Notre équipe est disponible pour vous aider.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-digi-purple text-white rounded-xl font-semibold text-sm hover:bg-digi-purple-dark transition-colors shadow-sm shadow-digi-purple/20"
          >
            <MessageSquare className="w-4 h-4" />
            Nous contacter
          </a>
        </Card>
      </main>

      <PublicFooter />
    </div>
  );
};
export default HelpPage;
