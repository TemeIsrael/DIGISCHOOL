export interface Message {
  idMessages: number;
  idParent: number;
  objet: string;
  contenu: string;
  type: number;
  valider: boolean;
  dateEnvoi: string;
  lu: boolean;
}
