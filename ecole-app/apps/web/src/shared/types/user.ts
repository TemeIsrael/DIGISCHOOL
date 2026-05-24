export interface AdminUser {
  ID: number;
  login: string;
  typeAdmin: number;
  actif: boolean;
}

export interface PersonneUser {
  idPers: number;
  login: string;
  typePersonne: number;
  actif: boolean;
}
