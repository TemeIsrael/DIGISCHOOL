import { sequelize } from '../db';
import { Eleve, Personne, Parents, Frequente, Residents } from '../db/models';
import { hashPassword } from '../lib/bcrypt';

async function seed() {
  await sequelize.authenticate();
  console.log('Connected to DB');

  const t = await sequelize.transaction();
  try {
    // 1. Create a Personnel (Teacher)
    const teacherPassword = await hashPassword('password123');
    const teacher = await Personne.create({
      login: 'prof.test',
      password: teacherPassword,
      typePersonne: 1, // 1 = Teacher
      nom: 'DURAND',
      prenom: 'Marc',
      actif: true,
      langue: 'fr'
    }, { transaction: t });
    console.log(`Created Teacher: ${teacher.nom} ${teacher.prenom}`);

    // 2. Create 2 Students & 1 Parent
    const parentPassword = await hashPassword('password123');
    const parentPersonne = await Personne.create({
      login: 'parent.test',
      password: parentPassword,
      typePersonne: 2, // 2 = Parent
      nom: 'MARTIN',
      prenom: 'Sophie',
      actif: true,
      langue: 'fr',
      email: 'sophie.martin@test.com'
    }, { transaction: t });

    // Create 2 students
    const student1 = await Eleve.create({
      matricule: 'STU2026-001',
      nom: 'MARTIN',
      prenom: 'Leo',
      dateNaissance: '2015-05-12',
      idVilleNaissance: 1,
      lieuNaissance: 'Paris',
      langue: 'fr',
      statut: 'INSCRIT'
    }, { transaction: t });

    const student2 = await Eleve.create({
      matricule: 'STU2026-002',
      nom: 'MARTIN',
      prenom: 'Lina',
      dateNaissance: '2017-08-22',
      idVilleNaissance: 1,
      lieuNaissance: 'Paris',
      langue: 'fr',
      statut: 'INSCRIT'
    }, { transaction: t });

    // Link Parent to Students
    await Parents.create({ idPers: parentPersonne.idPers, matricule: student1.matricule }, { transaction: t });
    await Parents.create({ idPers: parentPersonne.idPers, matricule: student2.matricule }, { transaction: t });

    console.log(`Created Parent: ${parentPersonne.nom} ${parentPersonne.prenom}`);
    console.log(`Created Students: ${student1.prenom} and ${student2.prenom}`);

    await t.commit();
    console.log('Seed completed successfully');
  } catch (error) {
    await t.rollback();
    console.error('Seed failed:', error);
  } finally {
    process.exit(0);
  }
}

seed();
