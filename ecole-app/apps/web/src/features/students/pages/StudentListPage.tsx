import React from 'react';
import { DataTable } from '../../../shared/components/tables/DataTable';
import { Badge } from '../../../shared/components/ui/Badge';
import { Button } from '../../../shared/components/ui/Button';
import { useStudents } from '../hooks/useStudents';
import { useNavigate } from 'react-router-dom';

export const StudentListPage: React.FC = () => {
  const { students, isLoading } = useStudents();
  const navigate = useNavigate();

  const columns = [
    { key: 'matricule', header: 'Matricule', sortable: true },
    {
      key: 'nom',
      header: 'Nom',
      sortable: true,
      render: (row: any) => `${row.nom.toUpperCase()} ${row.prenom}`
    },
    { key: 'langue', header: 'Langue' },
    {
      key: 'actif',
      header: 'Statut',
      render: (row: any) => (
        <Badge variant={row.actif ? 'success' : 'danger'}>
          {row.actif ? 'Actif' : 'Inactif'}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: any) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/students/${row.matricule}`)}>
            Détails
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate(`/students/${row.matricule}/edit`)}>
            Modifier
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Gestion des Élèves</h1>
        <Button onClick={() => navigate('/students/new')}>Inscrire un Élève</Button>
      </div>

      {isLoading ? (
        <p className="text-slate-400">Chargement des élèves...</p>
      ) : (
        <DataTable data={students} columns={columns} searchKey="nom" searchPlaceholder="Rechercher par nom..." />
      )}
    </div>
  );
};
export default StudentListPage;
