import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Parents extends Model {
  public idParent!: number;
  public idPers!: number;
  public matricule!: number;
}

Parents.init(
  {
    idParent: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idPers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Personne',
        key: 'idPers',
      },
    },
    matricule: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Eleve',
        key: 'matricule',
      },
    },
  },
  {
    sequelize,
    tableName: 'Parents',
    indexes: [
      {
        unique: true,
        fields: ['idPers', 'matricule'],
      },
    ],
  }
);
