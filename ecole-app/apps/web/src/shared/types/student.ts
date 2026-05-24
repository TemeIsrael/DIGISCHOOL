export interface Student {
  matricule: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  idVilleNaissance: number;
  langue: string;
  photo: string | null;
  actif: boolean;
}
