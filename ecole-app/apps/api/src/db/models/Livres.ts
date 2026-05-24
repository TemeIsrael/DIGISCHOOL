import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class Livres extends Model {
  public idLivre!: number;
  public idSpecialite!: number;
  public titre!: string;
  public auteur!: string;
  public fichierUrl!: string;
}

Livres.init(
  {
    idLivre: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idSpecialite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    auteur: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fichierUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Livres',
  }
);
