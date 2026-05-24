import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  CreditCard,
  MessageSquare,
  BarChart3,
  MapPin,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Button } from '../shared/components/ui/Button';
import { Card } from '../shared/components/ui/Card';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Gestion académique',
      desc: 'Suivi rigoureux des matières, classes, inscriptions et emplois du temps.',
      icon: <GraduationCap className="w-6 h-6 text-digi-purple" />
    },
    {
      title: 'Suivi Financier',
      desc: 'Immuabilité des versements, rappels automatiques et reçus PDF instantanés.',
      icon: <CreditCard className="w-6 h-6 text-digi-purple" />
    },
    {
      title: 'Communication',
      desc: 'Messagerie interne directe avec les parents et alertes validées par la direction.',
      icon: <MessageSquare className="w-6 h-6 text-digi-purple" />
    },
    {
      title: 'Statistiques & rapports',
      desc: 'Visualisation des indicateurs financiers et des moyennes pédagogiques.',
      icon: <BarChart3 className="w-6 h-6 text-digi-purple" />
    },
    {
      title: 'Géolocalisation',
      desc: 'Optimisation de la sectorisation par quartier de résidence des élèves.',
      icon: <MapPin className="w-6 h-6 text-digi-purple" />
    },
    {
      title: 'Sécurité & rôles',
      desc: 'Authentification JWT double facteur, tokens rotatifs et traçabilité complète des logs.',
      icon: <ShieldAlert className="w-6 h-6 text-digi-purple" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Navbar */}
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50">
        <span className="text-2xl font-black text-digi-purple tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          DIGISCHOOL
        </span>
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
          <span className="hover:text-digi-purple cursor-pointer transition-colors" onClick={() => navigate('/')}>Accueil</span>
          <span className="hover:text-digi-purple cursor-pointer transition-colors" onClick={() => navigate('/livres')}>Livres</span>
          <span className="hover:text-digi-purple cursor-pointer transition-colors" onClick={() => navigate('/a-propos')}>À propos</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/s-inscrire')}>S'inscrire</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/login')}>Connexion</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[550px] bg-slate-950 flex items-center justify-center overflow-hidden">
        {/* Abstract Blur Graphic */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200')] bg-cover bg-center blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/20" />

        <div className="relative z-10 max-w-4xl text-center px-6 space-y-6">
          <h1 className="font-serif text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Des outils pensés pour l'efficacité
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            Pilotez votre établissement scolaire avec la solution de gestion de nouvelle génération de DIGISCHOOL.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/login')} className="gap-2">
              <span>Accéder à l'Espace</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Découvrez nos fonctionnalités clés</h2>
          <p className="text-slate-500 font-medium">Une suite applicative complète pour les élèves, enseignants, parents et administrateurs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <Card key={index} className="border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300" hover>
              <div className="p-3 bg-digi-purple-bg rounded-xl w-fit mb-5">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-digi-purple py-20 px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mb-40 blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Prêt à nous rejoindre ?</h2>
          <p className="text-digi-purple-bg opacity-90 max-w-md mx-auto text-sm leading-relaxed">
            Boostez la performance de votre écosystème scolaire dès maintenant avec DIGISCHOOL.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/s-inscrire')}
              className="bg-white border-0 text-digi-purple hover:bg-slate-50"
            >
              Créer un compte
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className="border-white text-white hover:bg-white/10"
            >
              Se connecter
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-lg font-black text-digi-purple tracking-tight">DIGISCHOOL</span>
            <p className="text-xs text-slate-400 font-semibold">© 2026 DIGISCHOOL. Tous droits réservés.</p>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-500">
            <span className="hover:text-digi-purple cursor-pointer transition-colors" onClick={() => navigate('/a-propos')}>À propos</span>
            <span className="hover:text-digi-purple cursor-pointer transition-colors">Aide</span>
            <span className="hover:text-digi-purple cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
