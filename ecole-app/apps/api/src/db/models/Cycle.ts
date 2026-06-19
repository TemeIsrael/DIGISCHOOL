import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Cycle extends Model {
  public idCycle!: number;
  public libelle!: string;
}

Cycle.init(
  {
    idCycle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Cycle',
  }
);
