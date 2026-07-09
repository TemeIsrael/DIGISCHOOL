import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Paiement extends Model {
  declare idPaie: number;
  declare matricule: number;
  declare idAca: number;
  declare idMode: number;
  declare idPers: number;
  declare montant: number;
  declare date: Date;
  declare trancheCouverte: number;
  declare justificatifUrl: string | null;
  declare actif: boolean;
  declare anneeAcademique?: any;
  declare mode?: any;
}

Paiement.init(
  {
    idPaie: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    matricule: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Eleve',
        key: 'matricule',
      },
    },
    idAca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AnneeAcademique',
        key: 'idAnnee',
      },
    },
    idMode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Mode',
        key: 'idMode',
      },
    },
    idPers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Personne',
        key: 'idPers',
      },
    },
    montant: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    trancheCouverte: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    justificatifUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    actif: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'Paiement',
  }
);
