import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { CheckCircle } from 'lucide-react';

const mockBulletins = [
  { classe: 'CM2 A', total: 30, valides: 25, enAttente: 5 },
  { classe: 'CM1 A', total: 32, valides: 32, enAttente: 0 },
  { classe: 'CE2 A', total: 35, valides: 18, enAttente: 17 },
  { classe: 'Class 6 A', total: 25, valides: 0, enAttente: 25 },
];

const BulletinValidationPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.bulletinValidation')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.bulletinValidationDesc')}</p>
      </div>
      <div className="space-y-4">
        {mockBulletins.map((b) => (
          <Card key={b.classe} className="shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{b.classe}</h3>
                <p className="text-sm text-slate-400">{b.valides}/{b.total} {t('directeur.validated')}</p>
              </div>
              <div className="flex items-center gap-3">
                {b.enAttente > 0 ? (
                  <>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">{b.enAttente} {t('directeur.pending')}</span>
                    <Button className="gap-2 text-sm"><CheckCircle className="w-4 h-4" />{t('directeur.validateAll')}</Button>
                  </>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-600 text-sm font-bold"><CheckCircle className="w-4 h-4" />{t('directeur.allValidated')}</span>
                )}
              </div>
            </div>
            <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: (b.valides / b.total * 100) + '%' }} /></div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default BulletinValidationPage;
