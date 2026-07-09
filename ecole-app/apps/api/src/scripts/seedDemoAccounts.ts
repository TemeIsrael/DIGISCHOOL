import { Admin, Personne } from '../db/models';
import { hashPassword } from '../lib/bcrypt';
import { logger } from '../lib/logger';

export const seedDemoAccounts = async () => {
  try {
    logger.info('Seeding demo accounts...');

    const adminAccounts = [
      { login: 'admin_root', typeAdmin: 0 },
      { login: 'admin_insc', typeAdmin: 1 },
      { login: 'admin_scol', typeAdmin: 2 },
      { login: 'admin_fond', typeAdmin: 3 },
      { login: 'admin_dir', typeAdmin: 4 },
    ];

    const personneAccounts = [
      { login: 'teacher1', typePersonne: 1, nom: 'Teacher', prenom: 'One' },
      { login: 'parent1', typePersonne: 2, nom: 'Parent', prenom: 'One' },
    ];

    const defaultPasswordStr = 'admin123';
    const defaultPassword = await hashPassword(defaultPasswordStr);

    for (const acc of adminAccounts) {
      const [admin, created] = await Admin.findOrCreate({
        where: { login: acc.login },
        defaults: {
          password: defaultPassword,
          typeAdmin: acc.typeAdmin,
          actif: true,
          isDelete: false,
          langue: 'fr'
        }
      });
      if (created) {
        logger.info(`Created demo admin account: ${acc.login}`);
      } else {
        // Always enforce the demo password so tests work
        admin.password = defaultPassword;
        await admin.save();
        logger.info(`Reset password for demo admin account: ${acc.login}`);
      }
    }

    for (const acc of personneAccounts) {
      const [person, created] = await Personne.findOrCreate({
        where: { login: acc.login, typePersonne: acc.typePersonne },
        defaults: {
          password: defaultPassword,
          actif: true,
          isDelete: false,
          langue: 'fr',
          nom: acc.nom,
          prenom: acc.prenom,
          email: `${acc.login}@demo.com`
        }
      });
      if (created) {
        logger.info(`Created demo personne account: ${acc.login}`);
      } else {
        // Always enforce the demo password so tests work
        person.password = defaultPassword;
        await person.save();
        logger.info(`Reset password for demo personne account: ${acc.login}`);
      }
    }

    logger.info('Demo accounts seeding completed.');
  } catch (error) {
    logger.error('Failed to seed demo accounts:', error);
  }
};
