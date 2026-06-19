import { sequelize } from '../db';
import { Admin, Personne } from '../db/models';

async function listAccounts() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    const admins = await Admin.findAll({ attributes: ['login', 'typeAdmin', 'actif'], raw: true });
    console.log('\n--- ADMIN ACCOUNTS ---');
    console.table(admins);

    const personnes = await Personne.findAll({ attributes: ['login', 'typePersonne', 'actif'], raw: true });
    console.log('\n--- PERSONNE ACCOUNTS ---');
    console.table(personnes);

    process.exit(0);
  } catch (err) {
    console.error('❌ Error listing accounts:', err);
    process.exit(1);
  }
}

listAccounts();
