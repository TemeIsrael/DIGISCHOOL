import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { GradeCell } from '../../../shared/components/business/GradeCell';
import { ClipboardList, Save, Download, Loader2 } from 'lucide-react';
import { exportCSV } from '../../../shared/utils/export';
import { useToast } from '../../../shared/components/ui/Toast';
import { useAuthStore } from '../../../features/auth/store';
import { useStudents } from '../../students/hooks/useStudents';
import { useEvaluations } from '../hooks/useEvaluations';

interface GradeEntry {
  matricule: string;
  nom: string;
  prenom: string;
  note: number | null;
  noteMax: number;
  photoUrl?: string;
  idCours?: number;
  idSession?: number;
}

const coursesFrancophones = ['Français', 'Mathématiques', 'Sciences & Technologie', 'Anglais', 'Éducation Civique', 'Histoire', 'Géographie'];
const coursesAnglophones  = ['English Language', 'Mathematics', 'Science & Tech', 'French', 'Civics', 'History', 'Geography'];
const sessionsFr = ['Séquence 1', 'Séquence 2', 'Séquence 3', 'Séquence 4', 'Séquence 5', 'Séquence 6'];
const sessionsEn = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'];

export const GradeEntryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const { toast } = useToast();
  const { user } = useAuthStore();
  const isDirector = user?.typeAdmin === 4;

  const sections = ['Francophone', 'Anglophone'];

  const [selectedSection, setSelectedSection] = useState('Francophone');
  const [selectedCours,   setSelectedCours]   = useState(coursesFrancophones[0]);
  const [selectedClasse,  setSelectedClasse]  = useState('Classe par défaut');
  const [selectedSession, setSelectedSession] = useState(isEn ? sessionsEn[2] : sessionsFr[2]);

  const { students, isLoading: isLoadingStudents } = useStudents();
  
  // Convert selectedSession to a mock ID. E.g. "Séquence 1" -> 1
  const idSession = parseInt(selectedSession.replace(/[^0-9]/g, '')) || 1;
  // Convert selectedCours to a mock ID based on index for demo purposes.
  const idCours = Math.max(1, (selectedSection === 'Francophone' ? coursesFrancophones : coursesAnglophones).indexOf(selectedCours) + 1);

  const { evaluations, isLoadingEvaluations, submitGrades, isSubmitting } = useEvaluations(idSession, idCours);

  const [grades, setGrades] = useState<GradeEntry[]>([]);

  // Map API students to UI rows when filters change or evaluations load
  useEffect(() => {
    if (!students) return;
    
    // Filter by class and section
    const filteredStudents = students.filter((s: any) => {
      const currentFreq = s.frequentations?.[0];
      const classeName = currentFreq?.salle?.classe?.libelle || currentFreq?.salle?.libelle || 'Non assigné';
      const sectionName = currentFreq?.salle?.classe?.section || 'FRANCOPHONE';
      
      const secMatch = selectedSection.toUpperCase() === sectionName.toUpperCase();
      const clsMatch = selectedClasse === classeName;
      return secMatch && clsMatch && s.actif !== false;
    });

    setGrades(filteredStudents.map((s: any) => {
      const existingEval = evaluations?.find((e: any) => e.matricule === s.matricule);
      return {
        matricule: s.matricule,
        nom: s.nom,
        prenom: s.prenom,
        note: existingEval ? existingEval.note : null,
        noteMax: selectedSection === 'Francophone' ? 20 : 100, // standard scale depending on system
        photoUrl: s.photo,
        idCours,
        idSession
      };
    }));
  }, [students, evaluations, selectedClasse, selectedSection, selectedSession, selectedCours]);

  const coursOptions  = selectedSection === 'Francophone' ? coursesFrancophones : coursesAnglophones;
  const sessionOptions = selectedSection === 'Francophone' ? (isEn ? sessionsEn : sessionsFr) : sessionsEn;
  
  // Dynamic classes based on actual fetched students
  const classeOptions = useMemo(() => {
    if (!students) return [];
    const sec = selectedSection.toUpperCase();
    const set = new Set<string>();
    students.forEach((s: any) => {
      const freq = s.frequentations?.[0];
      if (freq?.salle?.classe?.section === sec) {
        set.add(freq.salle.classe.libelle || freq.salle.libelle);
      }
    });
    const arr = Array.from(set);
    if (arr.length > 0 && !arr.includes(selectedClasse)) {
      setSelectedClasse(arr[0]);
    }
    return arr;
  }, [students, selectedSection]);

  const handleNoteChange = (index: number, value: string) => {
    const updated = [...grades];
    updated[index] = { ...updated[index], note: value === '' ? null : Number(value) };
    setGrades(updated);
  };

  const filledCount = grades.filter((g) => g.note !== null).length;
  const average     = grades.filter((g) => g.note !== null).reduce((s, g) => s + (g.note || 0), 0) / (filledCount || 1);
  const noteMax     = grades[0]?.noteMax || 20;

  const handleExport = () => {
    const dataToExport = grades.map((g) => ({
      [t('students.matricule', 'Matricule')]: g.matricule,
      [t('students.nom',       'Nom')]:       g.nom,
      [t('students.prenom',    'Prénom')]:    g.prenom,
      [t('grades.note',        'Note')]:      g.note !== null ? g.note : '',
      'Max': g.noteMax,
    }));
    exportCSV(dataToExport, `grades_${selectedClasse}_${selectedCours}_${selectedSession}.csv`);
    toast({ type: 'success', title: t('grades.exportSuccess', 'Export réussi'), description: t('grades.exportDesc', 'Le fichier CSV des notes a été téléchargé.') });
  };

  const handleSave = async () => {
    try {
      const evalsToSubmit = grades
        .filter(g => g.note !== null)
        .map(g => ({
          matricule: g.matricule,
          idEpreuve: null,
          idCours: g.idCours,
          idSession: g.idSession,
          note: g.note,
          appreciation: g.note! >= (g.noteMax / 2) ? 'Acquis' : 'Non Acquis'
        }));
      
      if (evalsToSubmit.length === 0) {
        toast({ type: 'danger', title: 'Erreur', description: 'Veuillez saisir au moins une note.' });
        return;
      }

      await submitGrades({ evaluations: evalsToSubmit });
      toast({
        type: 'success',
        title: t('grades.saveSuccess', 'Enregistrement réussi'),
        description: `${t('grades.savedDesc', 'Notes sauvegardées')} — ${selectedClasse} (${selectedCours} / ${selectedSession})`,
      });
    } catch (error: any) {
      toast({ type: 'danger', title: 'Erreur', description: error.response?.data?.error?.message || 'Erreur lors de l\'enregistrement' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('grades.title', 'Saisie des Notes')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('grades.subtitle', 'Entrez les notes des élèves pour chaque séquence')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            {t('grades.export', 'Exporter')}
          </Button>
          {!isDirector && (
            <Button className="gap-2" onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {t('grades.save', 'Enregistrer')}
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterDropdown
            label={t('grades.section', 'Section')}
            value={selectedSection}
            options={sections.map(s => ({ value: s, label: s }))}
            onChange={setSelectedSection}
          />
          <FilterDropdown
            label={t('grades.course', 'Cours')}
            value={selectedCours}
            options={coursOptions.map(c => ({ value: c, label: c }))}
            onChange={setSelectedCours}
          />
          <FilterDropdown
            label={t('grades.class', 'Classe')}
            value={selectedClasse}
            options={classeOptions.map(c => ({ value: c, label: c }))}
            onChange={setSelectedClasse}
          />
          <FilterDropdown
            label={t('grades.session', 'Séquence / Test')}
            value={selectedSession}
            options={sessionOptions.map(s => ({ value: s, label: s }))}
            onChange={setSelectedSession}
          />
          <div className="ml-auto flex items-center gap-4 text-sm font-semibold">
            <span className="text-slate-500">
              {t('grades.filled', 'Remplies')}: <span className="text-digi-purple font-bold">{filledCount}/{grades.length}</span>
            </span>
            <span className="text-slate-500">
              {t('grades.average', 'Moyenne')}: <span className="text-digi-purple font-bold">{average.toFixed(1)}</span>
            </span>
          </div>
        </div>
      </Card>

      {/* Section badge */}
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedSection === 'Anglophone' ? 'bg-emerald-100 text-emerald-700' : 'bg-digi-purple/10 text-digi-purple'}`}>
          {selectedSection}
        </span>
        <span className="text-sm text-slate-500 font-medium">{selectedClasse} — {selectedCours} — {selectedSession}</span>
      </div>

      {/* Grades Table */}
      <Card className="shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center gap-2 mb-4 text-slate-800">
          <ClipboardList className="w-5 h-5 text-digi-purple" />
          <h3 className="text-sm font-bold uppercase tracking-wider">{selectedCours} &mdash; {selectedClasse} &mdash; {selectedSession}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left w-12">#</th>
                <th className="px-4 py-3 text-left">{t('common.photo', 'Photo')}</th>
                <th className="px-4 py-3 text-left">{t('students.matricule', 'Matricule')}</th>
                <th className="px-4 py-3 text-left">{t('students.nom', 'Nom')}</th>
                <th className="px-4 py-3 text-left">{t('students.prenom', 'Prénom')}</th>
                <th className="px-4 py-3 text-center w-32">{t('grades.note', 'Note')} / {noteMax}</th>
                <th className="px-4 py-3 text-center w-28">{t('grades.appreciation', 'Appréciation')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {isLoadingStudents || isLoadingEvaluations ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">Chargement des données...</td></tr>
              ) : grades.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">Aucun élève trouvé pour cette classe.</td></tr>
              ) : (
                grades.map((g, i) => (
                  <tr key={g.matricule} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                    <td className="px-4 py-3">
                      <img 
                        src={g.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(g.prenom + ' ' + g.nom)}&background=random`} 
                        alt="photo" 
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{g.matricule}</td>
                    <td className="px-4 py-3 font-semibold">{g.nom}</td>
                    <td className="px-4 py-3">{g.prenom}</td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number" min="0" max={g.noteMax}
                        step={g.noteMax === 100 ? 1 : 0.5}
                        value={g.note ?? ''}
                        onChange={(e) => handleNoteChange(i, e.target.value)}
                        disabled={isDirector || isSubmitting}
                        className="w-20 text-center border border-slate-200 rounded-lg py-1.5 text-sm font-bold focus:ring-2 focus:ring-digi-purple focus:border-digi-purple outline-none transition-all disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed"
                        placeholder="—"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <GradeCell note={g.note} max={g.noteMax} />
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
export default GradeEntryPage;
