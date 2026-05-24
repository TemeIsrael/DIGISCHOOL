import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Admin extends Model {
  public ID!: number;
  public login!: string;
  public password!: string;
  public typeAdmin!: number; // [0-5]
  public actif!: boolean;
  public isDelete!: boolean;
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
      validate: {
        min: 0,
        max: 5,
      },
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
    tableName: 'Admin',
  }
);
