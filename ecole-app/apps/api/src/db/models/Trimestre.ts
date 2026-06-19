import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Trimestre extends Model {
  public idTrimes!: number;
  public idAca!: number;
  public libelle!: string;
  public ordre!: number;
}

Trimestre.init(
  {
    idTrimes: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idAca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AnneeAcademique',
        key: 'idAnnee',
      },
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ordre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Trimestre',
  }
);
