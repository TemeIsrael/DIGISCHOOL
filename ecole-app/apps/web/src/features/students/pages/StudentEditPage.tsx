import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';

export const StudentEditPage: React.FC = () => {
  const { matricule } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Modifier l'Élève &mdash; {matricule}</h1>
      <Card className="shadow-sm border border-slate-100">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/students'); }}>
          <Input label="Nom" defaultValue="Dupont" />
          <Input label="Prénom" defaultValue="Jean" />
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/students')}>Annuler</Button>
            <Button type="submit">Enregistrer les modifications</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default StudentEditPage;
