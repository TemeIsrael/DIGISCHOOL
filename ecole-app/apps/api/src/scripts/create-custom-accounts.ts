import { sequelize } from '../db';
import { hashPassword } from '../lib/bcrypt';

async function run() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    // 1. Get sample student matricule using a raw query to avoid model mismatches
    const [students] = await sequelize.query("SELECT matricule FROM Eleve LIMIT 1");
    if ((students as any[]).length === 0) {
      throw new Error("No student found in the database. Please add a student first.");
    }
    const studentMatricule = (students as any[])[0].matricule;
    console.log(`Using sample student matricule: ${studentMatricule}`);

    // 2. Get sample course ID
    const [courses] = await sequelize.query("SELECT idCours FROM Cours LIMIT 1");
    if ((courses as any[]).length === 0) {
      throw new Error("No course found in the database.");
    }
    const courseId = (courses as any[])[0].idCours;
    console.log(`Using sample course ID: ${courseId}`);

    // Passwords
    const parentPasswordHashed = await hashPassword('parent123');
    const teacherPasswordHashed = await hashPassword('teacher123');

    // 3. Create or Update Parent in Personne
    const [existingParent] = await sequelize.query("SELECT idPers FROM Personne WHERE login = 'parent_2026'");
    let parentIdPers: number;
    if ((existingParent as any[]).length > 0) {
      parentIdPers = (existingParent as any[])[0].idPers;
      await sequelize.query(`
        UPDATE Personne 
        SET password = '${parentPasswordHashed}', typePersonne = 2, actif = 1, isDelete = 0
        WHERE idPers = ${parentIdPers}
      `);
      console.log(`✅ Updated existing parent (idPers: ${parentIdPers})`);
    } else {
      const [insertResult] = await sequelize.query(`
        INSERT INTO Personne (login, password, typePersonne, idAdmin, actif, isDelete)
        VALUES ('parent_2026', '${parentPasswordHashed}', 2, 1, 1, 0)
      `);
      parentIdPers = insertResult as unknown as number;
      console.log(`✅ Created parent user parent_2026 (idPers: ${parentIdPers})`);
    }

    // Associate Parent in Parents table
    const [existingParentRelation] = await sequelize.query(`SELECT idParent FROM Parents WHERE idPers = ${parentIdPers}`);
    if ((existingParentRelation as any[]).length === 0) {
      await sequelize.query(`
        INSERT INTO Parents (idPers, matricule, idAdmin, isDelete)
        VALUES (${parentIdPers}, ${studentMatricule}, 1, 0)
      `);
      console.log(`✅ Linked parent to student ${studentMatricule}`);
    }

    // 4. Create or Update Teacher in Personne
    const [existingTeacher] = await sequelize.query("SELECT idPers FROM Personne WHERE login = 'teacher_2026'");
    let teacherIdPers: number;
    if ((existingTeacher as any[]).length > 0) {
      teacherIdPers = (existingTeacher as any[])[0].idPers;
      await sequelize.query(`
        UPDATE Personne 
        SET password = '${teacherPasswordHashed}', typePersonne = 1, actif = 1, isDelete = 0
        WHERE idPers = ${teacherIdPers}
      `);
      console.log(`✅ Updated existing teacher (idPers: ${teacherIdPers})`);
    } else {
      const [insertResult] = await sequelize.query(`
        INSERT INTO Personne (login, password, typePersonne, idAdmin, actif, isDelete)
        VALUES ('teacher_2026', '${teacherPasswordHashed}', 1, 1, 1, 0)
      `);
      teacherIdPers = insertResult as unknown as number;
      console.log(`✅ Created teacher user teacher_2026 (idPers: ${teacherIdPers})`);
    }

    // Associate Teacher in Enseignant table
    const [existingTeacherRelation] = await sequelize.query(`SELECT idEnseignant FROM Enseignant WHERE idPers = ${teacherIdPers}`);
    if ((existingTeacherRelation as any[]).length === 0) {
      await sequelize.query(`
        INSERT INTO Enseignant (idPers, idCours, idAdmin, isDelete)
        VALUES (${teacherIdPers}, ${courseId}, 1, 0)
      `);
      console.log(`✅ Linked teacher to course ${courseId}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating accounts:', err);
    process.exit(1);
  }
}

run();
