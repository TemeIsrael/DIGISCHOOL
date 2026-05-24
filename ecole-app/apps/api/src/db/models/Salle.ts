import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Salle extends Model {
  public idSalle!: number;
  public idClasse!: number;
  public libelle!: string;
  public surface!: number;
  public position!: string;
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
