import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';

export const StudentDetailPage: React.FC = () => {
  const { matricule } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">{t('students.profile')} &mdash; {matricule}</h1>
        <Button variant="outline" onClick={() => navigate('/students')}>{t('students.back')}</Button>
      </div>

      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-50">
          <div className="w-20 h-20 rounded-full bg-digi-purple-bg text-digi-purple flex items-center justify-center font-extrabold text-2xl">
            EL
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">{t('students.exampleStudent')}</h2>
            <p className="text-sm text-slate-400 font-semibold">{t('students.matricule')}: {matricule}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('students.birthDate')}</p>
            <p className="font-semibold text-slate-700 mt-1">15/04/2012</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('students.workingLanguage')}</p>
            <p className="font-semibold text-slate-700 mt-1">{t('students.french')}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default StudentDetailPage;
