import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Frequente extends Model {
  public idFrequente!: number;
  public idSalle!: number;
  public idAcademi!: number;
  public matricule!: number;
  public salle?: any;
  public eleve?: any;
}

Frequente.init(
  {
    idFrequente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idSalle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Salle',
        key: 'idSalle',
      },
    },
    idAcademi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AnneeAcademique',
        key: 'idAnnee',
      },
    },
    matricule: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Eleve',
        key: 'matricule',
      },
    },
  },
  {
    sequelize,
    tableName: 'Frequente',
  }
);
