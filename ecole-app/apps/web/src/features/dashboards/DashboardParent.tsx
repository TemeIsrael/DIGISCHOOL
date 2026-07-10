import React from 'react';
import { useTranslation } from 'react-i18next';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { Users, FileText, Bell, GraduationCap, CheckCircle2, BookOpen } from 'lucide-react';
import { useDashboardStats } from './hooks/useDashboardStats';

export const DashboardParent: React.FC = () => {
  const { t } = useTranslation();
  const { stats, isLoading } = useDashboardStats('PARENT');

  const children: any[] = stats?.children || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('dashboards.parentTitle', 'Espace Parent')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('dashboards.parentSubtitle', 'Suivi de scolarité')}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={isLoading ? '...' : String(stats?.childrenCount || 0)} label={t('dashboards.childrenCount', 'Enfants inscrits')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={isLoading ? '...' : String(stats?.unreadMessages || 0)} label={t('dashboards.unreadMessages', 'Messages non lus')} icon={<Bell className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="1" label={t('dashboards.upcomingExams', 'Éval. à venir')} icon={<FileText className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="0" label={t('dashboards.unpaidInvoices', 'Factures impayées')} icon={<FileText className="w-5 h-5 text-digi-purple" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Children Quick Access */}
        <Card className="lg:col-span-2 shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-digi-purple" />
            {t('dashboards.myChildren', 'Mes Enfants')}
          </h3>
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-slate-400 italic">Chargement...</p>
            ) : children.length === 0 ? (
              <p className="text-sm text-slate-500 italic">Aucun enfant inscrit trouvé.</p>
            ) : (
              children.map((child: any) => (
                <div key={child.matricule} className="p-4 rounded-xl border border-slate-100 hover:border-digi-purple/30 transition-all flex items-center justify-between group cursor-pointer bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-digi-purple-bg text-digi-purple flex items-center justify-center font-bold text-lg">
                      {(child.prenom?.[0] || child.nom?.[0] || 'E').toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{child.nom} {child.prenom}</h4>
                      <p className="text-xs font-semibold text-slate-500">
                        {child.classe ? `${child.classe}` : ''}{child.salle ? ` — ${child.salle}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      {child.statut === 'PRE_INSCRIT' ? 'Pré-inscrit' : 'Inscrit'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Missing Homeworks/Notices */}
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-digi-purple" />
            {t('dashboards.homeworks', 'Devoirs')}
          </h3>
          <div className="space-y-3">
            {(stats?.homeworks || []).length === 0 ? (
               <p className="text-sm text-slate-500 italic">Aucun devoir pour le moment.</p>
            ) : (
               (stats?.homeworks || []).map((hw: any, i: number) => (
                  <div key={i} className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">{hw.titre}</p>
                      <p className="text-xs text-slate-500 font-semibold">{hw.date}</p>
                    </div>
                  </div>
               ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default DashboardParent;

