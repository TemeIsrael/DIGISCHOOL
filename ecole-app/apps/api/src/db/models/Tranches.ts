import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Tranches extends Model {
  declare idTranche: number;
  declare idScolarite: number;
  declare numero: number;
  declare montant: number;
  declare dateEcheance: Date;
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
