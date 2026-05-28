import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Download, Upload } from 'lucide-react';

const mockDocuments = [
  { nom: 'Extrait de naissance', type: 'PDF', date: '15/09/2025', present: true },
  { nom: 'Certificat médical', type: 'PDF', date: '15/09/2025', present: true },
  { nom: 'Photos d\'identité', type: 'JPG', date: '15/09/2025', present: true },
  { nom: 'Bulletin précédent', type: 'PDF', date: '15/09/2025', present: true },
  { nom: 'Attestation domicile', type: 'PDF', date: '', present: false },
];

const StaffStudentDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { matricule } = useParams();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('staff.studentFile')} — {matricule}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('staff.studentFileDesc')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('staff.personalInfo')}</h3>
          <div className="text-sm space-y-2">
            <p><span className="text-slate-400">{t('staff.studentName')}:</span> <span className="font-bold">DUPONT Jean</span></p>
            <p><span className="text-slate-400">{t('staff.class')}:</span> <span className="font-bold">6ème A</span></p>
            <p><span className="text-slate-400">{t('staff.parentContact')}:</span> <span className="font-bold">699 000 001</span></p>
          </div>
        </Card>
        <Card className="shadow-sm border border-slate-100 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-700 mb-4">{t('staff.documents')}</h3>
          <div className="space-y-2">
            {mockDocuments.map((doc) => (
              <div key={doc.nom} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{doc.nom}</p>
                  <p className="text-xs text-slate-400">{doc.present ? doc.type + ' · ' + doc.date : t('staff.notProvided')}</p>
                </div>
                {doc.present ? (
                  <Button variant="outline" className="text-xs px-2 py-1"><Download className="w-3 h-3" /></Button>
                ) : (
                  <Button className="text-xs px-2 py-1 gap-1"><Upload className="w-3 h-3" />{t('staff.upload')}</Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default StaffStudentDetailPage;
