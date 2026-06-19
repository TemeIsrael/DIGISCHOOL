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
  declare langue: string;
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
      unique: true,
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
  },
  {
    sequelize,
    tableName: 'Personne',
  }
);
