import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Enseignant extends Model {
  declare idEnseignant: number;
  declare idPers: number;
  declare idCours: number;
}

Enseignant.init(
  {
    idEnseignant: {
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
    idCours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cours',
        key: 'idCours',
      },
    },
  },
  {
    sequelize,
    tableName: 'Enseignant',
  }
);
