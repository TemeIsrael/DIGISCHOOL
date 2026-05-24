import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Tranches extends Model {
  public idTranche!: number;
  public idScolarite!: number;
  public numero!: number;
  public montant!: number;
  public dateEcheance!: Date;
}

Tranches.init(
  {
    idTranche: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idScolarite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Scolarite',
        key: 'idScolarite',
      },
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    montant: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dateEcheance: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Tranches',
  }
);
