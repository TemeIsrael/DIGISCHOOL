import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { Button } from '../shared/components/ui/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-center text-slate-800">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-6">
        <HelpCircle className="w-16 h-16 text-digi-purple mx-auto animate-bounce" />
        <h1 className="text-4xl font-extrabold text-digi-purple">404</h1>
        <h2 className="text-xl font-bold text-slate-800">Page Introuvable (P-094)</h2>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Le chemin d'accès demandé n'existe pas ou a été déplacé.
        </p>
        <Button variant="primary" onClick={() => navigate('/')} className="w-full">
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
