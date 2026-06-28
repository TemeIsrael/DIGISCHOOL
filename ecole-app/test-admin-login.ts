import { sequelize } from './apps/api/src/db';

async function check() {
  try {
    const [admins] = await sequelize.query("SELECT ID, login, typeAdmin FROM Admin");
    console.log("Admins:", admins);
  } catch(e) {}
  process.exit(0);
}
check();
