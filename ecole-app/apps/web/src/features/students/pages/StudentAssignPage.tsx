import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Select } from '../../../shared/components/ui/Select';
import { Button } from '../../../shared/components/ui/Button';

export const StudentAssignPage: React.FC = () => {
  const { matricule } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">{t('students.assignRoom')} &mdash; {matricule}</h1>
      <Card className="shadow-sm border border-slate-100">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/students'); }}>
          <Select
            label={t('students.classroom')}
            options={[
              { value: '1', label: 'SIL A' },
              { value: '2', label: 'CP A' },
              { value: '3', label: 'CE1 A' },
              { value: '4', label: 'CE2 A' },
              { value: '5', label: 'CM1 A' },
              { value: '6', label: 'CM2 A' },
              { value: '7', label: 'Class 1 A' },
              { value: '8', label: 'Class 6 A' },
            ]}
          />
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate('/students')}>{t('common.cancel')}</Button>
            <Button type="submit">{t('students.assignBtn')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default StudentAssignPage;
