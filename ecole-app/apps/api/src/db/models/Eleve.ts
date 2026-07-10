import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Eleve extends Model {
  declare matricule: string;
  declare nom: string;
  declare prenom: string;
  declare dateNaissance: Date;
  declare lieuNaissance: string;
  declare sexe: number;
  declare idVilleNaissance: number;
  declare langue: string;
  declare photo: string | null;

  declare actif: boolean;
  declare isDelete: boolean;
  declare idAdmin: number;
}

Eleve.init(
  {
    matricule: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    dateNaissance: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    lieuNaissance: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    sexe: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    langue: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'NON DEFINI',
    },
    photo: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },

    actif: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    idVilleNaissance: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    idAdmin: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Eleve',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

