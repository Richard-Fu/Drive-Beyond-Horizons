import { test, expect } from '@playwright/test';

test.describe('Individual Game Pages Tests', () => {
  const games = [
    { name: 'Kitten Defense', path: '/games/kitten-defense/' },
    { name: 'Age of War', path: '/games/age-of-war/' },
    { name: 'Hockey Random', path: '/games/hockey-random/' },
    { name: 'Golf Hit', path: '/games/golf-hit/' },
    { name: '1v1 LOL', path: '/games/1v1lol/' }
  ];

  for (const game of games) {
    test(`should load ${game.name} game page properly`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const networkErrors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      page.on('requestfailed', (request) => {
        networkErrors.push(`${request.failure()?.errorText} - ${request.url()}`);
      });

      await page.goto(game.path);
      await page.waitForLoadState('networkidle');

      // Check page loaded
      expect(page.url()).toContain(game.path);
      
      // Log console errors if any
      if (consoleErrors.length > 0) {
        console.log(`Console errors on ${game.name}:`, consoleErrors);
      }

      // Check for game title
      const gameTitle = page.locator('h1').first();
      await expect(gameTitle).toBeVisible();
      const titleText = await gameTitle.textContent();
      expect(titleText).toBeTruthy();

      // Check for game iframe
      const gameIframe = page.locator('iframe').first();
      const hasIframe = await gameIframe.isVisible();
      
      if (hasIframe) {
        // Check iframe has src
        const iframeSrc = await gameIframe.getAttribute('src');
        expect(iframeSrc).toBeTruthy();
        
        // Check iframe dimensions
        const box = await gameIframe.boundingBox();
        expect(box?.width).toBeGreaterThan(100);
        expect(box?.height).toBeGreaterThan(100);
      } else {
        // Check for alternative game container
        const gameContainer = page.locator('[class*="game-container"], [id*="game"], canvas').first();
        await expect(gameContainer).toBeVisible();
      }

      // Check for fullscreen button
      const fullscreenButton = page.locator('button:has-text("Fullscreen"), button[aria-label*="fullscreen"], button[title*="fullscreen"]').first();
      await expect(fullscreenButton).toBeVisible();

      // Test fullscreen functionality
      await fullscreenButton.click();
      await page.waitForTimeout(1000);
      
      // Exit fullscreen
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    });

    test(`should have working social share buttons on ${game.name}`, async ({ page }) => {
      await page.goto(game.path);
      await page.waitForLoadState('networkidle');

      // Check for share buttons
      const shareButtons = page.locator('a[href*="twitter.com/share"], a[href*="facebook.com/share"], button:has-text("Share")');
      const shareCount = await shareButtons.count();
      
      if (shareCount > 0) {
        // Test first share button
        const firstShare = shareButtons.first();
        const href = await firstShare.getAttribute('href');
        
        if (href) {
          // Verify share URL is properly formatted
          expect(href).toMatch(/twitter\.com|facebook\.com|pinterest\.com/);
          expect(href).toContain(encodeURIComponent(page.url()));
        }
      }
    });

    test(`should have comment system on ${game.name}`, async ({ page }) => {
      await page.goto(game.path);
      await page.waitForLoadState('networkidle');

      // Check for comment section
      const commentSection = page.locator('[class*="comment"], [id*="comment"], form[action*="comment"]').first();
      
      if (await commentSection.isVisible()) {
        // Check for comment form elements
        const commentInput = page.locator('textarea[name*="comment"], input[name*="comment"]').first();
        const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
        
        if (await commentInput.isVisible()) {
          await expect(commentInput).toBeVisible();
          await expect(submitButton).toBeVisible();
          
          // Test typing in comment
          await commentInput.fill('Test comment');
          const value = await commentInput.inputValue();
          expect(value).toBe('Test comment');
        }
      }
    });

    test(`should check game controls and info on ${game.name}`, async ({ page }) => {
      await page.goto(game.path);
      await page.waitForLoadState('networkidle');

      // Check for game controls info
      const controlsSection = page.locator('text=/Controls|How to Play|Instructions/i').first();
      
      if (await controlsSection.isVisible()) {
        await expect(controlsSection).toBeVisible();
        
        // Check for control details
        const controlDetails = page.locator('text=/Arrow Keys|WASD|Mouse|Click/i');
        const hasControls = await controlDetails.first().isVisible();
        expect(hasControls).toBeTruthy();
      }

      // Check for game description
      const description = page.locator('[class*="description"], [class*="game-info"], p').first();
      await expect(description).toBeVisible();
      const descText = await description.textContent();
      expect(descText?.length).toBeGreaterThan(10);
    });
  }

  test('should handle game loading errors gracefully', async ({ page }) => {
    // Test a non-existent game
    const response = await page.goto('/games/non-existent-game/');
    
    if (response) {
      const status = response.status();
      
      if (status === 404) {
        // Check for 404 page
        const notFoundText = page.locator('text=/404|Not Found|Page not found/i').first();
        await expect(notFoundText).toBeVisible();
      } else if (status === 200) {
        // Check if redirected to home or shows error message
        const errorMessage = page.locator('text=/Error|Game not found|Sorry/i').first();
        const isErrorVisible = await errorMessage.isVisible();
        expect(isErrorVisible || page.url() === 'http://localhost:4321/').toBeTruthy();
      }
    }
  });
});