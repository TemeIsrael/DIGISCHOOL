import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { GraduationCap, TrendingUp, Award, Users } from 'lucide-react';

const mockFSLCResults = [
  { annee: '2025-2026', inscrits: 25, presents: 25, admis: 20, tauxReussite: 80.0, moyenneGenerale: 7.3 },
  { annee: '2024-2025', inscrits: 22, presents: 22, admis: 17, tauxReussite: 77.3, moyenneGenerale: 7.0 },
  { annee: '2023-2024', inscrits: 28, presents: 27, admis: 23, tauxReussite: 85.2, moyenneGenerale: 7.7 },
];

const mockTopStudents = [
  { rang: 1, nom: 'TAMBE John', moyenne: 9.0, mention: 'Distinction' },
  { rang: 2, nom: 'ASHU Grace', moyenne: 8.6, mention: 'Credit' },
  { rang: 3, nom: 'FONGOD Peter', moyenne: 8.3, mention: 'Credit' },
  { rang: 4, nom: 'ENOW Mary', moyenne: 7.9, mention: 'Credit' },
  { rang: 5, nom: 'AGBOR James', moyenne: 7.5, mention: 'Pass' },
];

const mockBySubject = [
  { matiere: 'Mathematics', moyenne: 6.9, tauxReussite: 78 },
  { matiere: 'English Language', moyenne: 7.8, tauxReussite: 88 },
  { matiere: 'French', moyenne: 6.5, tauxReussite: 72 },
  { matiere: 'Science & Technology', moyenne: 7.0, tauxReussite: 80 },
  { matiere: 'Civic Education', moyenne: 7.6, tauxReussite: 85 },
  { matiere: 'History & Geography', moyenne: 7.1, tauxReussite: 82 },
];

const ExamStatsFSLCPage: React.FC = () => {
  const { t } = useTranslation();
  const current = mockFSLCResults[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('directeur.examStatsFSLC')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('directeur.examStatsFSLCDesc')}</p>
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
                {mockFSLCResults.map((r) => (
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
export default ExamStatsFSLCPage;
