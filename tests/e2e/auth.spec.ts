import { test, expect } from '@playwright/test';

test.describe('Authentication Basics', () => {
  test('User can navigate to login page', async ({ page }) => {
    await page.goto('/en');
    
    // Check for the user icon or login link in header (assuming we have one in top right)
    // We'll just go directly to the login URL since the UI might vary depending on auth state
    await page.goto('/en/login');
    
    // Ensure the login form is rendered
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  // Note: Full registration/login E2E tests require a test database strategy
  // to avoid cluttering the production/dev DB with test users.
  // We'll skip the actual form submission here until we have a dedicated shadow DB.
});
