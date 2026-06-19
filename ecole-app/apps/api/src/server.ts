import app from './app';
import { env } from './config/env';
import { sequelize } from './db';
import { logger } from './lib/logger';

const startServer = async () => {
  try {
    logger.info('Connecting to the database...');
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');

    if (env.NODE_ENV === 'development') {
      logger.info('Skipping database schema sync to preserve remote data...');
      // await sequelize.sync({ alter: true });
      logger.info('Database models sync skipped.');
    }

    app.listen(env.PORT, '0.0.0.0', () => {
      logger.info(`🚀 [Server]: EcoleApp 2026 API listening on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
