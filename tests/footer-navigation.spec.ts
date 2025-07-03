import { test, expect } from '@playwright/test';

test.describe('Footer Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have visible footer', async ({ page }) => {
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();

    // Scroll to footer
    await footer.scrollIntoViewIfNeeded();
  });

  test('should test all footer navigation links', async ({ page }) => {
    const footer = page.locator('footer').first();
    await footer.scrollIntoViewIfNeeded();

    // Get all footer links
    const footerLinks = footer.locator('a');
    const linkCount = await footerLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);

    const testedLinks: { text: string; href: string; status: number }[] = [];

    for (let i = 0; i < linkCount; i++) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      const text = await link.textContent();

      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        // For internal links, test navigation
        if (href.startsWith('/')) {
          const response = await page.request.get(href).catch(() => null);
          
          testedLinks.push({
            text: text || 'No text',
            href,
            status: response?.status() || 0
          });
        }
        // For external links, just verify they have valid format
        else if (href.startsWith('http')) {
          testedLinks.push({
            text: text || 'No text',
            href,
            status: 200 // Assume external links are valid
          });
        }
      }
    }

    // Check for broken links
    const brokenLinks = testedLinks.filter(link => link.status >= 400 || link.status === 0);
    
    if (brokenLinks.length > 0) {
      console.log('Broken footer links:', brokenLinks);
    }
    
    expect(brokenLinks).toHaveLength(0);
  });

  test('should test social media links', async ({ page }) => {
    const footer = page.locator('footer').first();
    await footer.scrollIntoViewIfNeeded();

    // Common social media domains
    const socialDomains = [
      'facebook.com',
      'twitter.com',
      'x.com',
      'instagram.com',
      'youtube.com',
      'linkedin.com',
      'tiktok.com',
      'discord.com',
      'discord.gg'
    ];

    const socialLinks = [];

    for (const domain of socialDomains) {
      const links = footer.locator(`a[href*="${domain}"]`);
      const count = await links.count();
      
      for (let i = 0; i < count; i++) {
        const link = links.nth(i);
        const href = await link.getAttribute('href');
        
        if (href) {
          socialLinks.push({
            domain,
            href,
            visible: await link.isVisible()
          });

          // Check link has proper attributes
          const target = await link.getAttribute('target');
          const rel = await link.getAttribute('rel');
          
          // Social links should open in new tab
          expect(target).toBe('_blank');
          
          // Should have security attributes
          expect(rel).toContain('noopener');
        }
      }
    }

    console.log(`Found ${socialLinks.length} social media links`);
  });

  test('should check footer copyright and legal text', async ({ page }) => {
    const footer = page.locator('footer').first();
    await footer.scrollIntoViewIfNeeded();

    // Check for copyright text
    const footerText = await footer.textContent();
    const currentYear = new Date().getFullYear();
    
    // Should contain copyright symbol or text
    expect(footerText).toMatch(/©|copyright/i);
    
    // Should contain current or recent year
    const hasRecentYear = footerText?.includes(currentYear.toString()) || 
                         footerText?.includes((currentYear - 1).toString());
    expect(hasRecentYear).toBeTruthy();

    // Check for legal links
    const legalLinks = [
      { text: 'Privacy', href: '/privacy' },
      { text: 'Terms', href: '/terms' },
      { text: 'DMCA', href: '/dmca' },
      { text: 'Cookies', href: '/cookies' }
    ];

    for (const legal of legalLinks) {
      const link = footer.locator(`a:has-text("${legal.text}")`).first();
      
      if (await link.isVisible()) {
        const href = await link.getAttribute('href');
        expect(href).toContain(legal.href);
      }
    }
  });

  test('should check footer responsiveness', async ({ page }) => {
    const footer = page.locator('footer').first();

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // Check if footer adapts to mobile
    const footerBox = await footer.boundingBox();
    expect(footerBox?.width).toBeLessThanOrEqual(375);
  });

  test('should check for newsletter signup if present', async ({ page }) => {
    const footer = page.locator('footer').first();
    await footer.scrollIntoViewIfNeeded();

    // Look for newsletter form and email input
    const emailInput = footer.locator('input[type="email"]').first();
    
    if (await emailInput.isVisible()) {
      // Test email input
      await emailInput.fill('test@example.com');
      const value = await emailInput.inputValue();
      expect(value).toBe('test@example.com');

      // Check for submit button
      const submitButton = footer.locator('button[type="submit"], input[type="submit"]').first();
      await expect(submitButton).toBeVisible();
    }
  });
});