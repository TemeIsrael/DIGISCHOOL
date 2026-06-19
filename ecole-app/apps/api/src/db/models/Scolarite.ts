import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Scolarite extends Model {
  public idScolarite!: number;
  public idCycle!: number;
  public idFondateur!: number;
  public montantInscription!: number;
  public pension!: number;
}

Scolarite.init(
  {
    idScolarite: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idCycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cycle',
        key: 'idCycle',
      },
    },
    idFondateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    montantInscription: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    pension: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'Scolarite',
  }
);
