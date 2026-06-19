import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Discipline extends Model {
  public ID!: number;
  public libelle!: string;
  public points!: number;
}

Discipline.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'Discipline',
  }
);
