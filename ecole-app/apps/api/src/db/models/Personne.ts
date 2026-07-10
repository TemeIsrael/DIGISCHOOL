import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Personne extends Model {
  declare idPers: number;
  declare idAdmin: number | null;
  declare login: string;
  declare password: string;
  declare typePersonne: number;
  declare actif: boolean;
  declare isDelete: boolean;
  declare photoURL: string | null;
  // Nouveaux champs pour l'inscription parent/enseignant
  declare nom: string;
  declare prenom: string;
  declare sexe: string;
  declare dateNaissance: Date;
  declare email: string;
  declare telephone1: string;
}

Personne.init(
  {
    idPers: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idAdmin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    login: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    typePersonne: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    actif: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    langue: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'fr',
    },
    nom: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: '',
    },
    prenom: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: '',
    },
    sexe: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'M',
    },
    dateNaissance: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: '2000-01-01',
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
    },
    photoURL: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    telephone1: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: '',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Personne',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
