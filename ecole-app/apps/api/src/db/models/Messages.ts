import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Messages extends Model {
  public idMessages!: number;
  public idParent!: number;
  public objet!: string;
  public contenu!: string;
  public type!: number; // [0,1,2] (e.g. Info, Alert, Convocation)
  public valider!: boolean;
  public dateEnvoi!: Date;
  public lu!: boolean;
}

Messages.init(
  {
    idMessages: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idParent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parents',
        key: 'idParent',
      },
    },
    objet: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        isIn: [[0, 1, 2]],
      },
    },
    valider: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateEnvoi: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    lu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'Messages',
  }
);
