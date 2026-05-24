import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class AnneeAcademique extends Model {
  public idAnnee!: number;
  public libelle!: string;
  public courante!: boolean;
}

AnneeAcademique.init(
  {
    idAnnee: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    libelle: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    courante: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'AnneeAcademique',
  }
);
