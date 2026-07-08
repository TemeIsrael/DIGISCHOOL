import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { Search, Users } from 'lucide-react';
import { useStudents } from '../../students/hooks/useStudents';

export const TeacherStudentsPage: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('Toutes');
  
  const { students, isLoading } = useStudents();

  // Map API response to required UI shape
  const realStudents = (students || []).map((s: any) => {
    const currentFreq = s.frequentations?.[0]; // Usually the most recent enrollment
    const classeName = currentFreq?.salle?.classe?.libelle || currentFreq?.salle?.libelle || 'Non assigné';
    const sectionName = currentFreq?.salle?.classe?.section || 'Francophone';

    return {
      matricule: s.matricule,
      nom: s.nom,
      prenom: s.prenom,
      classe: classeName,
      section: sectionName,
      moyenne: null, // Note: grades are fetched from /evaluations in a real app
      statut: s.statut === 'INSCRIT' ? 'actif' : 'inactif',
      photoUrl: s.photo,
    };
  });

  const filtered = realStudents.filter((s: any) => {
    const matchClass = selectedClass === 'Toutes' || s.classe === selectedClass;
    const matchSearch = `${s.nom} ${s.prenom}`.toLowerCase().includes(search.toLowerCase())
      || s.matricule.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  // Extract unique classes for filter
  const classes = ['Toutes', ...Array.from(new Set(realStudents.map((s: any) => s.classe).filter(Boolean)))];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('teacher.myStudents', 'Mes Élèves')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('teacher.myStudentsSubtitle', 'Élèves de vos classes assignées')}</p>
        </div>
        <div className="flex items-center gap-3 bg-digi-purple-bg border border-digi-purple-border/20 rounded-2xl px-4 py-2">
          <Users className="w-4 h-4 text-digi-purple" />
          <span className="text-sm font-bold text-digi-purple">{isLoading ? '...' : filtered.length} {t('teacher.students', 'élèves')}</span>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('students.search', 'Rechercher un élève...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all"
            />
          </div>
          <FilterDropdown
            label={t('students.classe', 'Classe')}
            value={selectedClass}
            options={classes.map((c: any) => ({ value: c, label: c }))}
            onChange={setSelectedClass}
          />
        </div>
      </Card>

      {/* Students Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">{t('common.photo', 'Photo')}</th>
                <th className="px-4 py-3 text-left">{t('students.matricule', 'Matricule')}</th>
                <th className="px-4 py-3 text-left">{t('students.nom', 'Nom')}</th>
                <th className="px-4 py-3 text-left">{t('students.prenom', 'Prénom')}</th>
                <th className="px-4 py-3 text-left">{t('students.classe', 'Classe')}</th>
                <th className="px-4 py-3 text-center">{t('stats.generalAvg', 'Moyenne')}</th>
                <th className="px-4 py-3 text-center">{t('common.status', 'Statut')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                    Chargement des élèves...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                    Aucun élève trouvé.
                  </td>
                </tr>
              ) : (
                filtered.map((s: any, i: number) => (
                  <tr key={s.matricule} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                    <td className="px-4 py-3">
                      <img 
                        src={s.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.prenom + ' ' + s.nom)}&background=random`} 
                        alt="photo" 
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{s.matricule}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{s.nom}</td>
                    <td className="px-4 py-3">{s.prenom}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-digi-purple-bg text-digi-purple">
                        {s.classe}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {s.moyenne !== null ? (
                        <span className={`font-bold text-sm ${s.moyenne >= 7 ? 'text-digi-success' : s.moyenne >= 5 ? 'text-digi-warning' : 'text-digi-danger'}`}>
                          {s.moyenne.toFixed(1)}/10
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs italic">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${s.statut === 'actif' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.statut === 'actif' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                        {s.statut === 'actif' ? t('common.active', 'Actif') : t('common.inactive', 'Inactif')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default TeacherStudentsPage;
