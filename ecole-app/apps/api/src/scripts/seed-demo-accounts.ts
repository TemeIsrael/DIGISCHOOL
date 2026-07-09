import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

const sequelize = new Sequelize('ecole2026', 'ecole', 'peda2026', {
  host: '163.123.182.89',
  port: 17705,
  dialect: 'mysql',
  logging: false
});

const Admin = sequelize.define('Admin', {
  idAdmin: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  mot_de_passe: { type: DataTypes.STRING },
  typeAdmin: { type: DataTypes.INTEGER }
}, { tableName: 'Admin', timestamps: false });

const Personne = sequelize.define('Personne', {
  idPersonne: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  mot_de_passe: { type: DataTypes.STRING },
  typePersonne: { type: DataTypes.INTEGER }
}, { tableName: 'Personne', timestamps: false });

async function run() {
  await sequelize.authenticate();
  const pwd = await bcrypt.hash('admin123', 10);

  const admins = [
    { login: 'admin_root', type: 1 },
    { login: 'admin_insc', type: 2 },
    { login: 'admin_scol', type: 3 },
    { login: 'admin_fond', type: 4 },
    { login: 'admin_dir', type: 5 }
  ];

  for (const a of admins) {
    const [admin, created] = await Admin.findOrCreate({
      where: { login: a.login },
      defaults: { mot_de_passe: pwd, typeAdmin: a.type }
    });
    if (!created) {
      await admin.update({ mot_de_passe: pwd, typeAdmin: a.type });
    }
  }

  const personnes = [
    { login: 'teacher1', type: 1 },
    { login: 'parent1', type: 2 }
  ];

  for (const p of personnes) {
    const [pers, created] = await Personne.findOrCreate({
      where: { login: p.login },
      defaults: { mot_de_passe: pwd, typePersonne: p.type }
    });
    if (!created) {
      await pers.update({ mot_de_passe: pwd, typePersonne: p.type });
    }
  }

  console.log('Demo accounts seeded/updated successfully!');
  process.exit(0);
}
run().catch(console.error);
