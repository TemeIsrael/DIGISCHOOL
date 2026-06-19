// ─── Grade / Evaluation Types ───────────────────────────────────────

export interface Evaluation {
  idEval: number;
  matricule: string;
  idEpreuve: number;
  idCours: number;
  idSession: number;
  note: number;
  appreciation: string;
  // Joined fields
  nomEleve?: string;
  prenomEleve?: string;
  nomCours?: string;
}

export interface GradeEntry {
  matricule: string;
  idEpreuve: number;
  idCours: number;
  idSession: number;
  note: number;
  appreciation?: string;
}

export interface BulkGradeEntry {
  idCours: number;
  idEpreuve: number;
  idSession: number;
  notes: Array<{
    matricule: string;
    note: number;
    appreciation?: string;
  }>;
}

export interface CourseAverage {
  idCours: number;
  nomCours: string;
  coefficient: number;
  moyenne: number;
  noteMax: number;
  noteMin: number;
  rang?: number;
  appreciation?: string;
}

export interface SessionInfo {
  idSession: number;
  libelle: string; // "Séquence 1", "Séquence 2", ... "Séquence 6"
  idAca: number;
  actif: boolean;
}

export interface EpreuveInfo {
  idEpreuve: number;
  libelle: string; // "Évaluation Séquence 1", "Évaluation Séquence 2", etc.
  coefficient: number;
  noteMax: number;
  idSession: number;
}

// ─── Bulletin (Report Card) ─────────────────────────────────────────

export interface BulletinData {
  matricule: string;
  nom: string;
  prenom: string;
  classe: string;
  session: string;
  anneeAcademique: string;
  cours: CourseAverage[];
  moyenneGenerale: number;
  rang: number;
  effectif: number;
  appreciationGenerale?: string;
  decisionConseil?: string;
}

export interface BulletinListItem {
  matricule: string;
  nom: string;
  prenom: string;
  classe: string;
  moyenneGenerale: number;
  rang: number;
}
