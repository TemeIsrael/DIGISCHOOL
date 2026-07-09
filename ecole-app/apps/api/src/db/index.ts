import { Sequelize } from 'sequelize';
import { env } from '../config/env';

const useSSL = env.DB_SSL === 'true' || env.DB_SSL === true;

export const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: 'mysql',
  logging: env.NODE_ENV === 'development' ? console.log : false,
  ...(useSSL ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  } : {}),
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  hooks: {
    afterConnect: (connection: any) => {
      return new Promise<void>((resolve, reject) => {
        // Désactive le mode strict (NO_ZERO_DATE, STRICT_TRANS_TABLES, etc.)
        // Indispensable pour altérer les tables héritées contenant des dates "0000-00-00"
        connection.query("SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION'", (err: any) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
  },
  define: {
    timestamps: true,
    freezeTableName: true
  }
});
