import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Epreuve extends Model {
  public idEpreuve!: number;
  public idNature!: number;
  public idPers!: number;
  public fichierUrl!: string;
  public dateCreation!: Date;
  public natureEpreuve?: any;
}

Epreuve.init(
  {
    idEpreuve: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idNature: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NatureEpreuve',
        key: 'idNature',
      },
    },
    idPers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Personne',
        key: 'idPers',
      },
    },
    fichierUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dateCreation: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Epreuve',
  }
);
