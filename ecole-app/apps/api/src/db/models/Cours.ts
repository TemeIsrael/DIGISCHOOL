import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Cours extends Model {
  declare idCours: number;
  declare idClasse: number;
  declare libelle: string;
  declare coefficient: number;
  declare noteMax: number;
}

Cours.init(
  {
    idCours: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idClasse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Classe',
        key: 'idClasse',
      },
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    coefficient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    noteMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
  },
  {
    sequelize,
    tableName: 'Cours',
  }
);
