import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParents, ParentInfo } from '../hooks/useParents';
import { Avatar } from '../../../shared/components/ui/Avatar';
import { Badge } from '../../../shared/components/ui/Badge';
import { Users, Phone, Mail, GraduationCap, Search, RefreshCw } from 'lucide-react';

export const ParentsListPage: React.FC = () => {
  const { t } = useTranslation();
  const { parents, isLoading, refetch } = useParents();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const filtered = parents.filter((p) => {
    const q = search.toLowerCase();
    const fullName = `${p.nom} ${p.prenom}`.toLowerCase();
    return fullName.includes(q) || p.email?.toLowerCase().includes(q) || p.login?.toLowerCase().includes(q);
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const getEnfants = (parent: ParentInfo) => {
    return parent.parents
      .filter((link) => link.eleve)
      .map((link) => link.eleve!);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-digi-purple" />
            {t('parents.title', 'Parents d\'élèves')}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {t('parents.subtitle', 'Liste complète des parents inscrits')} — {parents.length} {t('parents.total', 'parent(s)')}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-semibold"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {t('common.refresh', 'Actualiser')}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder={t('parents.search', 'Rechercher un parent…')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-digi-purple/30 focus:border-digi-purple transition"
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-digi-purple border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-medium">{t('common.loading', 'Chargement…')}</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Users className="w-16 h-16 text-slate-200" />
          <p className="text-slate-400 font-semibold">
            {search ? t('parents.noResults', 'Aucun parent correspondant à votre recherche') : t('parents.empty', 'Aucun parent enregistré')}
          </p>
        </div>
      )}

      {/* Grid of parent cards */}
      {!isLoading && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((parent) => {
            const enfants = getEnfants(parent);
            const fullName = `${parent.prenom || ''} ${parent.nom || ''}`.trim() || parent.login;

            return (
              <div
                key={parent.idPers}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4"
              >
                {/* Top: Avatar + Name + Status */}
                <div className="flex items-center gap-3">
                  <Avatar name={fullName} src={parent.photoURL} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">
                      {parent.nom?.toUpperCase()} {parent.prenom}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{parent.login}</p>
                  </div>
                  <Badge variant={parent.actif ? 'success' : 'danger'}>
                    {parent.actif ? t('common.active', 'Actif') : t('common.inactive', 'Inactif')}
                  </Badge>
                </div>

                {/* Contact info */}
                <div className="space-y-1.5">
                  {parent.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Mail className="w-3.5 h-3.5 text-digi-purple shrink-0" />
                      <span className="truncate">{parent.email}</span>
                    </div>
                  )}
                  {parent.telephone1 && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-digi-purple shrink-0" />
                      <span>{parent.telephone1}</span>
                    </div>
                  )}
                </div>

                {/* Children */}
                <div className="border-t border-slate-50 pt-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {t('parents.children', 'Enfants inscrits')} ({enfants.length})
                  </p>
                  {enfants.length === 0 ? (
                    <p className="text-xs text-slate-300 italic">{t('parents.noChildren', 'Aucun enfant lié')}</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {enfants.map((e) => (
                        <span
                          key={e.matricule}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-digi-purple-bg text-digi-purple text-xs font-semibold"
                        >
                          {e.prenom} {e.nom}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ParentsListPage;
