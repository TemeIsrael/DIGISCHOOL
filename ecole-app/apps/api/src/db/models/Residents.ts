import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Residents extends Model {
  public idResi!: number;
  public idPers!: number;
  public idQuartier!: number;
}

Residents.init(
  {
    idResi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idPers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Personne',
        key: 'idPers',
      },
    },
    idQuartier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Quartier',
        key: 'idQuartier',
      },
    },
  },
  {
    sequelize,
    tableName: 'Residents',
  }
);
