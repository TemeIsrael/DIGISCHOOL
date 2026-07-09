import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class VilleNaissance extends Model {
  declare idVille: number;
  declare libelle: string;
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
