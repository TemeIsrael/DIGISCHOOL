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
    const safeFindOrCreate = async (model, where, defaults) => {
      try {
        const [instance] = await model.findOrCreate({ where, defaults });
        return instance;
      } catch (e) {
        // If duplicate entry, fetch the existing one
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
    const classeCM1 = await safeFindOrCreate(Classe, { libelle: 'CM1', idCycle: cycle.idCycle }, { libelle: 'CM1', idCycle: cycle.idCycle, niveau: 4, scolarite: 50000 });
    const salleCM1A = await safeFindOrCreate(Salle, { libelle: 'CM1 A', idClasse: classeCM1.idClasse }, { libelle: 'CM1 A', idClasse: classeCM1.idClasse, code: 'CM1A', capacite: 50 });

    // 5. Cours
    const coursMath = await safeFindOrCreate(Cours, { libelle: 'Mathématiques', idClasse: classeCM1.idClasse }, { libelle: 'Mathématiques', idClasse: classeCM1.idClasse, coefficient: 4, noteMax: 20 });
    const coursFr = await safeFindOrCreate(Cours, { libelle: 'Français', idClasse: classeCM1.idClasse }, { libelle: 'Français', idClasse: classeCM1.idClasse, coefficient: 4, noteMax: 20 });

    // 6. Users: Teacher
    const teacher = await safeFindOrCreate(Personne, { login: 'prof_math' }, { login: 'prof_math', password: passwordHashed, typePersonne: 1, nom: 'LEGRAND', prenom: 'Julien' });
    await Enseignant.findOrCreate({ where: { idPers: teacher.idPers, idCours: coursMath.idCours }, defaults: { idPers: teacher.idPers, idCours: coursMath.idCours } });
    await Enseignant.findOrCreate({ where: { idPers: teacher.idPers, idCours: coursFr.idCours }, defaults: { idPers: teacher.idPers, idCours: coursFr.idCours } });

    // 7. Users: Parent & Students
    const parent = await safeFindOrCreate(Personne, { login: 'parent_dupont' }, { login: 'parent_dupont', password: passwordHashed, typePersonne: 2, nom: 'DUPONT', prenom: 'Jean' });
    const eleve1 = await safeFindOrCreate(Eleve, { matricule: 'EL-001' }, { matricule: 'EL-001', nom: 'DUPONT', prenom: 'Alice', dateNaissance: '2015-04-10' });
    const eleve2 = await safeFindOrCreate(Eleve, { matricule: 'EL-002' }, { matricule: 'EL-002', nom: 'MBARGA', prenom: 'Paul', dateNaissance: '2015-06-15' });
    await Parents.findOrCreate({ where: { idPers: parent.idPers, matricule: eleve1.matricule }, defaults: { idPers: parent.idPers, matricule: eleve1.matricule, lienParente: 'Père' } });
    await Frequente.findOrCreate({ where: { matricule: eleve1.matricule, idAcademi: annee.idAnnee }, defaults: { matricule: eleve1.matricule, idAcademi: annee.idAnnee, idSalle: salleCM1A.idSalle, type: 1 } });
    await Frequente.findOrCreate({ where: { matricule: eleve2.matricule, idAcademi: annee.idAnnee }, defaults: { matricule: eleve2.matricule, idAcademi: annee.idAnnee, idSalle: salleCM1A.idSalle, type: 1 } });

    // 8. Homeworks
    await HomeWork.findOrCreate({ where: { titre: 'Exercices sur les fractions' }, defaults: { classe: 'CM1 A', matiere: 'Mathématiques', titre: 'Exercices sur les fractions', date: '2026-06-20' } });

    // 9. Evaluations (Grades)
    await Evaluation.findOrCreate({ where: { matricule: eleve1.matricule, idCours: coursMath.idCours, idSession: session.idSession }, defaults: { matricule: eleve1.matricule, idCours: coursMath.idCours, idSession: session.idSession, note: 14.5, appreciation: 'Bien' } });
    await Evaluation.findOrCreate({ where: { matricule: eleve2.matricule, idCours: coursMath.idCours, idSession: session.idSession }, defaults: { matricule: eleve2.matricule, idCours: coursMath.idCours, idSession: session.idSession, note: 11, appreciation: 'Passable' } });

    console.log('✅ Mocks seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seedMocks();

  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');

    const passwordHashed = await hashPassword('password123');

    // 1. Academic Year
    const [annee] = await AnneeAcademique.findOrCreate({
      where: { libelle: '2025-2026' },
      defaults: { libelle: '2025-2026', courante: false }
    });

    // 2. Trimester
    const [trimestre] = await Trimestre.findOrCreate({
      where: { libelle: 'Trimestre 1', idAca: annee.idAnnee },
      defaults: { libelle: 'Trimestre 1', idAca: annee.idAnnee }
    });

    // 3. Session (Séquence)
    const [session] = await Session.findOrCreate({
      where: { libelle: 'Séquence 1', idTrimestre: trimestre.idTrimes },
      defaults: { libelle: 'Séquence 1', idTrimestre: trimestre.idTrimes }
    });
    
    // Cycle
    const [cycle] = await Cycle.findOrCreate({
      where: { libelle: 'Primaire' },
      defaults: { libelle: 'Primaire' }
    });

    // 4. Classe & Salle
    const [classeCM1] = await Classe.findOrCreate({
      where: { libelle: 'CM1', idCycle: cycle.idCycle },
      defaults: { libelle: 'CM1', idCycle: cycle.idCycle, niveau: 4, scolarite: 50000 }
    });

    const [salleCM1A] = await Salle.findOrCreate({
      where: { libelle: 'CM1 A', idClasse: classeCM1.idClasse },
      defaults: { libelle: 'CM1 A', idClasse: classeCM1.idClasse, code: 'CM1A', capacite: 50 }
    });

    // 5. Cours
    const [coursMath] = await Cours.findOrCreate({
      where: { libelle: 'Mathématiques', idClasse: classeCM1.idClasse },
      defaults: { libelle: 'Mathématiques', idClasse: classeCM1.idClasse, coefficient: 4, noteMax: 20 }
    });

    const [coursFr] = await Cours.findOrCreate({
      where: { libelle: 'Français', idClasse: classeCM1.idClasse },
      defaults: { libelle: 'Français', idClasse: classeCM1.idClasse, coefficient: 4, noteMax: 20 }
    });

    // 6. Users: Teacher
    const [teacher] = await Personne.findOrCreate({
      where: { login: 'prof_math' },
      defaults: { login: 'prof_math', password: passwordHashed, typePersonne: 1, nom: 'LEGRAND', prenom: 'Julien', actif: 1, isDelete: 0 }
    });

    await Enseignant.findOrCreate({
      where: { idPers: teacher.idPers, idCours: coursMath.idCours },
      defaults: { idPers: teacher.idPers, idCours: coursMath.idCours, isDelete: 0 }
    });

    await Enseignant.findOrCreate({
      where: { idPers: teacher.idPers, idCours: coursFr.idCours },
      defaults: { idPers: teacher.idPers, idCours: coursFr.idCours, isDelete: 0 }
    });

    // 7. Users: Parent & Students
    const [parent] = await Personne.findOrCreate({
      where: { login: 'parent_dupont' },
      defaults: { login: 'parent_dupont', password: passwordHashed, typePersonne: 2, nom: 'DUPONT', prenom: 'Jean' }
    });

    const [eleve1] = await Eleve.findOrCreate({
      where: { matricule: 'EL-001' },
      defaults: { matricule: 'EL-001', nom: 'DUPONT', prenom: 'Alice', dateNaissance: '2015-04-10' }
    });
    const [eleve2] = await Eleve.findOrCreate({
      where: { matricule: 'EL-002' },
      defaults: { matricule: 'EL-002', nom: 'MBARGA', prenom: 'Paul', dateNaissance: '2015-06-15' }
    });

    await Parents.findOrCreate({
      where: { idPers: parent.idPers, matricule: eleve1.matricule },
      defaults: { idPers: parent.idPers, matricule: eleve1.matricule, lienParente: 'Père' }
    });

    await Frequente.findOrCreate({
      where: { matricule: eleve1.matricule, idAcademi: annee.idAnnee },
      defaults: { matricule: eleve1.matricule, idAcademi: annee.idAnnee, idSalle: salleCM1A.idSalle, type: 1 }
    });
    
    await Frequente.findOrCreate({
      where: { matricule: eleve2.matricule, idAcademi: annee.idAnnee },
      defaults: { matricule: eleve2.matricule, idAcademi: annee.idAnnee, idSalle: salleCM1A.idSalle, type: 1 }
    });

    // 8. Homeworks
    await HomeWork.findOrCreate({
      where: { titre: 'Exercices sur les fractions' },
      defaults: { classe: 'CM1 A', matiere: 'Mathématiques', titre: 'Exercices sur les fractions', date: '2026-06-20' }
    });
    
    // 9. Evaluations (Grades)
    await Evaluation.findOrCreate({
      where: { matricule: eleve1.matricule, idCours: coursMath.idCours, idSession: session.idSession },
      defaults: { matricule: eleve1.matricule, idCours: coursMath.idCours, idSession: session.idSession, note: 14.5, appreciation: 'Bien' }
    });
    await Evaluation.findOrCreate({
      where: { matricule: eleve2.matricule, idCours: coursMath.idCours, idSession: session.idSession },
      defaults: { matricule: eleve2.matricule, idCours: coursMath.idCours, idSession: session.idSession, note: 11, appreciation: 'Passable' }
    });

    console.log('✅ Mocks seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seedMocks();
