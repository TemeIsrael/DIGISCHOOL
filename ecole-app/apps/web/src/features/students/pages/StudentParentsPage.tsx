import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';

export const StudentParentsPage: React.FC = () => {
  const { matricule } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">{t('students.associateParent')} &mdash; {matricule}</h1>
      <Card className="shadow-sm border border-slate-100">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/students'); }}>
          <Input type="number" label={t('students.parentPersonId')} placeholder={t('students.parentIdPlaceholder')} />
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/students')}>{t('common.cancel')}</Button>
            <Button type="submit">{t('students.associateBtn')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default StudentParentsPage;
