import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { CheckCircle, XCircle } from 'lucide-react';

const mockCases = [
  { id: 1, eleve: 'TAMBA Roger (CM2 A)', motif: 'Bagarre', sanction: 'Exclusion 3 jours', date: '20/05/2026', status: 'pending' },
  { id: 2, eleve: 'BELLA Sarah (CE1 A)', motif: 'Retards répétés', sanction: 'Avertissement', date: '18/05/2026', status: 'pending' },
  { id: 3, eleve: 'KAMGA Paul (Class 5 A)', motif: 'Tricherie examen', sanction: 'Exclusion 1 semaine', date: '15/05/2026', status: 'approved' },
];

const DisciplineApprovalPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.disciplineApproval')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.disciplineApprovalDesc')}</p>
      </div>
      <div className="space-y-4">
        {mockCases.map((c) => (
          <Card key={c.id} className="shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{c.eleve}</h3>
                <p className="text-xs text-slate-400">{c.motif} — {c.sanction} · {c.date}</p>
              </div>
              {c.status === 'pending' ? (
                <div className="flex gap-2">
                  <Button className="gap-1 text-sm"><CheckCircle className="w-4 h-4" />{t('directeur.approve')}</Button>
                  <Button variant="outline" className="gap-1 text-sm text-red-600"><XCircle className="w-4 h-4" />{t('directeur.reject')}</Button>
                </div>
              ) : (
                <span className="flex items-center gap-1 text-emerald-600 text-sm font-bold"><CheckCircle className="w-4 h-4" />{t('directeur.approved')}</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default DisciplineApprovalPage;
