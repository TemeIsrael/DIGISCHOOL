import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Modal } from '../../../shared/components/ui/Modal';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { ScheduleGrid } from '../../../shared/components/business/ScheduleGrid';
import { Clock, Download, FilePlus, Calendar, Loader2 } from 'lucide-react';
import { usePermissions } from '../../auth/hooks/usePermissions';
import { api } from '../../../shared/lib/api';

/* ─── Component ─────────────────────────────────────────────────── */
export const SchedulePage: React.FC = () => {
  const { t } = useTranslation();
  const { canAddPersonnelOrStudentsOrSchedules } = usePermissions();

  const [selectedSection, setSelectedSection] = useState('FRANCOPHONE');
  const [selectedClasse,  setSelectedClasse]  = useState('');
  const [isAddModalOpen,  setAddModalOpen]    = useState(false);
  
  const [newSlot, setNewSlot] = useState({ jour: '', heureDebut: '', heureFin: '', cours: '', salle: '' });
  
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [classesList, setClassesList] = useState<any[]>([]);
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      // Fetch schedules, classes, courses
      const [schRes, clsRes, crsRes] = await Promise.all([
        api.get('/academic/schedules'),
        api.get('/academic/classes'),
        api.get('/academic/courses')
      ]);
      const schedules = schRes.data?.data || [];
      const classes = clsRes.data?.data || [];
      const courses = crsRes.data?.data || [];

      setClassesList(classes);
      setCoursesList(courses);

      // Map references
      const mapped = schedules.map((s: any) => {
        const cls = classes.find((c: any) => c.idClasse === s.idClasse);
        const crs = courses.find((c: any) => c.idCours === s.idCours);
        return {
          id: s.idEdt,
          jour: s.jour || 'Lundi',
          heureDebut: s.heureDebut,
          heureFin: s.heureFin,
          cours: crs ? crs.libelle : `Cours #${s.idCours}`,
          salle: cls ? cls.libelle : `Classe #${s.idClasse}`,
          section: cls ? cls.section : 'FRANCOPHONE'
        };
      });
      setScheduleData(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const isSectionEn   = selectedSection === 'ANGLOPHONE';
  const classeOptions = classesList.filter(c => (isSectionEn ? c.section === 'ANGLOPHONE' : c.section === 'FRANCOPHONE')).map(c => c.libelle);
  const dayOptions    = isSectionEn ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const filtered = scheduleData.filter((s) => {
    const matchSection = s.section === selectedSection;
    const matchClasse = !selectedClasse || s.salle === selectedClasse;
    return matchSection && matchClasse;
  });

  const handleAddSlot = async () => {
    if (!newSlot.jour || !newSlot.cours || !newSlot.salle) return;
    
    // Find IDs
    const cls = classesList.find(c => c.libelle === newSlot.salle);
    const crs = coursesList.find(c => c.libelle === newSlot.cours);

    let idCours = crs?.idCours;
    let idClasse = cls?.idClasse;

    if (!idClasse) {
      alert("Classe introuvable, veuillez créer la classe d'abord.");
      return;
    }
    if (!idCours) {
      // Create course if not exists
      try {
        const res = await api.post('/academic/courses', { libelle: newSlot.cours, idClasse });
        idCours = res.data?.data?.idCours;
      } catch (err) {
        console.error(err);
        return;
      }
    }

    try {
      await api.post('/academic/schedules', {
        idClasse,
        idCours,
        jour: newSlot.jour,
        heureDebut: newSlot.heureDebut,
        heureFin: newSlot.heureFin
      });
      fetchSchedules();
      setAddModalOpen(false);
      setNewSlot({ jour: '', heureDebut: '', heureFin: '', cours: '', salle: '' });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout");
    }
  };

  const inputCls = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-digi-purple focus:ring-2 focus:ring-digi-purple outline-none bg-white transition-all';
  const labelCls = 'block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('schedules.title', 'Emploi du Temps')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('schedules.subtitle', 'Planification hebdomadaire des cours')}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {canAddPersonnelOrStudentsOrSchedules && (
            <Button onClick={() => setAddModalOpen(true)} className="gap-2">
              <FilePlus className="w-4 h-4" />
              {t('schedules.addSlot', 'Ajouter Créneau')}
            </Button>
          )}
        </div>
      </div>

      {/* Add Slot Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title={t('schedules.addSlot', 'Ajouter un Créneau')}>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>{t('schedules.day', 'Jour')}</label>
            <select className={inputCls} value={newSlot.jour} onChange={(e) => setNewSlot({ ...newSlot, jour: e.target.value })}>
              <option value="">{t('schedules.selectDay', '-- Choisir le Jour --')}</option>
              {dayOptions.map((day) => <option key={day} value={day}>{day}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{t('schedules.startTime', 'Heure Début')}</label>
              <input type="time" className={inputCls} value={newSlot.heureDebut} onChange={(e) => setNewSlot({ ...newSlot, heureDebut: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>{t('schedules.endTime', 'Heure Fin')}</label>
              <input type="time" className={inputCls} value={newSlot.heureFin} onChange={(e) => setNewSlot({ ...newSlot, heureFin: e.target.value })} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t('schedules.room', 'Classe / Salle')}</label>
            <select className={inputCls} value={newSlot.salle} onChange={(e) => setNewSlot({ ...newSlot, salle: e.target.value })}>
              <option value="">{t('schedules.selectRoom', '-- Choisir la Classe --')}</option>
              {classeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>{t('schedules.subject', 'Cours / Matière')}</label>
            <input
              type="text"
              placeholder={isSectionEn ? 'e.g. Mathematics' : 'ex: Français'}
              className={inputCls}
              value={newSlot.cours}
              onChange={(e) => setNewSlot({ ...newSlot, cours: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setAddModalOpen(false)}>{t('common.cancel', 'Annuler')}</Button>
            <Button onClick={handleAddSlot} disabled={!newSlot.jour || !newSlot.cours || !newSlot.salle}>
              {t('common.save', 'Enregistrer')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KPICard value={String(filtered.length)} label={t('schedules.slots', 'Créneaux Planifiés')} icon={<Clock className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="5" label={t('schedules.days', 'Jours de Cours')} icon={<Calendar className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="14h15" label={t('schedules.weeklyVolume', 'Volume Hebdomadaire')} icon={<Clock className="w-5 h-5 text-digi-success" />} />
      </div>

      {/* Filters */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterDropdown
            label="Section"
            value={selectedSection}
            options={[
              { value: 'FRANCOPHONE', label: '🇫🇷 Francophone' },
              { value: 'ANGLOPHONE',  label: '🇬🇧 Anglophone' },
            ]}
            onChange={(v) => { setSelectedSection(v); setSelectedClasse(''); }}
          />
          <FilterDropdown
            label={t('grades.class', 'Classe')}
            value={selectedClasse}
            options={[
              { value: '', label: t('library.allRooms', 'Toutes les salles') },
              ...classeOptions.map(c => ({ value: c, label: c })),
            ]}
            onChange={setSelectedClasse}
          />
          <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isSectionEn ? 'bg-emerald-100 text-emerald-700' : 'bg-digi-purple/10 text-digi-purple'}`}>
            {selectedSection}
          </span>
        </div>
      </Card>

      {/* Schedule Grid */}
      <Card className="shadow-sm border border-slate-100 min-h-[300px] flex flex-col relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 rounded-xl">
             <Loader2 className="w-8 h-8 animate-spin text-digi-purple" />
          </div>
        ) : null}
        <ScheduleGrid entries={filtered} isEn={isSectionEn} />
      </Card>
    </div>
  );
};
export default SchedulePage;
