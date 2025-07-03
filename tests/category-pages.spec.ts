import { test, expect } from '@playwright/test';

test.describe('Category Pages Tests', () => {
  const categories = [
    { name: 'Action', path: '/action' },
    { name: 'Sports', path: '/sports' },
    { name: 'Puzzle', path: '/puzzle' },
    { name: 'Popular', path: '/popular' }
  ];

  for (const category of categories) {
    test(`should load ${category.name} category page properly`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(category.path);
      await page.waitForLoadState('networkidle');

      // Check page loaded without errors
      expect(page.url()).toContain(category.path);
      expect(consoleErrors).toHaveLength(0);

      // Check page title or heading
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();
      const headingText = await heading.textContent();
      expect(headingText?.toLowerCase()).toContain(category.name.toLowerCase());

      // Check for game cards
      const gameCards = page.locator('[class*="game-card"], article[class*="game"], .game-item');
      const cardCount = await gameCards.count();
      expect(cardCount).toBeGreaterThan(0);

      // Check first game card has required elements
      if (cardCount > 0) {
        const firstCard = gameCards.first();
        await expect(firstCard).toBeVisible();

        // Check for game image
        const gameImage = firstCard.locator('img').first();
        await expect(gameImage).toBeVisible();
        const imgSrc = await gameImage.getAttribute('src');
        expect(imgSrc).toBeTruthy();

        // Check for game title
        const gameTitle = firstCard.locator('h3, h4, .game-title').first();
        await expect(gameTitle).toBeVisible();

        // Check for play button
        const playButton = firstCard.locator('a:has-text("Play"), button:has-text("Play")').first();
        await expect(playButton).toBeVisible();
      }
    });

    test(`should have working game links in ${category.name} category`, async ({ page }) => {
      await page.goto(category.path);
      await page.waitForLoadState('networkidle');

      const gameLinks = page.locator('a[href*="/games/"]');
      const linkCount = await gameLinks.count();

      if (linkCount > 0) {
        // Test first game link
        const firstLink = gameLinks.first();
        const href = await firstLink.getAttribute('href');
        expect(href).toBeTruthy();

        await firstLink.click();
        await page.waitForLoadState('networkidle');

        // Should navigate to game page
        expect(page.url()).toContain('/games/');
        
        // Check game page loaded properly
        const gameFrame = page.locator('iframe, embed, object').first();
        const gameContainer = page.locator('[class*="game-container"], [id*="game"]').first();
        
        // At least one should be visible
        const hasGame = await gameFrame.isVisible() || await gameContainer.isVisible();
        expect(hasGame).toBeTruthy();
      }
    });

    test(`should check for filtering functionality in ${category.name}`, async ({ page }) => {
      await page.goto(category.path);
      await page.waitForLoadState('networkidle');

      // Look for filter options
      const filters = page.locator('select[name*="filter"], button[class*="filter"], [role="combobox"]');
      
      if (await filters.first().isVisible()) {
        const filterCount = await filters.count();
        expect(filterCount).toBeGreaterThan(0);

        // Test clicking first filter
        const firstFilter = filters.first();
        await firstFilter.click();
        
        // Check if options appear
        const options = page.locator('option, [role="option"]');
        const optionCount = await options.count();
        expect(optionCount).toBeGreaterThan(0);
      }
    });
  }

  test('should check for proper pagination if available', async ({ page }) => {
    await page.goto('/popular');
    await page.waitForLoadState('networkidle');

    // Look for pagination
    const pagination = page.locator('[class*="pagination"], nav[aria-label*="pagination"]').first();
    
    if (await pagination.isVisible()) {
      const pageLinks = pagination.locator('a, button');
      const linkCount = await pageLinks.count();
      
      if (linkCount > 0) {
        // Click next page if available
        const nextButton = pagination.locator('a:has-text("Next"), button:has-text("Next"), a[aria-label*="next"]').first();
        
        if (await nextButton.isVisible()) {
          await nextButton.click();
          await page.waitForLoadState('networkidle');
          
          // Check URL changed
          const url = page.url();
          expect(url).toMatch(/page=\d+|p=\d+|\?2/);
        }
      }
    }
  });
});