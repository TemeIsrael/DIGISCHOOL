import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Download } from 'lucide-react';

const mockListings = [
  { nom: 'Liste des élèves', derniere: '28/05/2026', lignes: 350 },
  { nom: 'Liste des enseignants', derniere: '28/05/2026', lignes: 24 },
  { nom: 'Liste du personnel administratif', derniere: '27/05/2026', lignes: 8 },
  { nom: 'Liste des parents', derniere: '26/05/2026', lignes: 280 },
  { nom: 'Liste des paiements', derniere: '28/05/2026', lignes: 179 },
];

const AllListingsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('auditeur.allListings')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('auditeur.allListingsDesc')}</p>
      </div>
      <div className="space-y-4">
        {mockListings.map((l) => (
          <Card key={l.nom} className="shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{l.nom}</h3>
                <p className="text-xs text-slate-400">{l.lignes} {t('auditeur.entries')} · {t('auditeur.lastUpdated')}: {l.derniere}</p>
              </div>
              <Button variant="outline" className="gap-2 text-sm"><Download className="w-4 h-4" />{t('auditeur.download')}</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default AllListingsPage;
