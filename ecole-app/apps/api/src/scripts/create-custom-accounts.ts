import { sequelize } from '../db';
import { hashPassword } from '../lib/bcrypt';

async function run() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    const parentPasswordHashed = await hashPassword('parent123');
    const teacherPasswordHashed = await hashPassword('teacher123');
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // PARENT
    const [existingParent] = await sequelize.query("SELECT idPers FROM Personne WHERE login = 'parent_2026'");
    let parentIdPers: number;
    if ((existingParent as any[]).length > 0) {
      parentIdPers = (existingParent as any[])[0].idPers;
      await sequelize.query(`UPDATE Personne SET password = '${parentPasswordHashed}', typePersonne = 2, actif = 1, isDelete = 0 WHERE idPers = ${parentIdPers}`);
    } else {
      const [insertResult] = await sequelize.query(`INSERT INTO Personne (login, password, typePersonne, idAdmin, actif, isDelete, createdAt, updatedAt) VALUES ('parent_2026', '${parentPasswordHashed}', 2, 1, 1, 0, '${now}', '${now}')`);
      parentIdPers = insertResult as unknown as number;
    }

    // TEACHER
    const [existingTeacher] = await sequelize.query("SELECT idPers FROM Personne WHERE login = 'teacher_2026'");
    let teacherIdPers: number;
    if ((existingTeacher as any[]).length > 0) {
      teacherIdPers = (existingTeacher as any[])[0].idPers;
      await sequelize.query(`UPDATE Personne SET password = '${teacherPasswordHashed}', typePersonne = 1, actif = 1, isDelete = 0 WHERE idPers = ${teacherIdPers}`);
    } else {
      const [insertResult] = await sequelize.query(`INSERT INTO Personne (login, password, typePersonne, idAdmin, actif, isDelete, createdAt, updatedAt) VALUES ('teacher_2026', '${teacherPasswordHashed}', 1, 1, 1, 0, '${now}', '${now}')`);
      teacherIdPers = insertResult as unknown as number;
    }

    console.log('✅ Accounts created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating accounts:', err);
    process.exit(1);
  }
}
run();
