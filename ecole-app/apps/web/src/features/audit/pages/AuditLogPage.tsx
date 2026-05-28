import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { History, Shield, Search, Download, AlertTriangle, User } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';

const mockLogs = [
  { id: 1, date: '24/05/2026 08:30:12', user: 'root', action: 'LOGIN', resource: 'auth', ip: '192.168.1.10', details: 'Connexion réussie' },
  { id: 2, date: '24/05/2026 08:32:05', user: 'admin01', action: 'CREATE', resource: 'eleves', ip: '192.168.1.15', details: 'Nouvel élève DUPONT Jean créé' },
  { id: 3, date: '24/05/2026 09:15:33', user: 'admin01', action: 'UPDATE', resource: 'paiements', ip: '192.168.1.15', details: 'Paiement EL-002 marqué comme complet' },
  { id: 4, date: '24/05/2026 10:00:00', user: 'admin02', action: 'DELETE', resource: 'cours', ip: '192.168.1.22', details: 'Suppression logique cours SVT (archivé)' },
  { id: 5, date: '23/05/2026 16:45:20', user: 'fondateur', action: 'EXPORT', resource: 'rapports', ip: '10.0.0.5', details: 'Export PDF rapport financier T2' },
  { id: 6, date: '23/05/2026 14:30:00', user: 'admin01', action: 'LOGIN', resource: 'auth', ip: '192.168.1.15', details: 'Connexion réussie' },
  { id: 7, date: '23/05/2026 11:20:10', user: 'root', action: 'UPDATE', resource: 'config', ip: '192.168.1.10', details: 'Modification année académique courante' },
  { id: 8, date: '22/05/2026 09:00:00', user: 'admin02', action: 'CREATE', resource: 'enseignants', ip: '192.168.1.22', details: 'Nouvel enseignant assigné à Physique' },
];

const actionColors: Record<string, string> = {
  LOGIN: 'bg-blue-50 text-blue-700',
  CREATE: 'bg-emerald-50 text-emerald-700',
  UPDATE: 'bg-amber-50 text-amber-700',
  DELETE: 'bg-red-50 text-red-700',
  EXPORT: 'bg-purple-50 text-purple-700',
};

export const AuditLogPage: React.FC = () => {
  const { t } = useTranslation();
  const [filterAction, setFilterAction] = useState('Tous');
  const [filterUser, setFilterUser] = useState('Tous');
  const [search, setSearch] = useState('');

  const filtered = mockLogs.filter((l) => {
    const matchAction = filterAction === 'Tous' || l.action === filterAction;
    const matchUser = filterUser === 'Tous' || l.user === filterUser;
    const matchSearch = l.details.toLowerCase().includes(search.toLowerCase()) || l.resource.toLowerCase().includes(search.toLowerCase());
    return matchAction && matchUser && matchSearch;
  });

  const uniqueUsers = [...new Set(mockLogs.map((l) => l.user))];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('audit.title')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('audit.subtitle')}</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          {t('audit.export')}
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={String(mockLogs.length)} label={t('audit.totalEntries')} icon={<History className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(mockLogs.filter(l => l.action === 'LOGIN').length)} label={t('audit.connections')} icon={<User className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(mockLogs.filter(l => l.action === 'DELETE').length)} label={t('audit.deletions')} icon={<AlertTriangle className="w-5 h-5 text-digi-danger" />} />
        <KPICard value={String(uniqueUsers.length)} label={t('audit.activeUsers')} icon={<Shield className="w-5 h-5 text-digi-purple" />} />
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('audit.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown label={t('audit.action')} value={filterAction} options={['Tous', 'LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT']} onChange={setFilterAction} />
          <FilterDropdown label={t('audit.user')} value={filterUser} options={['Tous', ...uniqueUsers]} onChange={setFilterUser} />
        </div>
      </Card>

      {/* Log Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">{t('audit.dateTime')}</th>
                <th className="px-4 py-3 text-left">{t('audit.user')}</th>
                <th className="px-4 py-3 text-center">{t('audit.action')}</th>
                <th className="px-4 py-3 text-left">{t('audit.resource')}</th>
                <th className="px-4 py-3 text-left">{t('audit.ip')}</th>
                <th className="px-4 py-3 text-left">{t('audit.details')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-xs">{l.date}</td>
                  <td className="px-4 py-3 font-semibold">{l.user}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${actionColors[l.action] || 'bg-slate-100 text-slate-500'}`}>
                      {l.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">{l.resource}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{l.ip}</td>
                  <td className="px-4 py-3 max-w-[250px] truncate" title={l.details}>{l.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default AuditLogPage;
