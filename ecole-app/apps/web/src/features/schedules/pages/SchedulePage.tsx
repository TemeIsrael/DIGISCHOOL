import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { Modal } from '../../../shared/components/ui/Modal';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { ScheduleGrid } from '../../../shared/components/business/ScheduleGrid';
import { Clock, Download, FilePlus, Calendar } from 'lucide-react';
import { usePermissions } from '../../auth/hooks/usePermissions';

/* ─── Data ─────────────────────────────────────────────────────── */
const mockScheduleFrancophone = [
  { jour: 'Lundi',    heureDebut: '07:30', heureFin: '08:15', cours: 'Français',             salle: 'CM1 A' },
  { jour: 'Lundi',    heureDebut: '08:15', heureFin: '09:00', cours: 'Mathématiques',         salle: 'CM1 A' },
  { jour: 'Lundi',    heureDebut: '09:00', heureFin: '09:45', cours: 'Sciences & Technologie',salle: 'CM1 A' },
  { jour: 'Lundi',    heureDebut: '10:00', heureFin: '10:45', cours: 'Anglais',               salle: 'CE2 A' },
  { jour: 'Lundi',    heureDebut: '10:45', heureFin: '11:30', cours: 'Histoire',              salle: 'CE2 A' },
  { jour: 'Mardi',    heureDebut: '07:30', heureFin: '08:15', cours: 'Mathématiques',         salle: 'CM2 A' },
  { jour: 'Mardi',    heureDebut: '08:15', heureFin: '09:00', cours: 'Français',             salle: 'CM2 A' },
  { jour: 'Mardi',    heureDebut: '09:00', heureFin: '09:45', cours: 'Éducation Civique',    salle: 'CM2 A' },
  { jour: 'Mardi',    heureDebut: '10:00', heureFin: '10:45', cours: 'Géographie',           salle: 'CP A'  },
  { jour: 'Mercredi', heureDebut: '07:30', heureFin: '08:15', cours: 'Français',             salle: 'CE1 A' },
  { jour: 'Mercredi', heureDebut: '08:15', heureFin: '09:00', cours: 'Mathématiques',         salle: 'CE1 A' },
  { jour: 'Mercredi', heureDebut: '09:00', heureFin: '09:45', cours: 'Dessin',               salle: 'CE1 A' },
  { jour: 'Jeudi',    heureDebut: '07:30', heureFin: '08:15', cours: 'Français',             salle: 'CM1 A' },
  { jour: 'Jeudi',    heureDebut: '08:15', heureFin: '09:00', cours: 'Mathématiques',         salle: 'CM1 A' },
  { jour: 'Jeudi',    heureDebut: '10:00', heureFin: '10:45', cours: 'Éducation Physique',   salle: 'CM1 A' },
  { jour: 'Vendredi', heureDebut: '07:30', heureFin: '08:15', cours: 'Mathématiques',         salle: 'CE2 A' },
  { jour: 'Vendredi', heureDebut: '08:15', heureFin: '09:00', cours: 'Français',             salle: 'CE2 A' },
  { jour: 'Vendredi', heureDebut: '09:00', heureFin: '09:45', cours: 'Travail Manuel',       salle: 'CE2 A' },
  { jour: 'Vendredi', heureDebut: '10:00', heureFin: '10:45', cours: 'Chant & Musique',      salle: 'SIL A' },
];

const mockScheduleAnglophone = [
  { jour: 'Monday',    heureDebut: '07:30', heureFin: '08:15', cours: 'English Language',  salle: 'Class 6' },
  { jour: 'Monday',    heureDebut: '08:15', heureFin: '09:00', cours: 'Mathematics',       salle: 'Class 6' },
  { jour: 'Monday',    heureDebut: '09:00', heureFin: '09:45', cours: 'Science & Tech',    salle: 'Class 6' },
  { jour: 'Monday',    heureDebut: '10:00', heureFin: '10:45', cours: 'French',            salle: 'Class 5' },
  { jour: 'Monday',    heureDebut: '10:45', heureFin: '11:30', cours: 'History',           salle: 'Class 5' },
  { jour: 'Tuesday',   heureDebut: '07:30', heureFin: '08:15', cours: 'Mathematics',       salle: 'Class 6' },
  { jour: 'Tuesday',   heureDebut: '08:15', heureFin: '09:00', cours: 'English Language',  salle: 'Class 6' },
  { jour: 'Tuesday',   heureDebut: '09:00', heureFin: '09:45', cours: 'Civics',            salle: 'Class 6' },
  { jour: 'Tuesday',   heureDebut: '10:00', heureFin: '10:45', cours: 'Geography',         salle: 'Class 4' },
  { jour: 'Wednesday', heureDebut: '07:30', heureFin: '08:15', cours: 'English Language',  salle: 'Class 3' },
  { jour: 'Wednesday', heureDebut: '08:15', heureFin: '09:00', cours: 'Mathematics',       salle: 'Class 3' },
  { jour: 'Wednesday', heureDebut: '09:00', heureFin: '09:45', cours: 'Arts & Craft',      salle: 'Class 3' },
  { jour: 'Thursday',  heureDebut: '07:30', heureFin: '08:15', cours: 'English Language',  salle: 'Class 5' },
  { jour: 'Thursday',  heureDebut: '08:15', heureFin: '09:00', cours: 'Mathematics',       salle: 'Class 5' },
  { jour: 'Thursday',  heureDebut: '10:00', heureFin: '10:45', cours: 'Physical Education',salle: 'Class 5' },
  { jour: 'Friday',    heureDebut: '07:30', heureFin: '08:15', cours: 'Mathematics',       salle: 'Class 4' },
  { jour: 'Friday',    heureDebut: '08:15', heureFin: '09:00', cours: 'English Language',  salle: 'Class 4' },
  { jour: 'Friday',    heureDebut: '09:00', heureFin: '09:45', cours: 'Handwork',          salle: 'Class 4' },
  { jour: 'Friday',    heureDebut: '10:00', heureFin: '10:45', cours: 'Music & Singing',   salle: 'Class 1' },
];

const classesFrancophones = ['SIL A', 'CP A', 'CE1 A', 'CE2 A', 'CM1 A', 'CM2 A'];
const classesAnglophones  = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];
const DAYS_FR = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'] as const;
const DAYS_EN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

function exportToCSV(data: typeof mockScheduleFrancophone, filename: string) {
  const header = 'Day,Start,End,Subject,Room';
  const rows   = data.map((r) => `${r.jour},${r.heureDebut},${r.heureFin},${r.cours},${r.salle}`);
  const csv    = [header, ...rows].join('\n');
  const blob   = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  a.href = url; a.download = filename; a.style.display = 'none';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

/* ─── Component ─────────────────────────────────────────────────── */
export const SchedulePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { canAddPersonnelOrStudentsOrSchedules } = usePermissions();
  const appIsEn = i18n.language === 'en';

  const [selectedSection, setSelectedSection] = useState('Francophone');
  const [selectedClasse,  setSelectedClasse]  = useState('');
  const [isAddModalOpen,  setAddModalOpen]    = useState(false);
  const [newSlot, setNewSlot] = useState({ jour: '', heureDebut: '', heureFin: '', cours: '', salle: '' });

  const [scheduleFrancophone, setScheduleFrancophone] = useState(mockScheduleFrancophone);
  const [scheduleAnglophone,  setScheduleAnglophone]  = useState(mockScheduleAnglophone);

  const isSectionEn   = selectedSection === 'Anglophone';
  const scheduleData  = isSectionEn ? scheduleAnglophone : scheduleFrancophone;
  const classeOptions = isSectionEn ? classesAnglophones : classesFrancophones;
  const dayOptions    = isSectionEn ? DAYS_EN            : DAYS_FR;

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    setSelectedClasse('');
  };

  const filtered = selectedClasse
    ? scheduleData.filter((s) => s.salle === selectedClasse)
    : scheduleData;

  const handleAddSlot = () => {
    if (!newSlot.jour || !newSlot.cours || !newSlot.salle) return;
    if (isSectionEn) {
      setScheduleAnglophone((prev) => [...prev, { ...newSlot }]);
    } else {
      setScheduleFrancophone((prev) => [...prev, { ...newSlot }]);
    }
    setAddModalOpen(false);
    setNewSlot({ jour: '', heureDebut: '', heureFin: '', cours: '', salle: '' });
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
          <Button variant="outline" className="gap-2" onClick={() => exportToCSV(filtered, 'timetable.csv')}>
            <Download className="w-4 h-4" />
            {t('grades.export', 'Exporter CSV')}
          </Button>
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
              <input type="text" placeholder="07:30" className={inputCls} value={newSlot.heureDebut} onChange={(e) => setNewSlot({ ...newSlot, heureDebut: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>{t('schedules.endTime', 'Heure Fin')}</label>
              <input type="text" placeholder="08:15" className={inputCls} value={newSlot.heureFin} onChange={(e) => setNewSlot({ ...newSlot, heureFin: e.target.value })} />
            </div>
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
          <div>
            <label className={labelCls}>{t('schedules.room', 'Classe / Salle')}</label>
            <select className={inputCls} value={newSlot.salle} onChange={(e) => setNewSlot({ ...newSlot, salle: e.target.value })}>
              <option value="">{t('schedules.selectRoom', '-- Choisir la Classe --')}</option>
              {classeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
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
              { value: 'Francophone', label: '🇫🇷 Francophone' },
              { value: 'Anglophone',  label: '🇬🇧 Anglophone' },
            ]}
            onChange={handleSectionChange}
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
      <Card className="shadow-sm border border-slate-100">
        <ScheduleGrid entries={filtered} isEn={isSectionEn} />
      </Card>
    </div>
  );
};
export default SchedulePage;
