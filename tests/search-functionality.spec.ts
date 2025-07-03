import { test, expect } from '@playwright/test';

test.describe('Search Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should find and test search input', async ({ page }) => {
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]').first();
    
    await expect(searchInput).toBeVisible();
    
    // Click to focus
    await searchInput.click();
    
    // Test typing
    await searchInput.fill('mario');
    const value = await searchInput.inputValue();
    expect(value).toBe('mario');
  });

  test('should test search with various queries', async ({ page }) => {
    const searchQueries = [
      { query: 'kitten', expectedResults: true },
      { query: 'mario', expectedResults: true },
      { query: 'sports', expectedResults: true },
      { query: 'puzzle', expectedResults: true },
      { query: 'xyzabc123', expectedResults: false } // Unlikely to have results
    ];

    for (const { query, expectedResults } of searchQueries) {
      // Navigate to home page for each search
      await page.goto('/');
      
      const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]').first();
      await searchInput.click();
      await searchInput.fill(query);
      await searchInput.press('Enter');
      
      await page.waitForLoadState('networkidle');
      
      // Check if we're on search results page
      const url = page.url();
      expect(url).toContain('search');
      
      // Check for search results
      const results = page.locator('[class*="search-result"], [class*="game-card"], article').all();
      const resultCount = (await results).length;
      
      if (expectedResults) {
        expect(resultCount).toBeGreaterThan(0);
      }
      
      // Check search query is displayed
      const searchHeading = page.locator('h1, h2').first();
      const headingText = await searchHeading.textContent();
      expect(headingText?.toLowerCase()).toContain(query.toLowerCase());
    }
  });

  test('should test search autocomplete if available', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]').first();
    
    await searchInput.click();
    await searchInput.fill('kit');
    
    // Wait for potential autocomplete
    await page.waitForTimeout(500);
    
    // Check for autocomplete dropdown
    const autocomplete = page.locator('[role="listbox"], .autocomplete, .suggestions').first();
    
    if (await autocomplete.isVisible()) {
      const suggestions = autocomplete.locator('[role="option"], li');
      const suggestionCount = await suggestions.count();
      expect(suggestionCount).toBeGreaterThan(0);
      
      // Click first suggestion
      await suggestions.first().click();
      await page.waitForLoadState('networkidle');
      
      // Should navigate to game or search results
      const url = page.url();
      expect(url).toMatch(/games|search/);
    }
  });

  test('should test clicking on search results', async ({ page }) => {
    // Search for a known game
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]').first();
    await searchInput.click();
    await searchInput.fill('kitten');
    await searchInput.press('Enter');
    
    await page.waitForLoadState('networkidle');
    
    // Click on first result
    const firstResult = page.locator('[class*="search-result"], [class*="game-card"]').first();
    const resultLink = firstResult.locator('a').first();
    
    if (await resultLink.isVisible()) {
      const href = await resultLink.getAttribute('href');
      expect(href).toBeTruthy();
      
      await resultLink.click();
      await page.waitForLoadState('networkidle');
      
      // Should be on game page
      const url = page.url();
      expect(url).toContain('/games/');
      
      // Game should load
      const gameContainer = page.locator('iframe, [class*="game-container"]').first();
      await expect(gameContainer).toBeVisible();
    }
  });

  test('should handle empty search gracefully', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]').first();
    
    await searchInput.click();
    await searchInput.press('Enter');
    
    await page.waitForLoadState('networkidle');
    
    // Should either stay on same page or show message
    const url = page.url();
    const errorMessage = page.locator('text=/Please enter|Empty search|No query/i').first();
    
    const hasError = await errorMessage.isVisible();
    const stayedOnHomepage = url === 'http://localhost:4321/';
    
    expect(hasError || stayedOnHomepage).toBeTruthy();
  });

  test('should test search filters if available', async ({ page }) => {
    // Perform a search first
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]').first();
    await searchInput.click();
    await searchInput.fill('game');
    await searchInput.press('Enter');
    
    await page.waitForLoadState('networkidle');
    
    // Look for filter options
    const filters = page.locator('select[name*="filter"], select[name*="sort"], button[class*="filter"]');
    
    if (await filters.first().isVisible()) {
      const filterCount = await filters.count();
      expect(filterCount).toBeGreaterThan(0);
      
      // Test first filter
      const firstFilter = filters.first();
      
      if ((await firstFilter.tagName()) === 'SELECT') {
        // Get options
        const options = firstFilter.locator('option');
        const optionCount = await options.count();
        expect(optionCount).toBeGreaterThan(1);
        
        // Select second option
        await firstFilter.selectOption({ index: 1 });
        await page.waitForLoadState('networkidle');
        
        // Check results updated
        const results = page.locator('[class*="search-result"], [class*="game-card"]');
        await expect(results.first()).toBeVisible();
      }
    }
  });

  test('should check search performance', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], input[name="search"]').first();
    
    await searchInput.click();
    await searchInput.fill('action');
    
    const startTime = Date.now();
    await searchInput.press('Enter');
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();
    
    const searchTime = endTime - startTime;
    
    // Search should complete within 3 seconds
    expect(searchTime).toBeLessThan(3000);
    
    // Results should appear
    const results = page.locator('[class*="search-result"], [class*="game-card"]');
    await expect(results.first()).toBeVisible();
  });
});