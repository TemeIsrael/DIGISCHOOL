import { sequelize } from '../db';
import { Admin, Personne, Enseignant, Parents, Eleve, Cours } from '../db/models';

async function run() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    const [personneCols] = await sequelize.query("SHOW COLUMNS FROM Personne");
    console.log('\n--- PERSONNE COLUMNS ---');
    console.log(personneCols);

    const [parentsCols] = await sequelize.query("SHOW COLUMNS FROM Parents");
    console.log('\n--- PARENTS COLUMNS ---');
    console.log(parentsCols);

    const [enseignantCols] = await sequelize.query("SHOW COLUMNS FROM Enseignant");
    console.log('\n--- ENSEIGNANT COLUMNS ---');
    console.log(enseignantCols);

    // Let's get one student and one course to link to if needed
    const students = await Eleve.findAll({ limit: 1 });
    console.log('\n--- SAMPLE STUDENT ---');
    console.log(students.map(s => ({ matricule: s.matricule, nom: s.nom, prenom: s.prenom })));

    const courses = await Cours.findAll({ limit: 1 });
    console.log('\n--- SAMPLE COURSE ---');
    console.log(courses.map(c => ({ idCours: c.idCours, libelle: c.libelle })));

    process.exit(0);
  } catch (err) {
    console.error('❌ Error inspecting schema:', err);
    process.exit(1);
  }
}

run();
