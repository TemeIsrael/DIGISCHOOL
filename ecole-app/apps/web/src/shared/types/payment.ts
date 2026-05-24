export interface Payment {
  idPaie: number;
  matricule: string;
  idAca: number;
  idMode: number;
  montant: number;
  date: string;
  trancheCouverte: number;
  justificatifUrl: string | null;
  actif: boolean;
}
