// ─── Student Types ──────────────────────────────────────────────────

export interface Student {
  matricule: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  idVilleNaissance: number;
  langue: string;
  sexe?: 'M' | 'F';
  photo: string | null;
  actif: boolean;
  dateInscription?: string;
}

export interface StudentWithClass extends Student {
  idSalle?: number;
  nomSalle?: string;
  nomClasse?: string;
  nomCycle?: string;
  idAca?: number;
}

export interface StudentCreateInput {
  nom: string;
  prenom: string;
  dateNaissance: string;
  idVilleNaissance: number;
  langue: string;
  sexe?: 'M' | 'F';
  photo?: string;
}

export interface StudentUpdateInput {
  nom?: string;
  prenom?: string;
  dateNaissance?: string;
  idVilleNaissance?: number;
  langue?: string;
  sexe?: 'M' | 'F';
  photo?: string | null;
  actif?: boolean;
}

// ─── Parent Info (linked to Student) ────────────────────────────────

export interface ParentInfo {
  idPers: number;
  nom: string;
  prenom: string;
  telephone?: string;
  email?: string;
  profession?: string;
  relation: 'PERE' | 'MERE' | 'TUTEUR';
}

export interface StudentAssignment {
  matricule: string;
  idSalle: number;
  idAca: number;
}
