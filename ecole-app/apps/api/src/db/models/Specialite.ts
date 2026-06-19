import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Specialite extends Model {
  public idSpecialite!: number;
  public libelle!: string;
}

Specialite.init(
  {
    idSpecialite: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Specialite',
  }
);
