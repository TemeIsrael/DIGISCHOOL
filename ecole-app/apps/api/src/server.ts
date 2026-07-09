import app from './app';
import { env } from './config/env';
import { sequelize } from './db';
import { logger } from './lib/logger';

const startServer = async () => {
  try {
    logger.info('Connecting to the database...');
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');

    logger.info('Fixing duplicate empty logins in Admin table before sync...');
    try {
      try {
        await sequelize.query("ALTER TABLE `Admin` ADD COLUMN `login` VARCHAR(100)");
        logger.info('Successfully added login column manually');
      } catch (innerError) {
        // Log this to know if it failed or if the column already existed
        logger.info('ALTER TABLE skipped or failed (column might already exist): ' + (innerError as Error).message);
      }
      await sequelize.query("UPDATE `Admin` SET `login` = CONCAT('admin_', `ID`) WHERE `login` = '' OR `login` IS NULL");
      logger.info('Successfully populated login column');
    } catch (e) {
      logger.warn('Failed to fix empty logins', e);
    }

    logger.info('Synchronizing database schema (alter: true)...');
    await sequelize.sync({ alter: true });
    logger.info('Database models synced.');
    
    // Create demo accounts
    const { seedDemoAccounts } = require('./scripts/seedDemoAccounts');
    await seedDemoAccounts();

    const server = app.listen(env.PORT, '0.0.0.0', () => {
      logger.info(`🚀 [Server]: DIGISCHOOL API listening on port ${env.PORT}`);
    });

    // Initialize WebSockets
    const { initializeSocket } = require('./lib/socket');
    initializeSocket(server);
  } catch (error) {
    logger.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
