import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable } from '../../../shared/components/tables/DataTable';
import { Badge } from '../../../shared/components/ui/Badge';
import { Button } from '../../../shared/components/ui/Button';
import { useStudents } from '../hooks/useStudents';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../auth/hooks/usePermissions';

export const StudentListPage: React.FC = () => {
  const { students, isLoading } = useStudents();
  const navigate = useNavigate();
  const { canAddPersonnelOrStudentsOrSchedules } = usePermissions();
  const { t } = useTranslation();

  const columns = [
    { key: 'matricule', header: t('students.matricule'), sortable: true },
    {
      key: 'nom',
      header: t('students.nom'),
      sortable: true,
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <img
            src={
              row.photoURL && row.photoURL !== '/uploads/anonym.png'
                ? row.photoURL
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(row.prenom + ' ' + row.nom)}&background=random`
            }
            alt="photo"
            className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200"
          />
          <span className="font-semibold text-slate-800">{row.nom.toUpperCase()} {row.prenom}</span>
        </div>
      )
    },
    { key: 'langue', header: t('students.langue') },
    {
      key: 'actif',
      header: t('common.status'),
      render: (row: any) => (
        <Badge variant={row.actif ? 'success' : 'danger'}>
          {row.actif ? t('common.active') : t('common.inactive')}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: t('common.actions'),
      render: (row: any) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/students/${row.matricule}`)}>
            {t('students.detail')}
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate(`/students/${row.matricule}/edit`)}>
            {t('common.edit')}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">{t('students.title')}</h1>
        {canAddPersonnelOrStudentsOrSchedules && (
          <Button onClick={() => navigate('/students/new')}>{t('students.newStudent')}</Button>
        )}
      </div>

      {isLoading ? (
        <p className="text-slate-400">{t('common.loading')}</p>
      ) : (
        <DataTable data={students} columns={columns} searchKey="nom" searchPlaceholder={t('students.search')} />
      )}
    </div>
  );
};
export default StudentListPage;
