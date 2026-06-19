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
  libelle: string; // "Maternel", "Primaire"
  actif: boolean;
}

// ─── Classe ─────────────────────────────────────────────────────────

export interface Classe {
  idClasse: number;
  libelle: string; // "SIL", "CP", "CE1", "CE2", "CM1", "CM2"
  idCycle: number;
  nomCycle?: string;
  actif: boolean;
}

// ─── Salle ──────────────────────────────────────────────────────────

export interface Salle {
  idSalle: number;
  libelle: string; // "SIL A", "CP A", "CE1 A"
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

export type JourSemaine = 'LUNDI' | 'MARDI' | 'MERCREDI' | 'JEUDI' | 'VENDREDI';

export const JOURS_SEMAINE: JourSemaine[] = [
  'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI',
];

export interface ScheduleSlot {
  idCreneau: number;
  jour: JourSemaine;
  heureDebut: string; // "07:30"
  heureFin: string;   // "08:15"
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

// ─── Primary School Constants ───────────────────────────────────────

/** Cycles d'une école primaire camerounaise (MINEDUB) */
export const CYCLES_PRIMAIRE = ['Maternel', 'Primaire'] as const;

/** Classes du cycle maternel */
export const CLASSES_MATERNEL = ['Petite Section', 'Moyenne Section', 'Grande Section'] as const;

/** Classes du cycle primaire */
export const CLASSES_PRIMAIRE = ['SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'] as const;

/** Matières de base enseignées au primaire */
export const MATIERES_PRIMAIRE = [
  'Français',
  'Mathématiques',
  'Sciences & Technologie',
  'Éducation Civique & Morale',
  'Histoire',
  'Géographie',
  'Anglais',
  'Éducation Physique',
  'Travail Manuel',
  'Dessin',
  'Chant & Musique',
  'Informatique',
] as const;

/** Séquences d'évaluation (6 par an, 2 par trimestre) */
export const SEQUENCES = [
  'Séquence 1',
  'Séquence 2',
  'Séquence 3',
  'Séquence 4',
  'Séquence 5',
  'Séquence 6',
] as const;

/** Barème de notation au primaire camerounais */
export const NOTE_MAX_PRIMAIRE = 10;
