// ─── Message Types ──────────────────────────────────────────────────

export type MessageType = 'GENERAL' | 'URGENT' | 'ACADEMIQUE' | 'FINANCIER';

export const MESSAGE_TYPE_LABELS: Record<string, string> = {
  GENERAL: 'Général',
  URGENT: 'Urgent',
  ACADEMIQUE: 'Académique',
  FINANCIER: 'Financier',
};

export interface Message {
  idMessages: number;
  idParent: number;
  objet: string;
  contenu: string;
  type: number;
  typeLabel?: MessageType;
  valider: boolean;
  dateEnvoi: string;
  lu: boolean;
  // Joined fields
  expediteurNom?: string;
  expediteurPrenom?: string;
}

export interface MessageCreateInput {
  idParent?: number;
  objet: string;
  contenu: string;
  type: number;
  destinataires?: number[]; // List of user IDs
}

export interface Conversation {
  idConversation: number;
  objet: string;
  dernierMessage: string;
  dateLastMessage: string;
  nombreMessages: number;
  lu: boolean;
  participants: Array<{
    id: number;
    nom: string;
    prenom: string;
    role: string;
  }>;
}

export interface MessageStats {
  total: number;
  nonLus: number;
  envoyes: number;
  recus: number;
}
