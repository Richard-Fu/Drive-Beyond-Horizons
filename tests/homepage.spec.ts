import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should load homepage without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    expect(consoleErrors).toHaveLength(0);
  });

  test('should display hero section with GeoGuessr game button', async ({ page }) => {
    // Check hero section exists
    const heroSection = page.locator('.hero-section, [class*="hero"]').first();
    await expect(heroSection).toBeVisible();
    
    // Check for GeoGuessr button
    const geoGuessrButton = page.locator('text=/GeoGuessr|Play GeoGuessr|Start Playing/i').first();
    await expect(geoGuessrButton).toBeVisible();
    
    // Test clicking the button - should open iframe in same page
    await geoGuessrButton.click();
    await page.waitForTimeout(2000); // Wait for loading animation
    
    // Should show game area with iframe (not navigate to different URL)
    const gameArea = page.locator('#gameArea, [id*="game"]').first();
    await expect(gameArea).toBeVisible({ timeout: 10000 });
    
    // URL should still be the homepage
    const url = page.url();
    expect(url).toMatch(/\/$|\/$/); // Should end with / (homepage)
  });

  test('should have working navigation menu', async ({ page }) => {
    // Test main navigation links
    const navLinks = [
      { text: 'Home', href: '/' },
      { text: 'Action', href: '/action' },
      { text: 'Sports', href: '/sports' },
      { text: 'Puzzle', href: '/puzzle' },
      { text: 'Popular', href: '/popular' }
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a:has-text("${link.text}")`).first();
      if (await navLink.isVisible()) {
        await navLink.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain(link.href);
        await page.goto('/'); // Go back to homepage
      }
    }
  });

  test('should have working language switcher', async ({ page }) => {
    // Look for language switcher
    const langSwitcher = page.locator('[aria-label*="language"], [class*="lang"], select[name*="lang"], button:has-text("EN"), button:has-text("语言")').first();
    
    if (await langSwitcher.isVisible()) {
      await langSwitcher.click();
      // Check if language options appear
      const langOptions = page.locator('[role="menu"] [role="menuitem"], option');
      const count = await langOptions.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should have working theme toggle', async ({ page }) => {
    // Look for theme toggle button
    const themeToggle = page.locator('[aria-label*="theme"], [class*="theme-toggle"], button:has(svg[class*="sun"]), button:has(svg[class*="moon"])').first();
    
    if (await themeToggle.isVisible()) {
      // Get initial theme
      const initialTheme = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') || 
               document.documentElement.getAttribute('data-theme') === 'dark';
      });
      
      // Click theme toggle
      await themeToggle.click();
      await page.waitForTimeout(500); // Wait for transition
      
      // Check theme changed
      const newTheme = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') || 
               document.documentElement.getAttribute('data-theme') === 'dark';
      });
      
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('should have working search functionality', async ({ page }) => {
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]').first();
    
    if (await searchInput.isVisible()) {
      await searchInput.click();
      await searchInput.fill('kitten');
      await searchInput.press('Enter');
      
      await page.waitForLoadState('networkidle');
      
      // Check if search results appear or URL changes
      const searchResults = page.locator('[class*="search-result"], [class*="game-card"]');
      const resultsCount = await searchResults.count();
      expect(resultsCount).toBeGreaterThan(0);
    }
  });

  test('should display game cards with working Play Now buttons', async ({ page }) => {
    // Check for game cards
    const gameCards = page.locator('[class*="game-card"], article[class*="game"], .game-item');
    const cardCount = await gameCards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Test first 3 game cards
    for (let i = 0; i < Math.min(3, cardCount); i++) {
      const card = gameCards.nth(i);
      await expect(card).toBeVisible();
      
      // Check for Play Now button
      const playButton = card.locator('a:has-text("Play Now"), a:has-text("Play"), button:has-text("Play")').first();
      
      if (await playButton.isVisible()) {
        const href = await playButton.getAttribute('href');
        expect(href).toBeTruthy();
        
        // Test clicking (just verify it has proper href)
        if (href && !href.startsWith('javascript:')) {
          await playButton.click();
          await page.waitForLoadState('networkidle');
          expect(page.url()).toContain('games');
          await page.goBack();
        }
      }
    }
  });

  test('should check for 404 errors on homepage', async ({ page }) => {
    // Check all images load properly
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        const response = await page.request.get(src).catch(() => null);
        if (response) {
          expect(response.status()).toBeLessThan(400);
        }
      }
    }
  });
});