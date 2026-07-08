import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class HomeWork extends Model {
  public id!: number;
  public classe!: string;
  public matiere!: string;
  public titre!: string;
  public date!: string; // store as string (YYYY-MM-DD)
  public pdfUrl?: string;
  public created_at!: Date;
}

HomeWork.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    classe: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    matiere: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    titre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'HomeWork',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: false,
  },
);

export default HomeWork;
