import { sequelize } from '../db';

async function check() {
  const [users] = await sequelize.query("SELECT idPers, login, typePersonne, actif FROM Personne WHERE login LIKE '%2026%'");
  console.log("Users:", users);
  process.exit(0);
}
check();
