import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Rapport extends Model {
  public idRap!: number;
  public matricule!: number;
  public idAca!: number;
  public idPers!: number;
  public idDiscipline!: number;
  public points!: number;
  public date!: Date;
  public statut!: string; // e.g. "Draft", "Approved", "Rejected"
}

Rapport.init(
  {
    idRap: {
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
    idAca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AnneeAcademique',
        key: 'idAnnee',
      },
    },
    idPers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Personne',
        key: 'idPers',
      },
    },
    idDiscipline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Discipline',
        key: 'ID',
      },
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    statut: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Draft',
    },
  },
  {
    sequelize,
    tableName: 'Rapport',
  }
);
