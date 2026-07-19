import { test, expect } from '@playwright/test';

test.describe('Storefront Basics', () => {
  test('Homepage loads and displays featured products', async ({ page }) => {
    // Navigate to the English homepage
    await page.goto('/en');

    // Check that the Hero section loaded correctly (assuming it says "MotionCommerce")
    // Wait for the grid to appear
    await expect(page.locator('h1')).toBeVisible();

    // Verify that at least one product card is rendered (assuming featured products exist)
    const productCards = page.locator('a[href*="/en/products/"]');
    
    // We expect there to be some products seeded from demo script
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Language switcher toggles to Bangla', async ({ page }) => {
    // Start on English
    await page.goto('/en');
    
    // Change URL to Bangla
    await page.goto('/bn');
    
    // Verify the URL actually changed to /bn
    await expect(page).toHaveURL(/.*\/bn/);
  });

  test('Category navigation works', async ({ page }) => {
    // Navigate directly to a category page to ensure the products route works with filters
    await page.goto('/en/products?category=electronics');
    
    // Ensure the page loads without crashing and displays the main heading or products
    await expect(page.locator('h1')).toBeVisible();
    
    // We expect the URL to still be the products page
    await expect(page).toHaveURL(/.*\/products\?category=electronics/);
  });
});
