import { Admin } from './Admin';
import { Personne } from './Personne';
import { Eleve } from './Eleve';
import { Parents } from './Parents';
import { AnneeAcademique } from './AnneeAcademique';
import { Trimestre } from './Trimestre';
import { Session } from './Session';
import { Cycle } from './Cycle';
import { Classe } from './Classe';
import { Salle } from './Salle';
import { Cours } from './Cours';
import { Enseignant } from './Enseignant';
import { Titulaire } from './Titulaire';
import { EmploiDuTemps } from './EmploiDuTemps';
import { Frequente } from './Frequente';
import { NatureEpreuve } from './NatureEpreuve';
import { Epreuve } from './Epreuve';
import { Evaluation } from './Evaluation';
import { Scolarite } from './Scolarite';
import { Tranches } from './Tranches';
import { Mode } from './Mode';
import { Paiement } from './Paiement';
import { Messages } from './Messages';
import { Discipline } from './Discipline';
import { Rapport } from './Rapport';
import { Livres } from './Livres';
import { Quartier } from './Quartier';
import { Residents } from './Residents';
import { VilleNaissance } from './VilleNaissance';
import { Specialite } from './Specialite';
import { RefreshTokens } from './RefreshTokens';
import { HomeWork } from './HomeWork';

// Associations Setup

// Admin <-> Personne
Admin.hasOne(Personne, { foreignKey: 'idAdmin', as: 'personne' });
Personne.belongsTo(Admin, { foreignKey: 'idAdmin', as: 'admin' });

// Personne <-> Parents
Personne.hasMany(Parents, { foreignKey: 'idPers', as: 'parents' });
Parents.belongsTo(Personne, { foreignKey: 'idPers', as: 'personne' });

// Eleve <-> Parents
Eleve.hasMany(Parents, { foreignKey: 'matricule', as: 'parents' });
Parents.belongsTo(Eleve, { foreignKey: 'matricule', as: 'eleve' });

// AnneeAcademique <-> Trimestre
AnneeAcademique.hasMany(Trimestre, { foreignKey: 'idAca', as: 'trimestres' });
Trimestre.belongsTo(AnneeAcademique, { foreignKey: 'idAca', as: 'anneeAcademique' });

// Trimestre <-> Session
Trimestre.hasMany(Session, { foreignKey: 'idTrimestre', as: 'sessions' });
Session.belongsTo(Trimestre, { foreignKey: 'idTrimestre', as: 'trimestre' });

// Cycle <-> Classe
Cycle.hasMany(Classe, { foreignKey: 'idCycle', as: 'classes' });
Classe.belongsTo(Cycle, { foreignKey: 'idCycle', as: 'cycle' });

// Classe <-> Salle
Classe.hasMany(Salle, { foreignKey: 'idClasse', as: 'salles' });
Salle.belongsTo(Classe, { foreignKey: 'idClasse', as: 'classe' });

// Classe <-> Cours
Classe.hasMany(Cours, { foreignKey: 'idClasse', as: 'cours' });
Cours.belongsTo(Classe, { foreignKey: 'idClasse', as: 'classe' });

// Personne <-> Enseignant
Personne.hasMany(Enseignant, { foreignKey: 'idPers', as: 'enseignements' });
Enseignant.belongsTo(Personne, { foreignKey: 'idPers', as: 'personne' });

// Cours <-> Enseignant
Cours.hasMany(Enseignant, { foreignKey: 'idCours', as: 'enseignants' });
Enseignant.belongsTo(Cours, { foreignKey: 'idCours', as: 'cours' });

// Personne <-> Titulaire
Personne.hasMany(Titulaire, { foreignKey: 'idPers', as: 'titularisations' });
Titulaire.belongsTo(Personne, { foreignKey: 'idPers', as: 'personne' });

// Salle <-> Titulaire
Salle.hasMany(Titulaire, { foreignKey: 'idSalle', as: 'titulaires' });
Titulaire.belongsTo(Salle, { foreignKey: 'idSalle', as: 'salle' });

// Classe <-> EmploiDuTemps
Classe.hasMany(EmploiDuTemps, { foreignKey: 'idClasse', as: 'emploisDuTemps' });
EmploiDuTemps.belongsTo(Classe, { foreignKey: 'idClasse', as: 'classe' });

// Cours <-> EmploiDuTemps
Cours.hasMany(EmploiDuTemps, { foreignKey: 'idCours', as: 'emploisDuTemps' });
EmploiDuTemps.belongsTo(Cours, { foreignKey: 'idCours', as: 'cours' });

// Salle <-> Frequente
Salle.hasMany(Frequente, { foreignKey: 'idSalle', as: 'frequentations' });
Frequente.belongsTo(Salle, { foreignKey: 'idSalle', as: 'salle' });

// AnneeAcademique <-> Frequente
AnneeAcademique.hasMany(Frequente, { foreignKey: 'idAcademi', as: 'frequentations' });
Frequente.belongsTo(AnneeAcademique, { foreignKey: 'idAcademi', as: 'anneeAcademique' });

// Eleve <-> Frequente
Eleve.hasMany(Frequente, { foreignKey: 'matricule', as: 'frequentations' });
Frequente.belongsTo(Eleve, { foreignKey: 'matricule', as: 'eleve' });

// NatureEpreuve <-> Epreuve
NatureEpreuve.hasMany(Epreuve, { foreignKey: 'idNature', as: 'epreuves' });
Epreuve.belongsTo(NatureEpreuve, { foreignKey: 'idNature', as: 'natureEpreuve' });

// Personne <-> Epreuve
Personne.hasMany(Epreuve, { foreignKey: 'idPers', as: 'epreuves' });
Epreuve.belongsTo(Personne, { foreignKey: 'idPers', as: 'personne' });

// Eleve <-> Evaluation
Eleve.hasMany(Evaluation, { foreignKey: 'matricule', as: 'evaluations' });
Evaluation.belongsTo(Eleve, { foreignKey: 'matricule', as: 'eleve' });

// Epreuve <-> Evaluation
Epreuve.hasMany(Evaluation, { foreignKey: 'idEpreuve', as: 'evaluations' });
Evaluation.belongsTo(Epreuve, { foreignKey: 'idEpreuve', as: 'epreuve' });

// Cours <-> Evaluation
Cours.hasMany(Evaluation, { foreignKey: 'idCours', as: 'evaluations' });
Evaluation.belongsTo(Cours, { foreignKey: 'idCours', as: 'cours' });

// Session <-> Evaluation
Session.hasMany(Evaluation, { foreignKey: 'idSession', as: 'evaluations' });
Evaluation.belongsTo(Session, { foreignKey: 'idSession', as: 'session' });

// Cycle <-> Scolarite
Cycle.hasMany(Scolarite, { foreignKey: 'idCycle', as: 'scolarites' });
Scolarite.belongsTo(Cycle, { foreignKey: 'idCycle', as: 'cycle' });

// Scolarite <-> Tranches
Scolarite.hasMany(Tranches, { foreignKey: 'idScolarite', as: 'tranches' });
Tranches.belongsTo(Scolarite, { foreignKey: 'idScolarite', as: 'scolarite' });

// Eleve <-> Paiement
Eleve.hasMany(Paiement, { foreignKey: 'matricule', as: 'paiements' });
Paiement.belongsTo(Eleve, { foreignKey: 'matricule', as: 'eleve' });

// AnneeAcademique <-> Paiement
AnneeAcademique.hasMany(Paiement, { foreignKey: 'idAca', as: 'paiements' });
Paiement.belongsTo(AnneeAcademique, { foreignKey: 'idAca', as: 'anneeAcademique' });

// Mode <-> Paiement
Mode.hasMany(Paiement, { foreignKey: 'idMode', as: 'paiements' });
Paiement.belongsTo(Mode, { foreignKey: 'idMode', as: 'mode' });

// Personne <-> Paiement
Personne.hasMany(Paiement, { foreignKey: 'idPers', as: 'paiements' });
Paiement.belongsTo(Personne, { foreignKey: 'idPers', as: 'personne' });

// Parents <-> Messages
Parents.hasMany(Messages, { foreignKey: 'idParent', as: 'messages' });
Messages.belongsTo(Parents, { foreignKey: 'idParent', as: 'parent' });

// Eleve <-> Rapport
Eleve.hasMany(Rapport, { foreignKey: 'matricule', as: 'rapports' });
Rapport.belongsTo(Eleve, { foreignKey: 'matricule', as: 'eleve' });

// AnneeAcademique <-> Rapport
AnneeAcademique.hasMany(Rapport, { foreignKey: 'idAca', as: 'rapports' });
Rapport.belongsTo(AnneeAcademique, { foreignKey: 'idAca', as: 'anneeAcademique' });

// Personne <-> Rapport
Personne.hasMany(Rapport, { foreignKey: 'idPers', as: 'rapports' });
Rapport.belongsTo(Personne, { foreignKey: 'idPers', as: 'personne' });

// Discipline <-> Rapport
Discipline.hasMany(Rapport, { foreignKey: 'idDiscipline', as: 'rapports' });
Rapport.belongsTo(Discipline, { foreignKey: 'idDiscipline', as: 'discipline' });

// Personne <-> Residents
Personne.hasMany(Residents, { foreignKey: 'idPers', as: 'residences' });
Residents.belongsTo(Personne, { foreignKey: 'idPers', as: 'personne' });

// Quartier <-> Residents
Quartier.hasMany(Residents, { foreignKey: 'idQuartier', as: 'residents' });
Residents.belongsTo(Quartier, { foreignKey: 'idQuartier', as: 'quartier' });

export {
  Admin,
  Personne,
  Eleve,
  Parents,
  AnneeAcademique,
  Trimestre,
  Session,
  Cycle,
  Classe,
  Salle,
  Cours,
  Enseignant,
  Titulaire,
  EmploiDuTemps,
  Frequente,
  NatureEpreuve,
  Epreuve,
  Evaluation,
  Scolarite,
  Tranches,
  Mode,
  Paiement,
  Messages,
  Discipline,
  Rapport,
  Livres,
  Quartier,
  Residents,
  VilleNaissance,
  Specialite,
  RefreshTokens,
  HomeWork
};
