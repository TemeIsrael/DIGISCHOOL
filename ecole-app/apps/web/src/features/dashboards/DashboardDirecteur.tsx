import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { KPICard } from '../../shared/components/ui/KPICard';
import { Card } from '../../shared/components/ui/Card';
import { Button } from '../../shared/components/ui/Button';
import { GraduationCap, Award, CheckSquare, ShieldAlert, ShieldCheck, History, TrendingUp, Upload, CheckCircle2, Pen } from 'lucide-react';
import { api } from '../../shared/lib/api';

export const DashboardDirecteur: React.FC = () => {
  const { t } = useTranslation();
  const sigInputRef = useRef<HTMLInputElement>(null);

  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [sigUploading, setSigUploading] = useState(false);
  const [sigSuccess, setSigSuccess] = useState(false);
  const [sigError, setSigError] = useState('');

  // Charger la signature existante au montage
  useEffect(() => {
    api.get('/auth/signature')
      .then(res => setSignatureUrl(res.data?.data?.signatureUrl || null))
      .catch(() => {});
  }, []);

  const handleSignatureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSigUploading(true);
    setSigError('');
    setSigSuccess(false);

    try {
      const formData = new FormData();
      formData.append('signature', file);
      const res = await api.put('/auth/signature', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSignatureUrl(res.data?.data?.signatureUrl || null);
      setSigSuccess(true);
      setTimeout(() => setSigSuccess(false), 3000);
    } catch (err: any) {
      setSigError(err?.response?.data?.error?.message || 'Erreur lors du téléversement');
    } finally {
      setSigUploading(false);
    }
  };

  const rankingData = [
    { className: 'CM2 A', average: 8.2, count: 32 },
    { className: 'CM1 A', average: 7.6, count: 28 },
    { className: 'CE2 A', average: 7.1, count: 35 },
    { className: 'SIL A', average: 6.8, count: 30 }
  ];

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">{t('auth.dashboard.directeur.title')}</h1>
            <p className="text-sm text-slate-400 font-semibold">{t('auth.dashboard.directeur.subtitle')}</p>
          </div>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard value="7.2/10" label={t('stats.generalAvg')} icon={<GraduationCap className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="82.4%" label={t('dashboards.estimatedSuccessRate')} icon={<Award className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="14" label={t('dashboards.bulletinsToValidate')} icon={<CheckSquare className="w-5 h-5 text-digi-purple" />} />
          <KPICard value="3" label={t('dashboards.disciplinaryComplaints')} icon={<ShieldAlert className="w-5 h-5 text-digi-purple" />} />
        </div>

        {/* ── SIGNATURE NUMÉRIQUE DU DIRECTEUR ─────────────────────────────── */}
        <Card className="shadow-sm border border-digi-purple/20 bg-gradient-to-br from-digi-purple-bg to-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Icône + Texte */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-digi-purple flex items-center justify-center shrink-0">
                <Pen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Signature Numérique du Directeur
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cette signature sera automatiquement intégrée en bas de chaque bulletin PDF généré.
                </p>
              </div>
            </div>

            {/* Preview signature ou placeholder */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              {signatureUrl ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="border border-digi-purple/30 rounded-lg p-2 bg-white shadow-sm">
                    <img
                      src={signatureUrl}
                      alt="Signature du Directeur"
                      className="h-14 max-w-[180px] object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Signature active
                  </span>
                </div>
              ) : (
                <div className="border-2 border-dashed border-digi-purple/30 rounded-lg px-6 py-3 text-center bg-white/60">
                  <p className="text-xs text-slate-400 font-semibold">Aucune signature</p>
                  <p className="text-[10px] text-slate-300">PNG ou JPEG recommandé</p>
                </div>
              )}

              {/* Bouton upload */}
              <div>
                <input
                  ref={sigInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleSignatureUpload}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-digi-purple text-digi-purple hover:bg-digi-purple-bg"
                  onClick={() => sigInputRef.current?.click()}
                  isLoading={sigUploading}
                  disabled={sigUploading}
                >
                  <Upload className="w-4 h-4" />
                  {signatureUrl ? 'Changer la signature' : 'Téléverser la signature'}
                </Button>

                {sigSuccess && (
                  <p className="text-xs text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Signature mise à jour !
                  </p>
                )}
                {sigError && (
                  <p className="text-xs text-red-500 font-semibold mt-1.5">❌ {sigError}</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Top classes */}
        <Card className="shadow-sm border border-slate-100 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t('dashboards.classRankingByAvg')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left">{t('dashboards.class')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboards.enrollment')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboards.trimesterAvg')}</th>
                  <th className="px-6 py-3 text-left">{t('dashboards.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {rankingData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-3 font-bold">{item.className}</td>
                    <td className="px-6 py-3">{item.count} {t('dashboards.studentsCount')}</td>
                    <td className="px-6 py-3 text-digi-purple font-extrabold">{item.average} / 10</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                        {t('dashboards.rising')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Audit KPIs transferred from Auditeur */}
        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">{t('auth.dashboard.auditeur.title', 'Audit & Conformité')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard value="100%" label={t('dashboards.dbIntegrity', 'Intégrité DB')} icon={<ShieldCheck className="w-5 h-5 text-digi-purple" />} />
            <KPICard value="1,240" label={t('dashboards.loggedActions', 'Actions Loggées')} icon={<History className="w-5 h-5 text-digi-purple" />} />
            <KPICard value="9.8 M XAF" label={t('dashboards.totalAccounted', 'Total Comptabilisé')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
          </div>
        </div>
      </div>
  );
};
export default DashboardDirecteur;
