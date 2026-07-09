import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Classe extends Model {
  declare idClasse: number;
  declare idCycle: number;
  declare libelle: string;
  declare section: 'FRANCOPHONE' | 'ANGLOPHONE';
}

Classe.init(
  {
    idClasse: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idCycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cycle',
        key: 'idCycle',
      },
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    section: {
      type: DataTypes.ENUM('FRANCOPHONE', 'ANGLOPHONE'),
      allowNull: false,
      defaultValue: 'FRANCOPHONE',
    },
  },
  {
    sequelize,
    tableName: 'Classe',
  }
);
