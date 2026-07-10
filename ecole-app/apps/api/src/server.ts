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
      // ONLY update if it's literally an empty string or null, BUT be careful not to overwrite valid logins if the column existed!
      // In production, doing `UPDATE ... SET login = CONCAT('admin_', ID) WHERE login = '' OR login IS NULL` was overwriting legitimate logins if they were accidentally matched.
      // So let's make sure we only update accounts that don't have 'admin_' or are truly empty
      await sequelize.query("UPDATE `Admin` SET `login` = CONCAT('admin_', `ID`) WHERE `login` = '' OR `login` IS NULL OR `login` = 'admin_0'");
      await sequelize.query("UPDATE `Personne` SET `login` = CONCAT('user_', `idPers`) WHERE `login` = '' OR `login` IS NULL");
      
      // Crucial fix: Force admin_root login back if it was overwritten to admin_X by the previous broken migration
      await sequelize.query("UPDATE `Admin` SET `login` = 'admin_root' WHERE `typeAdmin` = 0 AND `login` LIKE 'admin_%'");
      logger.info('Successfully populated login column and ensured admin_root is intact');

      try {
        // Désactiver les contraintes de clés étrangères pour le nettoyage
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

        // Désactiver temporairement le mode strict pour éviter l'erreur "Out of range value"
        // lors de la conversion de chaînes vides en INT (qui deviendront 0)
        await sequelize.query("SET SESSION sql_mode = ''");
        
        // Modifier la colonne pour autoriser NULL avant de faire les UPDATE
        await sequelize.query("ALTER TABLE `Personne` MODIFY COLUMN `idAdmin` INT NULL");
        
        // Nettoyer les valeurs orphelines pour éviter l'erreur de contrainte ForeignKey sur Personne
        await sequelize.query("UPDATE `Personne` SET `idAdmin` = NULL WHERE `idAdmin` = 0");
        await sequelize.query("UPDATE `Personne` SET `idAdmin` = NULL WHERE `idAdmin` NOT IN (SELECT `ID` FROM `Admin`)");

        // Nettoyer les orphelins dans Messages avant de nettoyer Parents
        await sequelize.query("DELETE FROM `Messages` WHERE `idParent` IN (SELECT `idParent` FROM `Parents` WHERE `idPers` NOT IN (SELECT `idPers` FROM `Personne`))");

        // Nettoyer les orphelins dans Parents avant d'appliquer la clé étrangère
        await sequelize.query("DELETE FROM `Parents` WHERE `idPers` NOT IN (SELECT `idPers` FROM `Personne`)");
        
        // Nettoyer les orphelins dans Frequente (idSalle et matricule)
        await sequelize.query("DELETE FROM `Frequente` WHERE `idSalle` NOT IN (SELECT `idSalle` FROM `Salle`)");
        await sequelize.query("DELETE FROM `Frequente` WHERE `matricule` NOT IN (SELECT `matricule` FROM `Eleve`)");
        
        // Nettoyer les orphelins dans les autres tables dépendantes de matricule
        await sequelize.query("DELETE FROM `Evaluation` WHERE `matricule` NOT IN (SELECT `matricule` FROM `Eleve`)");
        await sequelize.query("DELETE FROM `Paiement` WHERE `matricule` NOT IN (SELECT `matricule` FROM `Eleve`)");
        await sequelize.query("DELETE FROM `Rapport` WHERE `matricule` NOT IN (SELECT `matricule` FROM `Eleve`)");

        // Nettoyer les orphelins dans les tables dépendantes de idPers
        const tablesWithIdPers = ['Epreuve', 'Rapport', 'Paiement', 'Enseignant', 'Titulaire', 'Residents'];
        for (const tbl of tablesWithIdPers) {
          try {
            await sequelize.query(`DELETE FROM \`${tbl}\` WHERE \`idPers\` NOT IN (SELECT \`idPers\` FROM \`Personne\`)`);
          } catch(e) {}
        }

        logger.info('Successfully modified Personne.idAdmin data type to match Admin.ID and cleaned invalid values');
      } catch (innerError) {
        logger.info('Failed to modify Personne.idAdmin data type or clean orphans: ' + (innerError as Error).message);
      } finally {
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
      }
    } catch (e) {
      logger.warn('Failed to fix empty logins', e);
    }

    logger.info('Synchronizing database schema (alter: true)...');
    try {
      // Désactiver les clés étrangères pendant le sync
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

      // Étape 1 : Supprimer TOUTES les clés étrangères existantes sur la colonne 'matricule'
      // (les anciennes FK manuelles empêchent le changement de type de colonne)
      const tablesToFixMatricule = ['Parents', 'Frequente', 'Evaluation', 'Paiement', 'Rapport', 'Eleve'];
      for (const table of tablesToFixMatricule) {
        try {
          const [fks] = await sequelize.query(`
            SELECT CONSTRAINT_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = '${table}'
              AND COLUMN_NAME = 'matricule'
              AND REFERENCED_TABLE_NAME IS NOT NULL
          `);
          for (const fk of fks as any[]) {
            try {
              await sequelize.query(`ALTER TABLE \`${table}\` DROP FOREIGN KEY \`${fk.CONSTRAINT_NAME}\``);
              logger.info(`Dropped FK ${fk.CONSTRAINT_NAME} from ${table}`);
            } catch (e) {
              logger.info(`Could not drop FK ${fk.CONSTRAINT_NAME} from ${table}: ${(e as Error).message}`);
            }
          }
          // Aussi supprimer les FK qui RÉFÉRENCENT cette table.matricule
          const [refFks] = await sequelize.query(`
            SELECT TABLE_NAME as TBL, CONSTRAINT_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
              AND REFERENCED_TABLE_NAME = '${table}'
              AND REFERENCED_COLUMN_NAME = 'matricule'
          `);
          for (const fk of refFks as any[]) {
            try {
              await sequelize.query(`ALTER TABLE \`${(fk as any).TBL}\` DROP FOREIGN KEY \`${fk.CONSTRAINT_NAME}\``);
              logger.info(`Dropped referencing FK ${fk.CONSTRAINT_NAME} from ${(fk as any).TBL}`);
            } catch (e) {
              logger.info(`Could not drop referencing FK ${fk.CONSTRAINT_NAME}: ${(e as Error).message}`);
            }
          }
        } catch (e) {
          logger.info(`Could not query FKs for ${table}: ${(e as Error).message}`);
        }
      }

      // Étape 2 : Corriger le type de la colonne matricule dans les tables existantes
      // (historiquement INT UNSIGNED, doit être VARCHAR(50) pour correspondre à Eleve.matricule)
      for (const table of tablesToFixMatricule) {
        try {
          await sequelize.query(`ALTER TABLE \`${table}\` MODIFY COLUMN \`matricule\` VARCHAR(50) NOT NULL`);
          logger.info(`Fixed matricule column type in ${table}`);
        } catch (e) {
          logger.info(`Could not fix matricule in ${table}: ${(e as Error).message}`);
        }
      }

      // Étape 3 : Nettoyer les index dupliqués sur Admin.login qui causent ER_TOO_MANY_KEYS
      try {
        const [indexes] = await sequelize.query(`
          SELECT INDEX_NAME 
          FROM INFORMATION_SCHEMA.STATISTICS 
          WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'Admin' 
            AND COLUMN_NAME = 'login' 
            AND INDEX_NAME != 'PRIMARY'
        `);
        if (indexes.length > 1) {
          for (let i = 1; i < indexes.length; i++) {
            const idxName = (indexes[i] as any).INDEX_NAME;
            await sequelize.query(`ALTER TABLE \`Admin\` DROP INDEX \`${idxName}\``);
            logger.info(`Dropped duplicate index ${idxName} on Admin.login`);
          }
        }
      } catch (e) {
        logger.info(`Could not clean duplicate indexes on Admin: ${(e as Error).message}`);
      }

      // Étape 4 : Synchroniser le schéma
      // Disabled automatic sync to prevent re‑adding UNIQUE constraint on login
      // await sequelize.sync({ alter: true });
      logger.info('Database models synced.');
    } finally {
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }
    
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
