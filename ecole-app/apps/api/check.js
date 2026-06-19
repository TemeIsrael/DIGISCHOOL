const bcrypt = require('bcryptjs');
const hashes = [
  '$2a$12$xiB7NgNyLe620eLnfiyMnexT425z9pAtfgWuPWqjVBUY4i7CYZOvO',
  '$2a$12$abpHg4IVaFREtQz8fy7xiu5hVL0xxL9d6Jv7IN05WknGK6JEyGHxS',
  '$2a$12$8jCO0boYKq/t.0gIcuRC7ufqm7f6rKfEWepoHCD80y8QffZCLHEkS',
  '$2a$12$tfWyFOfpLs0/b907oJCGPeuaHBq6i.lb/uOD2FqtyuXMHi9QEH1fe',
  '$2a$12$qyJ0vvEpOt35Bhlx1AMAxO.wHKixOpRkGG/ToYiT/rk8jW8pVURZG'
];
const pass = 'peda2026';
Promise.all(hashes.map(h => bcrypt.compare(pass, h))).then(console.log);
Promise.all(hashes.map(h => bcrypt.compare('admin', h))).then(console.log);
Promise.all(hashes.map(h => bcrypt.compare('admin123', h))).then(console.log);
