import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'ecole2026',
  'ecole',
  'peda2026',
  {
    host: '163.123.182.89',
    port: 17705,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

async function analyze() {
  try {
    await sequelize.authenticate();
    console.log('=== CONNECTED TO ecole2026 ===');
    
    // Get all tables
    const [tables] = await sequelize.query('SHOW TABLES');
    const tableNames = (tables as any[]).map((t: any) => Object.values(t)[0] as string);
    console.log('\n=== TABLES ===');
    console.log(tableNames.join(', '));

    // For each table, show columns with their types
    for (const tableName of tableNames) {
      console.log(`\n=== TABLE: ${tableName} ===`);
      const [columns] = await sequelize.query(`SHOW COLUMNS FROM \`${tableName}\``);
      for (const col of columns as any[]) {
        console.log(`  ${col.Field}: ${col.Type} | Null: ${col.Null} | Key: ${col.Key} | Default: ${col.Default} | Extra: ${col.Extra}`);
      }
      
      // Show foreign keys
      const [fks] = await sequelize.query(`
        SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE TABLE_SCHEMA = 'ecole2026'
          AND TABLE_NAME = '${tableName}'
          AND REFERENCED_TABLE_NAME IS NOT NULL
      `);
      if ((fks as any[]).length > 0) {
        console.log(`  --- Foreign Keys ---`);
        for (const fk of fks as any[]) {
          console.log(`  FK: ${fk.COLUMN_NAME} -> ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME} (${fk.CONSTRAINT_NAME})`);
        }
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

analyze();
