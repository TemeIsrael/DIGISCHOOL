import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export class RefreshTokens extends Model {
  public id!: number;
  public token!: string;
  public userId!: number;
  public userType!: string; // 'admin' | 'personne'
  public expiresAt!: Date;
}

RefreshTokens.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [['admin', 'personne']],
      },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'RefreshTokens',
  }
);
