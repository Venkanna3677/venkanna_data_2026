import { test, expect } from '@playwright/test';

test('Sauce Demo complete purchase flow', async ({ page }) => {
  page.setDefaultTimeout(5000);
  page.setDefaultNavigationTimeout(5000);
  test.setTimeout(120000);

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 5000,
  });

  await expect(page).toHaveURL('https://www.saucedemo.com/', { timeout: 5000 });
  await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible({ timeout: 5000 });

  await page.locator('[data-test="username"]').fill('standard_user', { timeout: 5000 });
  await page.locator('[data-test="password"]').fill('secret_sauce', { timeout: 5000 });
  await page.locator('[data-test="login-button"]').click({ timeout: 5000 });

  await expect(page).toHaveURL(/.*\/inventory\.html/, { timeout: 5000 });
  await expect(page.locator('[data-test="title"]')).toHaveText('Products', { timeout: 5000 });
  await page.waitForTimeout(5000);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click({ timeout: 5000 });
  await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('1', { timeout: 5000 });
  await page.waitForTimeout(5000);

  await page.locator('[data-test="shopping-cart-link"]').click({ timeout: 5000 });
  await expect(page).toHaveURL(/.*\/cart\.html/, { timeout: 5000 });
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1, { timeout: 5000 });
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
    'Sauce Labs Backpack',
    { timeout: 5000 },
  );
  await page.waitForTimeout(5000);

  await page.locator('[data-test="checkout"]').click({ timeout: 5000 });
  await expect(page).toHaveURL(/.*\/checkout-step-one\.html/, { timeout: 5000 });

  await page.locator('[data-test="firstName"]').fill('Venkanna', { timeout: 5000 });
  await page.locator('[data-test="lastName"]').fill('M', { timeout: 5000 });
  await page.locator('[data-test="postalCode"]').fill('500001', { timeout: 5000 });
  await page.locator('[data-test="continue"]').click({ timeout: 5000 });

  await expect(page).toHaveURL(/.*\/checkout-step-two\.html/, { timeout: 5000 });
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
    'Sauce Labs Backpack',
    { timeout: 5000 },
  );
  await expect(page.locator('[data-test="total-label"]')).toContainText('$32.39', { timeout: 5000 });
  await page.waitForTimeout(5000);

  await page.locator('[data-test="finish"]').click({ timeout: 5000 });
  await expect(page).toHaveURL(/.*\/checkout-complete\.html/, { timeout: 5000 });
  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    'Thank you for your order!',
    { timeout: 5000 },
  );
  await page.waitForTimeout(5000);

  await page.locator('#react-burger-menu-btn').click({ timeout: 5000 });
  await expect(page.locator('#logout_sidebar_link')).toBeVisible({ timeout: 5000 });
  await page.locator('#logout_sidebar_link').click({ timeout: 5000 });

  await expect(page).toHaveURL('https://www.saucedemo.com/', { timeout: 5000 });
  await expect(page.locator('[data-test="login-button"]')).toBeVisible({ timeout: 5000 });
});