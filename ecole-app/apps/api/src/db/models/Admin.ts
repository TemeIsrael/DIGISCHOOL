import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Admin extends Model {
  declare ID: number;
  declare login: string;
  declare password: string;
  declare typeAdmin: number;
  declare actif: boolean;
  declare isDelete: boolean;
  declare langue: string;
  declare signatureUrl: string | null;
}

Admin.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    typeAdmin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: { min: 0, max: 4 },
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
    signatureUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: 'Admin',
  }
);
