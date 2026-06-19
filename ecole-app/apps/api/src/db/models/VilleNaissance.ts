import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class VilleNaissance extends Model {
  public idVille!: number;
  public libelle!: string;
}

VilleNaissance.init(
  {
    idVille: {
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
    tableName: 'VilleNaissance',
  }
);
