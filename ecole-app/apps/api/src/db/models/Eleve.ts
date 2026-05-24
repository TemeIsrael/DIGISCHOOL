import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Eleve extends Model {
  public matricule!: string;
  public nom!: string;
  public prenom!: string;
  public dateNaissance!: Date;
  public idVilleNaissance!: number;
  public langue!: string;
  public photo!: string | null;
  public actif!: boolean;
  public isDelete!: boolean;
}

Eleve.init(
  {
    matricule: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dateNaissance: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    idVilleNaissance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    langue: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'fr',
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
  },
  {
    sequelize,
    tableName: 'Eleve',
  }
);
