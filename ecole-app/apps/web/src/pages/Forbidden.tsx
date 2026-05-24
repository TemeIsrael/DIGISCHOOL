import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../shared/components/ui/Button';

export const Forbidden: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-center text-slate-800">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-6">
        <ShieldAlert className="w-16 h-16 text-digi-danger mx-auto animate-pulse" />
        <h1 className="text-4xl font-extrabold text-digi-danger">403</h1>
        <h2 className="text-xl font-bold text-slate-800">Accès Refusé (P-095)</h2>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Vos privilèges actuels sont insuffisants pour consulter cette page.
        </p>
        <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full">
          Retour au Tableau de Bord
        </Button>
      </div>
    </div>
  );
};
export default Forbidden;
