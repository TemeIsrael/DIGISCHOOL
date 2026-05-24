import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Personne extends Model {
  public idPers!: number;
  public idAdmin!: number | null;
  public login!: string;
  public password!: string;
  public typePersonne!: number; // [1, 2, 4] (1=Teacher, 2=Parent, 4=Other)
  public actif!: boolean;
  public isDelete!: boolean;
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
      references: {
        model: 'Admin',
        key: 'ID',
      },
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
      validate: {
        isIn: [[1, 2, 4]],
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
    tableName: 'Personne',
  }
);
