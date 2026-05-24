import React from 'react';
import { SidebarLayout } from '../../shared/components/layout/SidebarLayout';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Button } from '../../shared/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { FilePlus, GraduationCap, Home } from 'lucide-react';

export const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Secrétariat &mdash; Tableau de bord Administrateur</h1>
            <p className="text-sm text-slate-400 font-semibold">Suivi des inscriptions et vie scolaire au quotidien</p>
          </div>
          <Button onClick={() => navigate('/students/new')} className="gap-2">
            <FilePlus className="w-4 h-4" />
            <span>Nouvelle Inscription</span>
          </Button>
        </div>

        {/* 3 KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard value="12" label="Inscriptions du Jour" icon={<FilePlus className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="442" label="Élèves Actifs" icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="18" label="Salles Disponibles" icon={<Home className="w-5 h-5 text-digi-purple" />} />
        </div>
      </div>
    </SidebarLayout>
  );
};
export default DashboardAdmin;
