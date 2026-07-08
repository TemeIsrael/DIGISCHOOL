import { sequelize } from '../db';
import { Admin, Personne, Eleve, Parents, AnneeAcademique, Trimestre, Session, Cycle, Classe, Salle, Cours, Enseignant, Frequente, HomeWork, Evaluation } from '../db/models';
import { hashPassword } from '../lib/bcrypt';

async function seedMocks() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');

    const passwordHashed = await hashPassword('password123');

    // Utility wrapper
    const safeFindOrCreate = async (model: any, where: any, defaults: any) => {
      try {
        const [instance] = await model.findOrCreate({ where, defaults });
        return instance;
      } catch (e: any) {
        if (e.name === 'SequelizeUniqueConstraintError') {
          const existing = await model.findOne({ where });
          if (existing) return existing;
        }
        console.error('⚠️ Unexpected error in safeFindOrCreate for', model.name, e);
        throw e;
      }
    };

    // 1. Academic Year
    const annee = await safeFindOrCreate(AnneeAcademique, { libelle: '2025-2026' }, { libelle: '2025-2026', courante: false });

    // 2. Trimester
    const trimestre = await safeFindOrCreate(Trimestre, { libelle: 'Trimestre 1', idAca: annee.idAnnee }, { libelle: 'Trimestre 1', idAca: annee.idAnnee });

    // 3. Session (Séquence)
    const session = await safeFindOrCreate(Session, { libelle: 'Séquence 1', idTrimestre: trimestre.idTrimes }, { libelle: 'Séquence 1', idTrimestre: trimestre.idTrimes });

    // Cycle
    const cycle = await safeFindOrCreate(Cycle, { libelle: 'Primaire' }, { libelle: 'Primaire' });

    // 4. Classe & Salle
    const classeCM1 = await safeFindOrCreate(Classe, { libelle: 'CM1', idCycle: cycle.idCycle }, { libelle: 'CM1', idCycle: cycle.idCycle });
    const salleCM1A = await safeFindOrCreate(Salle, { libelle: 'CM1 A', idClasse: classeCM1.idClasse }, { libelle: 'CM1 A', idClasse: classeCM1.idClasse });

    // 5. Cours
    const coursMath = await safeFindOrCreate(Cours, { libelle: 'Mathématiques', idClasse: classeCM1.idClasse }, { libelle: 'Mathématiques', idClasse: classeCM1.idClasse, coefficient: 4, noteMax: 20 });
    const coursFr = await safeFindOrCreate(Cours, { libelle: 'Français', idClasse: classeCM1.idClasse }, { libelle: 'Français', idClasse: classeCM1.idClasse, coefficient: 4, noteMax: 20 });

    // 6. Users: Teacher
    const teacher = await safeFindOrCreate(Personne, { login: 'prof_math' }, { login: 'prof_math', password: passwordHashed, typePersonne: 1, nom: 'LEGRAND', prenom: 'Julien' });
    await safeFindOrCreate(Enseignant, { idPers: teacher.idPers, idCours: coursMath.idCours }, { idPers: teacher.idPers, idCours: coursMath.idCours });
    await safeFindOrCreate(Enseignant, { idPers: teacher.idPers, idCours: coursFr.idCours }, { idPers: teacher.idPers, idCours: coursFr.idCours });

    // 7. Users: Parent & Students
    const parent = await safeFindOrCreate(Personne, { login: 'parent_dupont' }, { login: 'parent_dupont', password: passwordHashed, typePersonne: 2, nom: 'DUPONT', prenom: 'Jean' });
    const eleve1 = await safeFindOrCreate(Eleve, { matricule: 'EL-001' }, { matricule: 'EL-001', nom: 'DUPONT', prenom: 'Alice', dateNaissance: '2015-04-10' });
    const eleve2 = await safeFindOrCreate(Eleve, { matricule: 'EL-002' }, { matricule: 'EL-002', nom: 'MBARGA', prenom: 'Paul', dateNaissance: '2015-06-15' });
    await safeFindOrCreate(Parents, { idPers: parent.idPers, matricule: eleve1.matricule }, { idPers: parent.idPers, matricule: eleve1.matricule, lienParente: 'Père' });
    await safeFindOrCreate(Frequente, { matricule: eleve1.matricule, idAcademi: annee.idAnnee }, { matricule: eleve1.matricule, idAcademi: annee.idAnnee, idSalle: salleCM1A.idSalle, type: 1 });
    await safeFindOrCreate(Frequente, { matricule: eleve2.matricule, idAcademi: annee.idAnnee }, { matricule: eleve2.matricule, idAcademi: annee.idAnnee, idSalle: salleCM1A.idSalle, type: 1 });

    // 8. Homeworks
    await safeFindOrCreate(HomeWork, { titre: 'Exercices sur les fractions' }, { classe: 'CM1 A', matiere: 'Mathématiques', titre: 'Exercices sur les fractions', date: '2026-06-20' });

    // 9. Evaluations (Grades)
    await safeFindOrCreate(Evaluation, { matricule: eleve1.matricule, idCours: coursMath.idCours, idSession: session.idSession }, { matricule: eleve1.matricule, idCours: coursMath.idCours, idSession: session.idSession, note: 14.5, appreciation: 'Bien' });
    await safeFindOrCreate(Evaluation, { matricule: eleve2.matricule, idCours: coursMath.idCours, idSession: session.idSession }, { matricule: eleve2.matricule, idCours: coursMath.idCours, idSession: session.idSession, note: 11, appreciation: 'Passable' });

    console.log('✅ Mocks seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seedMocks();
