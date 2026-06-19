// Re-export shared types
export type { Message, MessageCreateInput, Conversation, MessageStats } from '@ecole-app/shared';
export type { MessageType } from '@ecole-app/shared';
export { MESSAGE_TYPE_LABELS } from '@ecole-app/shared';

// ─── Frontend-specific Message Types ────────────────────────────────

export interface MessageListFilters {
  search?: string;
  type?: number;
  lu?: boolean;
  dateDebut?: string;
  dateFin?: string;
}

export interface MessageListItem {
  idMessages: number;
  objet: string;
  contenu: string;
  expediteurNom: string;
  expediteurPrenom: string;
  dateEnvoi: string;
  lu: boolean;
  type: number;
  typeLabel: string;
}
