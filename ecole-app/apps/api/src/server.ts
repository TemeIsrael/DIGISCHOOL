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
      await sequelize.query("UPDATE `Personne` SET `login` = CONCAT('user_', `idPers`) WHERE `login` = '' OR `login` IS NULL");
      logger.info('Successfully populated login column for Admin and Personne');

      try {
        // Désactiver temporairement le mode strict pour éviter l'erreur "Out of range value"
        // lors de la conversion de chaînes vides en INT (qui deviendront 0)
        await sequelize.query("SET SESSION sql_mode = ''");
        
        // Modifier la colonne pour autoriser NULL avant de faire les UPDATE
        await sequelize.query("ALTER TABLE `Personne` MODIFY COLUMN `idAdmin` INT NULL");
        
        // Nettoyer les valeurs orphelines pour éviter l'erreur de contrainte ForeignKey sur Personne
        await sequelize.query("UPDATE `Personne` SET `idAdmin` = NULL WHERE `idAdmin` = 0");
        await sequelize.query("UPDATE `Personne` SET `idAdmin` = NULL WHERE `idAdmin` NOT IN (SELECT `ID` FROM `Admin`)");

        // Nettoyer les orphelins dans Parents avant d'appliquer la clé étrangère
        await sequelize.query("DELETE FROM `Parents` WHERE `idPers` NOT IN (SELECT `idPers` FROM `Personne`)");

        logger.info('Successfully modified Personne.idAdmin data type to match Admin.ID and cleaned invalid values');
      } catch (innerError) {
        logger.info('Failed to modify Personne.idAdmin data type: ' + (innerError as Error).message);
      }
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
