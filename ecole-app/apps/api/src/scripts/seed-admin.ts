/**
 * Seed script — creates the first admin if the Admin table is empty.
 * Run: npx ts-node src/scripts/seed-admin.ts
 */
import { sequelize } from '../db';
import { Admin } from '../db/models';
import { hashPassword } from '../lib/bcrypt';

const ADMIN_LOGIN = process.env.DEV_ADMIN_LOGIN || 'admin';
const ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD || 'admin123';
const ADMIN_TYPE = Number(process.env.DEV_ADMIN_TYPE || '1');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced');

    const count = await Admin.count({ where: { isDelete: false } });
    if (count > 0) {
      console.log(`ℹ️  ${count} admin(s) already exist. Skipping seed.`);
      process.exit(0);
    }

    const hashed = await hashPassword(ADMIN_PASSWORD);
    const admin = await Admin.create({
      login: ADMIN_LOGIN,
      password: hashed,
      typeAdmin: ADMIN_TYPE
    });

    console.log('🎉 Admin created successfully:');
    console.log(`   Login:    ${ADMIN_LOGIN}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`   Type:     ${ADMIN_TYPE}`);
    console.log(`   ID:       ${admin.ID}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
