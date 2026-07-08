import { sequelize } from '../db';
import '../db/models';

async function sync() {
  try {
    console.log('Synchronizing database with { alter: true }...');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }
}

sync();
