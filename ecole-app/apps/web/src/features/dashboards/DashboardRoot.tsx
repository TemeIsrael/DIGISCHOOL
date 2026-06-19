import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import {
  Shield, Terminal, UserPlus, Send, CheckCircle2,
  AlertCircle, Users, Database, Activity, Clock,
  Eye, EyeOff, Trash2, ToggleLeft, ToggleRight
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────────── */
interface AdminAccount {
  id: number;
  login: string;
  typeAdmin: number;
  actif: boolean;
}

const ADMIN_TYPE_LABELS: Record<number, string> = {
  1: 'Secrétaire (Inscriptions)',
  2: 'Scolarité (Registrar)',
  3: 'Fondateur',
  4: 'Directeur'
};

const ADMIN_TYPE_COLORS: Record<number, string> = {
  1: 'bg-blue-50 text-blue-700 border-blue-200',
  2: 'bg-amber-50 text-amber-700 border-amber-200',
  3: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  4: 'bg-violet-50 text-violet-700 border-violet-200'
};

/* ─── Initial mock admin accounts ───────────────────────────────── */
const initialAdmins: AdminAccount[] = [
  { id: 1, login: 'admin_insc',  typeAdmin: 1, actif: true },
  { id: 2, login: 'admin_scol',  typeAdmin: 2, actif: true },
  { id: 3, login: 'admin_fond',  typeAdmin: 3, actif: true },
  { id: 4, login: 'admin_dir',   typeAdmin: 4, actif: true }
];

/* ─── System Audit Log ──────────────────────────────────────────── */
const systemAuditLog = [
  { user: 'admin_root', action: 'LOGIN',  detailKey: 'dashboardRoot.auditLog.login' },
  { user: 'admin_root', action: 'CREATE', detailKey: 'dashboardRoot.auditLog.create' },
  { user: 'admin_root', action: 'SEND',   detailKey: 'dashboardRoot.auditLog.send' },
  { user: 'admin_root', action: 'UPDATE', detailKey: 'dashboardRoot.auditLog.update' },
];

const actionColors: Record<string, string> = {
  LOGIN:  'bg-emerald-100 text-emerald-700',
  CREATE: 'bg-blue-100 text-blue-700',
  SEND:   'bg-digi-purple/10 text-digi-purple',
  UPDATE: 'bg-amber-100 text-amber-700',
  DELETE: 'bg-red-100 text-red-700'
};

/* ─── Dashboard Root Component ───────────────────────────────────── */
export const DashboardRoot: React.FC = () => {
  const { t, i18n } = useTranslation();

  const getAdminTypeLabel = (type: number) => {
    switch (type) {
      case 0: return t('auth.roles.ROOT', 'Super Admin / Root');
      case 1: return t('auth.roles.ADMIN_INSCRIPTIONS', 'Admin Inscriptions');
      case 2: return t('auth.roles.ADMIN_SCOLARITE', 'Admin Scolarité');
      case 3: return t('auth.roles.FONDATEUR', 'Fondateur');
      case 4: return t('auth.roles.DIRECTEUR', 'Directeur');
      default: return `Type ${type}`;
    }
  };

  /* State */
  const [admins, setAdmins]                 = useState<AdminAccount[]>(initialAdmins);
  const [newLogin, setNewLogin]             = useState('');
  const [newPassword, setNewPassword]       = useState('');
  const [newTypeAdmin, setNewTypeAdmin]     = useState<number>(1);
  const [showPassword, setShowPassword]     = useState(false);
  const [createStatus, setCreateStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [createMsg, setCreateMsg]           = useState('');
  const [sentTo, setSentTo]                 = useState<number | null>(null);
  const [sendingId, setSendingId]           = useState<number | null>(null);

  /* KPIs */
  const totalAdmins  = admins.length;
  const activeAdmins = admins.filter((a) => a.actif).length;

  /* Create admin (simulated) */
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateStatus('loading');
    setCreateMsg('');

    await new Promise((res) => setTimeout(res, 1200));

    // Check login uniqueness
    if (admins.some((a) => a.login === newLogin)) {
      setCreateStatus('error');
      setCreateMsg(t('dashboardRoot.errors.loginExists', 'Le login « {{login}} » est déjà utilisé.', { login: newLogin }));
      return;
    }

    const newAdmin: AdminAccount = {
      id: Date.now(),
      login: newLogin,
      typeAdmin: newTypeAdmin,
      actif: true
    };
    setAdmins((prev) => [...prev, newAdmin]);
    setCreateStatus('success');
    setCreateMsg(t('dashboardRoot.success.adminCreated', 'Compte « {{login}} » créé avec succès !', { login: newLogin }));
    setNewLogin('');
    setNewPassword('');
    setNewTypeAdmin(1);

    setTimeout(() => setCreateStatus('idle'), 4000);
  };

  /* Send credentials (simulated) */
  const handleSendCredentials = async (admin: AdminAccount) => {
    setSendingId(admin.id);
    await new Promise((res) => setTimeout(res, 1500));
    setSendingId(null);
    setSentTo(admin.id);
    setTimeout(() => setSentTo(null), 4000);
  };

  /* Toggle active */
  const handleToggle = (id: number) => {
    setAdmins((prev) => prev.map((a) => a.id === id ? { ...a, actif: !a.actif } : a));
  };

  /* Delete */
  const handleDelete = (id: number) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            {t('auth.dashboard.root.title', 'Panneau Super Administrateur')}
          </h1>
          <p className="text-sm text-slate-400 font-semibold">
            {t('auth.dashboard.root.subtitle', 'Gestion exclusive des comptes administrateurs du système')}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-digi-purple-bg rounded-full border border-digi-purple-border/30">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-digi-purple uppercase tracking-wider">{t('dashboardRoot.systemOperational')}</span>
        </div>
      </div>

      {/* System KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard value={totalAdmins}  label={t('dashboardRoot.registeredAdmins')}  icon={<Shield className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={activeAdmins} label={t('dashboardRoot.activeAdmins')}       icon={<Activity className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={t('dashboardRoot.online')}     label={t('dashboardRoot.database')}     icon={<Database className="w-5 h-5 text-emerald-500" />} />
        <KPICard value="99.9%"        label={t('dashboardRoot.availability')} icon={<Terminal className="w-5 h-5 text-digi-purple" />} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">

        {/* LEFT — Create Admin Form */}
        <div className="xl:col-span-2">
          <Card className="border border-slate-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-digi-purple-bg flex items-center justify-center border border-digi-purple-border/20">
                <UserPlus className="w-5 h-5 text-digi-purple" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">{t('dashboardRoot.createAdmin')}</h2>
                <p className="text-xs text-slate-400 font-semibold">{t('dashboardRoot.addAccount')}</p>
              </div>
            </div>

            {/* Status messages */}
            {createStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> {createMsg}
              </div>
            )}
            {createStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" /> {createMsg}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              {/* Login */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Login *</label>
                <input
                  type="text"
                  required
                  value={newLogin}
                  onChange={(e) => setNewLogin(e.target.value)}
                  placeholder="Ex: admin_dir2"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Mot de passe *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 caractères"
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all bg-slate-50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Admin type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Type d'administrateur *</label>
                <select
                  required
                  value={newTypeAdmin}
                  onChange={(e) => setNewTypeAdmin(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all bg-slate-50 focus:bg-white cursor-pointer"
                >
                  {Object.keys(ADMIN_TYPE_LABELS).map((k) => (
                    <option key={k} value={k}>{getAdminTypeLabel(Number(k))}</option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full gap-2 shadow-sm shadow-digi-purple/20"
                disabled={createStatus === 'loading'}
              >
                {createStatus === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Création…
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Créer le compte
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* RIGHT — Admin Accounts List */}
        <div className="xl:col-span-3">
          <Card className="border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-digi-purple-bg flex items-center justify-center border border-digi-purple-border/20">
                <Users className="w-5 h-5 text-digi-purple" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">{t('dashboardRoot.adminAccounts')}</h2>
                <p className="text-xs text-slate-400 font-semibold">{admins.length} compte(s)</p>
              </div>
            </div>

            <div className="overflow-x-auto -mx-6">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-100">
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('dashboardRoot.login')}</th>
                    <th className="px-6 py-3 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('dashboardRoot.type')}</th>
                    <th className="px-6 py-3 text-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('dashboardRoot.status')}</th>
                    <th className="px-6 py-3 text-right text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('dashboardRoot.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {admins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="px-6 py-3 font-bold text-slate-800 font-mono text-xs">{admin.login}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${ADMIN_TYPE_COLORS[admin.typeAdmin] || 'bg-slate-100 text-slate-500'}`}>
                          {getAdminTypeLabel(admin.typeAdmin)}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${admin.actif ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${admin.actif ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                          {admin.actif ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {/* Send credentials */}
                          <button
                            onClick={() => handleSendCredentials(admin)}
                            disabled={sendingId === admin.id}
                            title="Envoyer les identifiants par e-mail"
                            className="p-1.5 rounded-lg hover:bg-digi-purple-bg text-slate-400 hover:text-digi-purple transition-colors disabled:opacity-50"
                          >
                            {sendingId === admin.id ? (
                              <div className="w-4 h-4 border-2 border-digi-purple/30 border-t-digi-purple rounded-full animate-spin" />
                            ) : sentTo === admin.id ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                          </button>

                          {/* Toggle active */}
                          <button
                            onClick={() => handleToggle(admin.id)}
                            title={admin.actif ? 'Désactiver' : 'Activer'}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                          >
                            {admin.actif
                              ? <ToggleRight className="w-4 h-4 text-emerald-500" />
                              : <ToggleLeft className="w-4 h-4" />
                            }
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(admin.id)}
                            title="Supprimer le compte"
                            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* System Audit Log */}
      <Card className="border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">{t('dashboardRoot.systemLog')}</h2>
            <p className="text-xs text-slate-400 font-semibold">{t('dashboardRoot.superAdminActivity')}</p>
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-100">
                <th className="px-6 py-3 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('dashboardRoot.date')}</th>
                <th className="px-6 py-3 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('dashboardRoot.user')}</th>
                <th className="px-6 py-3 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('dashboardRoot.action')}</th>
                <th className="px-6 py-3 text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider">{t('dashboardRoot.detail')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {systemAuditLog.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-3 font-mono text-xs text-slate-400">
                    {new Date().toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'fr-FR')}
                  </td>
                  <td className="px-6 py-3 font-bold text-slate-700 font-mono text-xs">{log.user}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${actionColors[log.action] || 'bg-slate-100 text-slate-500'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-500">{t(log.detailKey)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default DashboardRoot;
