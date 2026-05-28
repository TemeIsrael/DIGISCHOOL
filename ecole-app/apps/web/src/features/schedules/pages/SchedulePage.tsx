import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { KPICard } from '../../../shared/components/ui/KPICard';
import { FilterDropdown } from '../../../shared/components/tables/FilterDropdown';
import { ScheduleGrid } from '../../../shared/components/business/ScheduleGrid';
import { Clock, Download, FilePlus, Calendar } from 'lucide-react';

const mockSchedule = [
  { jour: 'Lundi', heureDebut: '08:00', heureFin: '10:00', cours: 'Mathématiques', salle: '6ème A' },
  { jour: 'Lundi', heureDebut: '10:15', heureFin: '12:15', cours: 'Français', salle: '6ème A' },
  { jour: 'Lundi', heureDebut: '14:00', heureFin: '16:00', cours: 'Anglais', salle: '5ème B' },
  { jour: 'Mardi', heureDebut: '08:00', heureFin: '10:00', cours: 'Physique', salle: '4ème C' },
  { jour: 'Mardi', heureDebut: '10:15', heureFin: '12:15', cours: 'SVT', salle: '3ème A' },
  { jour: 'Mercredi', heureDebut: '08:00', heureFin: '10:00', cours: 'Mathématiques', salle: '5ème B' },
  { jour: 'Mercredi', heureDebut: '10:15', heureFin: '12:15', cours: 'Histoire-Géo', salle: '6ème A' },
  { jour: 'Jeudi', heureDebut: '08:00', heureFin: '10:00', cours: 'Français', salle: '5ème A' },
  { jour: 'Jeudi', heureDebut: '14:00', heureFin: '16:00', cours: 'Physique', salle: '4ème C' },
  { jour: 'Vendredi', heureDebut: '08:00', heureFin: '10:00', cours: 'Anglais', salle: '6ème A' },
  { jour: 'Vendredi', heureDebut: '10:15', heureFin: '12:15', cours: 'Mathématiques', salle: '3ème A' },
];

export const SchedulePage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedClasse, setSelectedClasse] = useState('Toutes');

  const filtered = selectedClasse === 'Toutes'
    ? mockSchedule
    : mockSchedule.filter((s) => s.salle === selectedClasse);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('schedules.title')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('schedules.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            {t('schedules.export')}
          </Button>
          <Button className="gap-2">
            <FilePlus className="w-4 h-4" />
            {t('schedules.addSlot')}
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard value={String(mockSchedule.length)} label={t('schedules.slots')} icon={<Clock className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="5" label={t('schedules.days')} icon={<Calendar className="w-5 h-5 text-digi-purple" />} />
        <KPICard value="22h" label={t('schedules.weeklyVolume')} icon={<Clock className="w-5 h-5 text-digi-success" />} />
      </div>

      {/* Filter */}
      <Card className="shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <FilterDropdown
            label={t('schedules.class')}
            value={selectedClasse}
            options={['Toutes', '6ème A', '5ème A', '5ème B', '4ème C', '3ème A']}
            onChange={setSelectedClasse}
          />
        </div>
      </Card>

      {/* Schedule Grid */}
      <Card className="shadow-sm border border-slate-100">
        <ScheduleGrid entries={filtered} />
      </Card>
    </div>
  );
};
export default SchedulePage;
