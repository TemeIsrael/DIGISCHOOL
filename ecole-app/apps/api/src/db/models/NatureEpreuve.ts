import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class NatureEpreuve extends Model {
  public idNature!: number;
  public libelle!: string;
  public type!: string; // e.g. "Devoir", "Examen"
}

NatureEpreuve.init(
  {
    idNature: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'NatureEpreuve',
  }
);
