const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = new Sequelize('ecole2026', 'ecole', 'peda2026', {
  host: '163.123.183.89',
  port: 17705,
  dialect: 'mysql'
});

const Personne = sequelize.define('Personne', {
  ID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  prenom: { type: DataTypes.STRING, allowNull: false },
  sexe: { type: DataTypes.STRING, allowNull: false },
  dateNaissance: { type: DataTypes.DATEONLY, allowNull: false },
  lieuNaissance: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true },
  adresse: { type: DataTypes.STRING, allowNull: true },
  typePersonne: { type: DataTypes.TINYINT, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  actif: { type: DataTypes.BOOLEAN, defaultValue: true },
  isDelete: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'Personne'
});

async function run() {
  await sequelize.authenticate();
  const passwordHash = await bcrypt.hash('123456', 12);
  
  await Personne.create({
    nom: 'Parent',
    prenom: 'Test',
    sexe: 'M',
    dateNaissance: '1980-01-01',
    lieuNaissance: 'Paris',
    email: 'parent@test.com',
    typePersonne: 2, // 2 for Parent? Let's check what it is
    password: passwordHash
  });

  await Personne.create({
    nom: 'Enseignant',
    prenom: 'Test',
    sexe: 'F',
    dateNaissance: '1990-01-01',
    lieuNaissance: 'Lyon',
    email: 'enseignant@test.com',
    typePersonne: 1, // 1 for Enseignant? Let's check what it is
    password: passwordHash
  });
  
  console.log('Users created successfully');
}
run();
