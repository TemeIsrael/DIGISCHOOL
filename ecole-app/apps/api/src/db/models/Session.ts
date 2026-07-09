import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Session extends Model {
  declare idSession: number;
  declare idTrimestre: number;
  declare libelle: string;
  declare type: string;
}

Session.init(
  {
    idSession: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idTrimestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Trimestre',
        key: 'idTrimes',
      },
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
    tableName: 'Session',
  }
);
