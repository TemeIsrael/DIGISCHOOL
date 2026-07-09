import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Evaluation extends Model {
  declare idEval: number;
  declare matricule: number;
  declare idEpreuve: number;
  declare idCours: number;
  declare idSession: number;
  declare note: number;
  declare appreciation: string;
}

Evaluation.init(
  {
    idEval: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    matricule: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Eleve',
        key: 'matricule',
      },
    },
    idEpreuve: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Epreuve',
        key: 'idEpreuve',
      },
    },
    idCours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cours',
        key: 'idCours',
      },
    },
    idSession: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Session',
        key: 'idSession',
      },
    },
    note: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    appreciation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Evaluation',
  }
);
