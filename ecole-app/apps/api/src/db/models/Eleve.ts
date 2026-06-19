import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Eleve extends Model {
  public matricule!: number;
  public nom!: string;
  public prenom!: string;
  public dateNaissance!: Date;
  public lieuNaissance!: string;
  public sexe!: number;
  public idVilleNaissance!: number;
  public langue!: string;
  public photoURL!: string | null;
  public actif!: boolean;
  public isDelete!: boolean;
  public idAdmin!: number;
}

Eleve.init(
  {
    matricule: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
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
    photoURL: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '/uploads/anonym.png',
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
  },
  {
    sequelize,
    tableName: 'Eleve',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

