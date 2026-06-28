const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log("Navigating to https://digischool-app.vercel.app/login ...");
  await page.goto('https://digischool-app.vercel.app/login', { waitUntil: 'networkidle' });
  
  console.log("Filling login form...");
  await page.fill('input[name="login"]', 'teacher_2026');
  await page.fill('input[name="password"]', 'teacher123');
  await page.selectOption('select[name="role"]', 'TEACHER');
  
  console.log("Submitting...");
  
  // Listen for the login API response
  const [response] = await Promise.all([
    page.waitForResponse(res => res.url().includes('/auth/login')),
    page.click('button[type="submit"]')
  ]);
  
  console.log("Login API Response Status:", response.status());
  const text = await response.text();
  console.log("Login API Response Body:", text);
  
  await browser.close();
})();
