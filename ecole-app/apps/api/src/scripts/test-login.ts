import { Admin } from '../db/models/Admin';
import { comparePassword } from '../lib/bcrypt';
import { sequelize } from '../db';

async function test() {
  await sequelize.authenticate();
  const user = await Admin.findOne({ where: { login: 'admin_root' } });
  if (user) {
    console.log("User found! typeAdmin:", user.typeAdmin);
    const isValid = await comparePassword('admin123', user.password);
    console.log("Password valid:", isValid);
  } else {
    console.log("User not found");
  }
  process.exit(0);
}
test();
