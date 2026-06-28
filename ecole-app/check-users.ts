import { sequelize } from './apps/api/src/db';

async function check() {
  try {
    const [users] = await sequelize.query("SELECT idPers, login, typePersonne, actif FROM Personne WHERE login LIKE '%2026%'");
    console.log("Users in DB:", users);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
check();
