import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { GraduationCap, TrendingUp, Award, Users } from 'lucide-react';

const mockCEPResults = [
  { annee: '2025-2026', inscrits: 30, presents: 29, admis: 24, tauxReussite: 82.8, moyenneGenerale: 7.6 },
  { annee: '2024-2025', inscrits: 28, presents: 28, admis: 22, tauxReussite: 78.6, moyenneGenerale: 7.2 },
  { annee: '2023-2024', inscrits: 32, presents: 31, admis: 27, tauxReussite: 87.1, moyenneGenerale: 7.9 },
];

const mockTopStudents = [
  { rang: 1, nom: 'NGUEMA Jean', moyenne: 9.2, mention: 'Très Bien' },
  { rang: 2, nom: 'FOUDA Marie', moyenne: 8.8, mention: 'Bien' },
  { rang: 3, nom: 'ATANGANA Paul', moyenne: 8.5, mention: 'Bien' },
  { rang: 4, nom: 'NGONO Sarah', moyenne: 8.1, mention: 'Assez Bien' },
  { rang: 5, nom: 'BELLA Roger', moyenne: 7.9, mention: 'Assez Bien' },
];

const mockBySubject = [
  { matiere: 'Mathématiques', moyenne: 7.1, tauxReussite: 80 },
  { matiere: 'Français', moyenne: 7.5, tauxReussite: 85 },
  { matiere: 'Sciences & Technologie', moyenne: 6.8, tauxReussite: 75 },
  { matiere: 'Éducation Civique', moyenne: 8.0, tauxReussite: 90 },
  { matiere: 'Histoire-Géo', moyenne: 7.2, tauxReussite: 82 },
  { matiere: 'Anglais', moyenne: 7.8, tauxReussite: 88 },
];

const ExamStatsCEPPage: React.FC = () => {
  const { t } = useTranslation();
  const current = mockCEPResults[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.examStatsCEP')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.examStatsCEPDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard value={String(current.inscrits)} label={t('directeur.registered')} icon={<Users className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={String(current.admis)} label={t('directeur.passed')} icon={<GraduationCap className="w-5 h-5 text-digi-success" />} />
        <KPICard value={`${current.tauxReussite}%`} label={t('directeur.successRate')} icon={<TrendingUp className="w-5 h-5 text-digi-purple" />} />
        <KPICard value={`${current.moyenneGenerale}/10`} label={t('directeur.examAverage')} icon={<Award className="w-5 h-5 text-digi-purple" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">{t('directeur.historicalResults')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">{t('directeur.year')}</th>
                  <th className="px-4 py-3 text-center">{t('directeur.registered')}</th>
                  <th className="px-4 py-3 text-center">{t('directeur.present')}</th>
                  <th className="px-4 py-3 text-center">{t('directeur.passed')}</th>
                  <th className="px-4 py-3 text-center">{t('directeur.successRate')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {mockCEPResults.map((r) => (
                  <tr key={r.annee} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold">{r.annee}</td>
                    <td className="px-4 py-3 text-center">{r.inscrits}</td>
                    <td className="px-4 py-3 text-center">{r.presents}</td>
                    <td className="px-4 py-3 text-center font-bold text-digi-success">{r.admis}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${r.tauxReussite >= 80 ? 'text-digi-success' : r.tauxReussite >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                        {r.tauxReussite}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">{t('directeur.topStudents')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 font-bold text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">{t('directeur.rank')}</th>
                  <th className="px-4 py-3 text-left">{t('directeur.studentName')}</th>
                  <th className="px-4 py-3 text-center">{t('directeur.average')}</th>
                  <th className="px-4 py-3 text-left">{t('directeur.distinction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
                {mockTopStudents.map((s) => (
                  <tr key={s.rang} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold">{s.rang}</td>
                    <td className="px-4 py-3 font-semibold">{s.nom}</td>
                    <td className="px-4 py-3 text-center font-bold text-digi-purple">{s.moyenne}/10</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">{s.mention}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card className="shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">{t('directeur.resultsBySubject')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('directeur.subject')}</th>
                <th className="px-6 py-3 text-center">{t('directeur.average')}</th>
                <th className="px-6 py-3 text-center">{t('directeur.successRate')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockBySubject.map((s) => (
                <tr key={s.matiere} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold">{s.matiere}</td>
                  <td className="px-6 py-3 text-center font-bold text-digi-purple">{s.moyenne}/10</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`font-bold ${s.tauxReussite >= 80 ? 'text-digi-success' : s.tauxReussite >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                      {s.tauxReussite}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default ExamStatsCEPPage;
