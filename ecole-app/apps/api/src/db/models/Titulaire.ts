import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Titulaire extends Model {
  public idTitulaire!: number;
  public idPers!: number;
  public idSalle!: number;
}

Titulaire.init(
  {
    idTitulaire: {
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
    idSalle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Salle',
        key: 'idSalle',
      },
    },
  },
  {
    sequelize,
    tableName: 'Titulaire',
  }
);
