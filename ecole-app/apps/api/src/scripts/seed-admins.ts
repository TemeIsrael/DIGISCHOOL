// file: /home/teme/DIGISCHOOL1/ecole-app/apps/api/src/scripts/seed-admins.ts
import { sequelize } from '../db';
import { Admin } from '../db/models';
import { hashPassword } from '../lib/bcrypt';

async function seedAdmins() {
  try {
    await sequelize.authenticate();
    console.log('✅  DB connection OK');

    // Mot de passe commun (à changer en prod)
    const plainPwd = 'admin123';
    const hashedPwd = await hashPassword(plainPwd);

    // Liste des comptes attendus
    const admins = [
      { login: 'admin_root',        typeAdmin: 0 }, // ROOT
      { login: 'admin_insc',        typeAdmin: 1 }, // ADMIN_INSCRIPTIONS
      { login: 'admin_scol',        typeAdmin: 2 }, // ADMIN_SCOLARITE
      { login: 'admin_fond',        typeAdmin: 3 }, // FONDATEUR
      { login: 'admin_dir',         typeAdmin: 4 }, // DIRECTEUR
    ];

    for (const a of admins) {
      const exists = await Admin.findOne({ where: { login: a.login } });
      if (exists) {
        console.log(`ℹ️  ${a.login} already exists`);
        continue;
      }

      await Admin.create({
        login: a.login,
        password: hashedPwd,
        typeAdmin: a.typeAdmin,
        actif: true,
        isDelete: false,
        langue: 'fr',           // langue par défaut
      });

      console.log(`✅  Created ${a.login} (typeAdmin=${a.typeAdmin})`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌  Seed error:', err);
    process.exit(1);
  }
}

seedAdmins();

