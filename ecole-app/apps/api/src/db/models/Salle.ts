import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Salle extends Model {
  declare idSalle: number;
  declare idClasse: number;
  declare libelle: string;
  declare surface: number;
  declare position: string;
}

Salle.init(
  {
    idSalle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idClasse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Classe',
        key: 'idClasse',
      },
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    surface: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Salle',
  }
);
