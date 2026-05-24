import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Classe extends Model {
  public idClasse!: number;
  public idCycle!: number;
  public libelle!: string;
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
  },
  {
    sequelize,
    tableName: 'Classe',
  }
);
