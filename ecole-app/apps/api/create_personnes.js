const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize('ecole2026', 'ecole', 'peda2026', {
  host: '163.123.183.89',
  port: 17705,
  dialect: 'mysql'
});

async function run() {
  try {
    const passwordHash = await bcrypt.hash('admin123', 12);
    
    // Parent
    await sequelize.query(`
      INSERT INTO Personne (login, password, typePersonne, actif, isDelete, createdAt, updatedAt)
      VALUES ('parent_test', '${passwordHash}', 2, 1, 0, NOW(), NOW())
    `);
    console.log('Parent created: login=parent_test, password=admin123');

    // Enseignant
    await sequelize.query(`
      INSERT INTO Personne (login, password, typePersonne, actif, isDelete, createdAt, updatedAt)
      VALUES ('enseignant_test', '${passwordHash}', 1, 1, 0, NOW(), NOW())
    `);
    console.log('Enseignant created: login=enseignant_test, password=admin123');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
