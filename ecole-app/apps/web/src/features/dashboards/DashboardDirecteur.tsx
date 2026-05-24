import React from 'react';
import { SidebarLayout } from '../../shared/components/layout/SidebarLayout';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { GraduationCap, Award, CheckSquare, ShieldAlert } from 'lucide-react';

export const DashboardDirecteur: React.FC = () => {
  const rankingData = [
    { className: '3ème A', average: 14.5, count: 32 },
    { className: 'Terminale C', average: 13.8, count: 28 },
    { className: '6ème B', average: 12.9, count: 35 },
    { className: '4ème A', average: 11.2, count: 30 }
  ];

  return (
    <SidebarLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Direction &mdash; Espace Directeur des Études</h1>
          <p className="text-sm text-slate-400 font-semibold">Suivi de la performance pédagogique et validation des bulletins</p>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value="12.4/20" label="Moyenne Générale" icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="82.4%" label="Taux Réussite Estimé" icon={<Award className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="14" label="Bulletins à valider" icon={<CheckSquare className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="3" label="Plaintes Discipline" icon={<ShieldAlert className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* Top classes */}
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Classement des Classes par Moyenne</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left">Classe</th>
                  <th className="px-6 py-3 text-left">Effectif</th>
                  <th className="px-6 py-3 text-left">Moyenne Trimestrielle</th>
                  <th className="px-6 py-3 text-left">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {rankingData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-3 font-bold">{item.className}</td>
                    <td className="px-6 py-3">{item.count} élèves</td>
                    <td className="px-6 py-3 text-digi-purple font-extrabold">{item.average} / 20</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                        En hausse
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </SidebarLayout>
  );
};
export default DashboardDirecteur;
