import { sequelize } from '../db';
import { Admin } from '../db/models/Admin';
import { hashPassword } from '../lib/bcrypt';

const admins = [
  { login: 'admin_root',  password: 'admin123', typeAdmin: 0 },
  { login: 'admin_insc',  password: 'admin123', typeAdmin: 1 },
  { login: 'admin_scol',  password: 'admin123', typeAdmin: 2 },
  { login: 'admin_fond',  password: 'admin123', typeAdmin: 3 },
  { login: 'admin_dir',   password: 'admin123', typeAdmin: 4 },
];

async function setup() {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de données connectée');

    // Synchroniser la table Admin en forçant la recréation (pour effacer les anciennes données corrompues)
    await Admin.sync();
    console.log('✅ Table Admin synchronisée');

    // Créer ou mettre à jour chaque administrateur
    for (const adminData of admins) {
      try {
        const hashed = await hashPassword(adminData.password);
        
        const admin = await Admin.findOne({ where: { login: adminData.login } });
        
        if (admin) {
          await admin.update({
            password: hashed,
            typeAdmin: adminData.typeAdmin,
            actif: true,
            isDelete: false
          });
          console.log(`✅ Compte mis à jour : login=${adminData.login}  typeAdmin=${adminData.typeAdmin}`);
        } else {
          await Admin.create({
            login: adminData.login,
            password: hashed,
            typeAdmin: adminData.typeAdmin,
            actif: true,
            isDelete: false
          });
          console.log(`✅ Compte créé : login=${adminData.login}  typeAdmin=${adminData.typeAdmin}`);
        }
      } catch (err: any) {
        console.error(`❌ Erreur pour ${adminData.login}:`, err.message);
      }
    }

    const rows = await Admin.findAll({
      where: { isDelete: false },
      order: [['typeAdmin', 'ASC']],
      attributes: ['login', 'typeAdmin', 'actif'],
      raw: true
    });

    console.log('\n📋 Comptes admin dans la base :');
    console.table(rows);

    console.log('\n🎉 Setup terminé ! Voici vos informations de connexion :');
    console.log('┌───────────────┬───────────┬──────────────────────────┐');
    console.log('│ Login         │ Password  │ Rôle (champ UI)          │');
    console.log('├───────────────┼───────────┼──────────────────────────┤');
    console.log('│ admin_root    │ admin123  │ ROOT                     │');
    console.log('│ admin_insc    │ admin123  │ ADMIN INSCRIPTIONS       │');
    console.log('│ admin_scol    │ admin123  │ ADMIN SCOLARITE          │');
    console.log('│ admin_fond    │ admin123  │ FONDATEUR                │');
    console.log('│ admin_dir     │ admin123  │ DIRECTEUR                │');
    console.log('│ admin_aud     │ admin123  │ ADMIN AUDITEUR           │');
    console.log('└───────────────┴───────────┴──────────────────────────┘');

    process.exit(0);
  } catch (err) {
    console.error('❌ Setup échoué :', err);
    process.exit(1);
  }
}

setup();
