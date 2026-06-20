// tests/login.spec.ts
import { test, expect } from '@playwright/test';

// Reset authentication store before each test
test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    const store = (window as any).__STORE__?.getState?.();
    if (store && typeof store.resetAuth === 'function') {
      store.resetAuth();
    }
  });
});

const users = [
  { login: 'admin_root',    password: 'admin123',    role: 'ADMIN_ROOT' },
  { login: 'teacher_2026',  password: 'teacher123',  role: 'TEACHER' },
  { login: 'parent_2026',   password: 'parent123',   role: 'PARENT' },
];

for (const u of users) {
  test(`connexion ${u.role}`, async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="login"]', u.login);
    await page.fill('[name="password"]', u.password);
    await page.selectOption('[name="role"]', u.role);
    await page.click('button:has-text("Connexion")');
    // attendre la redirection du tableau de bord
    await expect(page).toHaveURL(/dashboard/);
    // vérifier que le token est présent dans le store (exposé via window.__STORE__)
    const token = await page.evaluate(() => {
      const store = (window as any).__STORE__?.getState?.();
      return store?.accessToken;
    });
    expect(token).toBeTruthy();
  });
}
