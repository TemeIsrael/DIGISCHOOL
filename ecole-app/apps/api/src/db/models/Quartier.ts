import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Quartier extends Model {
  public idQuartier!: number;
  public libelle!: string;
}

Quartier.init(
  {
    idQuartier: {
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
    tableName: 'Quartier',
  }
);
