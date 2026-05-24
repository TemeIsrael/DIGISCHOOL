import React from 'react';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';

export const ChangePasswordPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className="shadow-lg border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-6">Modifier le mot de passe</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input type="password" label="Ancien mot de passe" placeholder="••••••••" />
          <Input type="password" label="Nouveau mot de passe" placeholder="••••••••" />
          <Input type="password" label="Confirmer le nouveau mot de passe" placeholder="••••••••" />
          <Button type="submit" className="w-full">Enregistrer</Button>
        </form>
      </Card>
    </div>
  );
};
export default ChangePasswordPage;
