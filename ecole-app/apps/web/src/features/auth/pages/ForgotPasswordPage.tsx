import React from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center mb-2">Mot de passe oublié</h2>
          <p className="text-xs text-slate-400 text-center mb-6">
            Entrez votre identifiant pour que votre administrateur réinitialise vos accès.
          </p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/login'); }}>
            <Input label="Nom d'utilisateur / Login" placeholder="Saisissez votre nom d'utilisateur" />
            <Button type="submit" className="w-full">Demander la réinitialisation</Button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-slate-400 hover:text-digi-purple transition-colors"
            >
              Retour à la connexion
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
