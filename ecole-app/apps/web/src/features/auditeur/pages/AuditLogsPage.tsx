import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

const mockLogs = [
  { id: 1, date: '28/05/2026 14:32', user: 'admin_inscr', action: 'CREATE', entity: 'Élève', detail: 'Création élève EL-120' },
  { id: 2, date: '28/05/2026 14:15', user: 'admin_scol', action: 'UPDATE', entity: 'Paiement', detail: 'Modification paiement #P-089' },
  { id: 3, date: '28/05/2026 13:45', user: 'enseignant02', action: 'CREATE', entity: 'Note', detail: 'Saisie notes CM2 A - Maths' },
  { id: 4, date: '28/05/2026 10:20', user: 'root', action: 'DELETE', entity: 'Utilisateur', detail: 'Suppression compte admin_old' },
  { id: 5, date: '27/05/2026 16:00', user: 'directeur01', action: 'UPDATE', entity: 'Bulletin', detail: 'Validation bulletins CE2 A' },
];

const AuditLogsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('auditeur.auditLogs')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('auditeur.auditLogsDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('auditeur.dateTime')}</th>
                <th className="px-6 py-3 text-left">{t('auditeur.user')}</th>
                <th className="px-6 py-3 text-left">{t('auditeur.action')}</th>
                <th className="px-6 py-3 text-left">{t('auditeur.entity')}</th>
                <th className="px-6 py-3 text-left">{t('auditeur.detail')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono text-xs">{log.date}</td>
                  <td className="px-6 py-3 font-semibold">{log.user}</td>
                  <td className="px-6 py-3"><span className={`px-2 py-0.5 text-xs font-bold rounded-full ${log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-700' : log.action === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{log.action}</span></td>
                  <td className="px-6 py-3">{log.entity}</td>
                  <td className="px-6 py-3 text-xs">{log.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default AuditLogsPage;
