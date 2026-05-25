// ─── Academic Year ──────────────────────────────────────────────────

export interface AcademicYear {
  idAca: number;
  libelle: string; // "2025-2026"
  dateDebut: string;
  dateFin: string;
  actif: boolean;
  courante: boolean;
}

// ─── Cycle ──────────────────────────────────────────────────────────

export interface Cycle {
  idCycle: number;
  libelle: string; // "Maternelle", "Primaire", "Secondaire"
  actif: boolean;
}

// ─── Classe ─────────────────────────────────────────────────────────

export interface Classe {
  idClasse: number;
  libelle: string; // "6ème", "5ème", etc.
  idCycle: number;
  nomCycle?: string;
  actif: boolean;
}

// ─── Salle ──────────────────────────────────────────────────────────

export interface Salle {
  idSalle: number;
  libelle: string; // "6ème A", "5ème B"
  idClasse: number;
  nomClasse?: string;
  capacite: number;
  effectif?: number;
  idAca: number;
  actif: boolean;
}

// ─── Course ─────────────────────────────────────────────────────────

export interface CourseInfo {
  idCours: number;
  libelle: string;
  coefficient: number;
  idClasse: number;
  nomClasse?: string;
  actif: boolean;
}

// ─── Schedule ───────────────────────────────────────────────────────

export type JourSemaine = 'LUNDI' | 'MARDI' | 'MERCREDI' | 'JEUDI' | 'VENDREDI' | 'SAMEDI';

export const JOURS_SEMAINE: JourSemaine[] = [
  'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI',
];

export interface ScheduleSlot {
  idCreneau: number;
  jour: JourSemaine;
  heureDebut: string; // "08:00"
  heureFin: string;   // "09:00"
  idCours: number;
  nomCours?: string;
  idSalle: number;
  nomSalle?: string;
  idEnseignant?: number;
  nomEnseignant?: string;
  prenomEnseignant?: string;
  idAca: number;
}

export interface ScheduleSlotCreateInput {
  jour: JourSemaine;
  heureDebut: string;
  heureFin: string;
  idCours: number;
  idSalle: number;
  idEnseignant?: number;
  idAca: number;
}
