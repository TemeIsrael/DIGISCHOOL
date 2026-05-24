import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class EmploiDuTemps extends Model {
  public idTemps!: number;
  public idClasse!: number;
  public idCours!: number;
  public jour!: string;
  public heureDebut!: string;
  public heureFin!: string;
}

EmploiDuTemps.init(
  {
    idTemps: {
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
    idCours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cours',
        key: 'idCours',
      },
    },
    jour: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    heureDebut: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    heureFin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'EmploiDuTemps',
  }
);
