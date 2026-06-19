import { sequelize } from '../db';
import { hashPassword } from '../lib/bcrypt';

async function fixAndSeed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Check if login column exists
    const [results] = await sequelize.query("SHOW COLUMNS FROM Personne LIKE 'login'");
    if ((results as any[]).length === 0) {
      console.log('Adding login column...');
      await sequelize.query("ALTER TABLE Personne ADD login VARCHAR(100)");
      await sequelize.query("UPDATE Personne SET login = CONCAT('user_', idPers) WHERE login IS NULL");
      await sequelize.query("ALTER TABLE Personne MODIFY login VARCHAR(100) NOT NULL UNIQUE");
    }
    
    // Check if createdAt exists
    const [results2] = await sequelize.query("SHOW COLUMNS FROM Personne LIKE 'createdAt'");
    if ((results2 as any[]).length === 0) {
      console.log('Adding createdAt column...');
      await sequelize.query("ALTER TABLE Personne ADD createdAt DATETIME DEFAULT CURRENT_TIMESTAMP");
      await sequelize.query("ALTER TABLE Personne ADD updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP");
    }

    const passwordHashed = await hashPassword('admin123');
    
    // Raw query to insert users if they don't exist
    const insertRaw = async (login: string, type: number) => {
        const [rows] = await sequelize.query(`SELECT idPers FROM Personne WHERE login = '${login}'`);
        if ((rows as any[]).length === 0) {
            await sequelize.query(`
                INSERT INTO Personne (login, password, typePersonne, actif, isDelete)
                VALUES ('${login}', '${passwordHashed}', ${type}, 1, 0)
            `);
            console.log(`✅ Created ${login}`);
        } else {
            console.log(`ℹ️  ${login} already exists.`);
        }
    }

    await insertRaw('teacher1', 1);
    await insertRaw('parent1', 2);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

fixAndSeed();
