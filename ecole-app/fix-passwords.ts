import { Personne } from './apps/api/src/db/models';
import { hashPassword } from './apps/api/src/lib/bcrypt';

async function fix() {
  try {
    const p1 = await hashPassword('password123');
    await Personne.update({ password: p1 }, { where: { login: 'teacher_2026' } });
    await Personne.update({ password: p1 }, { where: { login: 'parent_2026' } });
    console.log('Passwords updated to password123 successfully!');
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
}
fix();
