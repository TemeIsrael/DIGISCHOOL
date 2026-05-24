import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Mode extends Model {
  public idMode!: number;
  public idFondateur!: number;
  public libelle!: string;
  public actif!: boolean;
}

Mode.init(
  {
    idMode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idFondateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    actif: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'Mode',
  }
);
