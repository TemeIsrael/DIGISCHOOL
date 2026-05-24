import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Frequente extends Model {
  public idFrequente!: number;
  public idSalle!: number;
  public idAcademi!: number;
  public matricule!: string;
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
      type: DataTypes.STRING(50),
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
