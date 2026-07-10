import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { BulletinPreview } from '../../../shared/components/business/BulletinPreview';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { FileText, Download, Printer } from 'lucide-react';
import { useStudents } from '../../students/hooks/useStudents';
import { api } from '../../../shared/lib/api';
import { useToast } from '../../../shared/components/ui/Toast';

export const BulletinPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');
  const { toast } = useToast();

  const [selectedSection, setSelectedSection] = React.useState('Francophone');
  const [selectedClasse, setSelectedClasse] = React.useState('Classe par défaut');
  const [selectedTrimestre, setSelectedTrimestre] = React.useState('Trimestre 1');

  const { students, isLoading } = useStudents();

  // Extract unique classes based on section
  const classesOptions = useMemo(() => {
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

  const filteredStudents = useMemo(() => {
    if (!students) return [];
    return students.filter((s: any) => {
      const currentFreq = s.frequentations?.[0];
      const classeName = currentFreq?.salle?.classe?.libelle || currentFreq?.salle?.libelle || 'Non assigné';
      const sectionName = currentFreq?.salle?.classe?.section || 'FRANCOPHONE';
      
      const secMatch = selectedSection.toUpperCase() === sectionName.toUpperCase();
      const clsMatch = selectedClasse === classeName;
      return secMatch && clsMatch && s.actif !== false;
    });
  }, [students, selectedClasse, selectedSection]);

  const handleDownloadRealBulletin = async (matricule: string) => {
    try {
      toast({ type: 'info', title: 'Téléchargement', description: 'Génération du bulletin en cours...' });
      const currentFreq = students.find((s: any) => s.matricule === matricule)?.frequentations?.[0];
      
      const res = await api.get(`/evaluations/bulletins/${matricule}/download`, {
        params: {
          idSession: 1, // To make real, these should be dynamic based on selectedTrimestre
          idSalle: currentFreq?.idSalle || 1,
          idAcademi: currentFreq?.idAcademi || 1
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bulletin_${matricule}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast({ type: 'danger', title: 'Erreur', description: 'Impossible de générer le bulletin. Vérifiez les notes.' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('bulletins.title', 'Bulletins Scolaires')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('bulletins.subtitle', 'Génération et consultation des bulletins trimestriels')}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
            <Printer className="w-4 h-4" />
            {t('bulletins.print', 'Imprimer Tout')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterDropdown label={t('grades.section', 'Section')} value={selectedSection} options={['Francophone', 'Anglophone'].map(s => ({ value: s, label: s }))} onChange={setSelectedSection} />
          <FilterDropdown label={t('grades.class', 'Classe')} value={selectedClasse} options={classesOptions.map(c => ({ value: c, label: c }))} onChange={setSelectedClasse} />
          <FilterDropdown label={t('bulletins.trimester', 'Trimestre')} value={selectedTrimestre} options={['Trimestre 1', 'Trimestre 2', 'Trimestre 3'].map(t => ({ value: t, label: t }))} onChange={setSelectedTrimestre} />
          <span className="ml-auto text-sm text-slate-500 font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-digi-purple" />
            {isLoading ? '...' : filteredStudents.length} {t('bulletins.found', 'bulletin(s) trouvé(s)')}
          </span>
        </div>
      </Card>

      {/* Bulletin Cards */}
      <div className="space-y-6">
        {isLoading ? (
          <p className="text-center text-slate-400 italic py-8">Chargement des élèves...</p>
        ) : filteredStudents.length === 0 ? (
          <p className="text-center text-slate-400 italic py-8">Aucun élève trouvé pour cette classe.</p>
        ) : (
          filteredStudents.map((s: any, i: number) => (
            <Card key={s.matricule} className="shadow-sm border border-slate-100">
              <BulletinPreview 
                eleve={`${s.nom} ${s.prenom}`}
                classe={selectedClasse}
                trimestre={selectedTrimestre}
                moyenne={0} // Calculation is done on backend for the PDF
                rang={0}
                effectif={filteredStudents.length}
                onDownload={() => handleDownloadRealBulletin(s.matricule)} 
              />
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
export default BulletinPage;
