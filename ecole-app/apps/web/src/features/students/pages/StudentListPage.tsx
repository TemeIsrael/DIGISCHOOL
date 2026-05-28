import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from '../../../shared/components/tables/DataTable';
import { Badge } from '../../../shared/components/ui/Badge';
import { Button } from '../../../shared/components/ui/Button';
import { useStudents } from '../hooks/useStudents';
import { useNavigate } from 'react-router-dom';

export const StudentListPage: React.FC = () => {
  const { students, isLoading } = useStudents();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns = [
    { key: 'matricule', header: t('students.matricule'), sortable: true },
    {
      key: 'nom',
      header: t('students.nom'),
      sortable: true,
      render: (row: any) => `${row.nom.toUpperCase()} ${row.prenom}`
    },
    { key: 'langue', header: t('students.langue') },
    {
      key: 'actif',
      header: t('students.status'),
      render: (row: any) => (
        <Badge variant={row.actif ? 'success' : 'danger'}>
          {row.actif ? t('students.active') : t('students.inactive')}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: t('common.actions'),
      render: (row: any) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/students/${row.matricule}`)}>
            {t('students.details')}
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate(`/students/${row.matricule}/edit`)}>
            {t('students.edit')}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">{t('students.title')}</h1>
        <Button onClick={() => navigate('/students/new')}>{t('students.enroll')}</Button>
      </div>

      {isLoading ? (
        <p className="text-slate-400">{t('students.loading')}</p>
      ) : (
        <DataTable data={students} columns={columns} searchKey="nom" searchPlaceholder={t('students.searchByName')} />
      )}
    </div>
  );
};
export default StudentListPage;
