// ─── Payment Types ──────────────────────────────────────────────────

export type PaymentStatus = 'COMPLET' | 'PARTIEL' | 'IMPAYE';

export interface PaymentMode {
  idMode: number;
  libelle: string;
  actif: boolean;
}

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
  // Joined fields
  nomEleve?: string;
  prenomEleve?: string;
  nomMode?: string;
}

export interface PaymentCreateInput {
  matricule: string;
  idAca: number;
  idMode: number;
  montant: number;
  date: string;
  trancheCouverte: number;
  justificatifUrl?: string;
}

export interface PaymentSummary {
  totalAttendu: number;
  totalRecouvre: number;
  resteARecouvrer: number;
  tauxRecouvrement: number;
  nombreComplets: number;
  nombrePartiels: number;
  nombreImpayes: number;
}

export interface PaymentByStudent {
  matricule: string;
  nom: string;
  prenom: string;
  classe: string;
  totalDu: number;
  totalPaye: number;
  reste: number;
  status: PaymentStatus;
  dernierPaiement?: string;
}

export interface TrancheFrais {
  idTranche: number;
  libelle: string;
  montant: number;
  dateEcheance: string;
  idAca: number;
}
