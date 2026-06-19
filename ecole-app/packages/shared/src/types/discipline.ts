// ─── Discipline Types ───────────────────────────────────────────────

export type IncidentSeverity = 'MINEUR' | 'MAJEUR' | 'CRITIQUE';

export type SanctionType = 'AVERTISSEMENT' | 'BLAME' | 'EXCLUSION_TEMPORAIRE' | 'EXCLUSION_DEFINITIVE' | 'RETENUE' | 'TRAVAIL_SUPPLEMENTAIRE';

export const INCIDENT_SEVERITY_LABELS: Record<IncidentSeverity, string> = {
  MINEUR: 'Mineur',
  MAJEUR: 'Majeur',
  CRITIQUE: 'Critique',
};

export const SANCTION_TYPE_LABELS: Record<SanctionType, string> = {
  AVERTISSEMENT: 'Avertissement',
  BLAME: 'Blâme',
  EXCLUSION_TEMPORAIRE: 'Exclusion temporaire',
  EXCLUSION_DEFINITIVE: 'Exclusion définitive',
  RETENUE: 'Retenue',
  TRAVAIL_SUPPLEMENTAIRE: 'Travail supplémentaire',
};

export interface Incident {
  idIncident: number;
  matricule: string;
  nomEleve?: string;
  prenomEleve?: string;
  classe?: string;
  dateIncident: string;
  description: string;
  severite: IncidentSeverity;
  typeIncident: string;
  temoin?: string;
  lieu?: string;
  actif: boolean;
}

export interface Sanction {
  idSanction: number;
  idIncident: number;
  typeSanction: SanctionType;
  dateDebut: string;
  dateFin?: string;
  description?: string;
  decision: string;
  actif: boolean;
}

export interface IncidentCreateInput {
  matricule: string;
  dateIncident: string;
  description: string;
  severite: IncidentSeverity;
  typeIncident: string;
  temoin?: string;
  lieu?: string;
}

export interface SanctionCreateInput {
  idIncident: number;
  typeSanction: SanctionType;
  dateDebut: string;
  dateFin?: string;
  description?: string;
  decision: string;
}

export interface DisciplineStats {
  totalIncidents: number;
  incidentsMajeurs: number;
  incidentsMineurs: number;
  exclusionsEnCours: number;
}
