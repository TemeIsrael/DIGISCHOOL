import { sequelize } from '../db';
import { Op } from 'sequelize';
import { Admin, Enseignant, Parents, Eleve, Cours } from '../db/models';

/**
 * Utility script to inspect the database schema, list key accounts, and clean unexpected admin accounts.
 * Also lists teacher (Enseignant) and parent accounts.
 */
async function run() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    // Show column definitions for debugging
    const [personneCols] = await sequelize.query("SHOW COLUMNS FROM Personne");
    console.log('\n--- PERSONNE COLUMNS ---');
    console.log(personneCols);

    const [parentsCols] = await sequelize.query("SHOW COLUMNS FROM Parents");
    console.log('\n--- PARENTS COLUMNS ---');
    console.log(parentsCols);

    const [enseignantCols] = await sequelize.query("SHOW COLUMNS FROM Enseignant");
    console.log('\n--- ENSEIGNANT COLUMNS ---');
    console.log(enseignantCols);

    // Sample data fetches to verify models work
    const students = await Eleve.findAll({ limit: 1 });
    console.log('\n--- SAMPLE STUDENT ---');
    console.log(students.map(s => ({ matricule: s.matricule, nom: s.nom, prenom: s.prenom })));

    const courses = await Cours.findAll({
      limit: 1,
      attributes: ['idCours', 'idClasse', 'libelle', 'coefficient'],
    });
    console.log('\n--- SAMPLE COURSE ---');
    console.log(courses.map(c => ({ idCours: c.idCours, libelle: c.libelle })));

    // Admin accounts handling
    const expectedLogins = ['admin_root', 'admin_insc', 'admin_scol', 'admin_fond', 'admin_dir'];
    const admins = await Admin.findAll();
    const filteredAdmins = admins.filter(a => expectedLogins.includes(a.login));
    console.log('\n--- ADMIN ACCOUNTS (expected) ---');
    console.log(filteredAdmins.map(a => ({ login: a.login, typeAdmin: a.typeAdmin, actif: a.actif })));

    // Remove any unexpected admin accounts (e.g., admin_aud, jude)
    await Admin.destroy({ where: { login: { [Op.notIn]: expectedLogins } } });
    console.log('✅ Unexpected admin accounts removed');

    // Teacher (Enseignant) accounts
    const teacherAccounts = await Enseignant.findAll({
      attributes: ['idEnseignant', 'idPers', 'idCours'],
    });
    console.log('\n--- TEACHER ACCOUNTS ---');
    console.log(teacherAccounts.map(t => ({
      idEnseignant: t.idEnseignant,
      idPers: t.idPers,
      idCours: t.idCours,
    })));

    // Parent accounts
    const parentAccounts = await Parents.findAll({
      attributes: ['idParent', 'idPers', 'matricule'],
    });
    console.log('\n--- PARENT ACCOUNTS ---');
    console.log(parentAccounts.map(p => ({
      idParent: p.idParent,
      idPers: p.idPers,
      matricule: p.matricule,
    })));

    // Verify expected admin logins exist after cleanup
    const missing = expectedLogins.filter(l => !filteredAdmins.some(a => a.login === l));
    if (missing.length) {
      console.warn('⚠️ Missing expected admin accounts:', missing);
    } else {
      console.log('✅ All expected admin accounts are present (excluding director)');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error inspecting schema:', err);
    process.exit(1);
  }
}

run();
