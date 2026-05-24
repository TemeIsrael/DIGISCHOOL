import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button } from '../shared/components/ui/Button';
import { Card } from '../shared/components/ui/Card';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Navbar */}
      <nav className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50">
        <span className="text-2xl font-black text-digi-purple tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          DIGISCHOOL
        </span>
        <div className="flex items-center gap-8 font-semibold text-sm text-slate-600">
          <span className="hover:text-digi-purple cursor-pointer transition-colors" onClick={() => navigate('/')}>Accueil</span>
          <span className="hover:text-digi-purple cursor-pointer transition-colors" onClick={() => navigate('/livres')}>Livres</span>
          <span className="hover:text-digi-purple cursor-pointer transition-colors text-digi-purple font-bold" onClick={() => navigate('/a-propos')}>À propos</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/s-inscrire')}>S'inscrire</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/login')}>Connexion</Button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto p-8 space-y-8 flex-1">
        <Card className="shadow-lg border border-slate-100 p-8 space-y-6">
          <GraduationCap className="w-12 h-12 text-digi-purple" />
          <h1 className="font-serif text-3xl font-extrabold text-slate-850 tracking-tight">À propos d'EcoleApp 2026 (P-097)</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Conçue pour répondre aux plus hauts standards d'ingénierie et de sécurité, EcoleApp 2026 est la solution de gestion scolaire de référence proposée par l'écosystème DIGISCHOOL.
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Notre plateforme connecte de manière transparente l'administration, les enseignants, les élèves et les parents d'élèves pour un parcours éducatif moderne et optimisé.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-xs text-slate-400 font-semibold mt-auto">
        DIGISCHOOL &bull; 2026
      </footer>
    </div>
  );
};
export default About;
