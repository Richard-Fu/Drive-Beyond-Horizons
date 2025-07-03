import { test, expect } from '@playwright/test';

test.describe('Static Pages Tests', () => {
  const staticPages = [
    { name: 'About', path: '/about', expectedContent: ['About', 'about us', 'mission', 'team'] },
    { name: 'Contact', path: '/contact', expectedContent: ['Contact', 'email', 'message', 'form'] },
    { name: 'Privacy Policy', path: '/privacy', expectedContent: ['Privacy', 'data', 'information', 'collect'] },
    { name: 'Terms of Service', path: '/terms', expectedContent: ['Terms', 'service', 'agreement', 'use'] },
    { name: 'DMCA', path: '/dmca', expectedContent: ['DMCA', 'copyright', 'infringement', 'notice'] },
    { name: 'Cookie Policy', path: '/cookies', expectedContent: ['Cookie', 'cookies', 'browser', 'store'] }
  ];

  for (const page of staticPages) {
    test(`should load ${page.name} page properly`, async ({ context }) => {
      const pageObj = await context.newPage();
      const consoleErrors: string[] = [];
      
      pageObj.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      const response = await pageObj.goto(page.path);
      await pageObj.waitForLoadState('networkidle');

      // Check response status
      expect(response?.status()).toBeLessThan(400);

      // Check for console errors
      expect(consoleErrors).toHaveLength(0);

      // Check page has proper title
      const pageTitle = await pageObj.title();
      expect(pageTitle).toBeTruthy();

      // Check for heading
      const heading = pageObj.locator('h1, h2').first();
      await expect(heading).toBeVisible();

      // Check for expected content
      const bodyText = await pageObj.locator('body').textContent();
      const hasExpectedContent = page.expectedContent.some(content => 
        bodyText?.toLowerCase().includes(content.toLowerCase())
      );
      expect(hasExpectedContent).toBeTruthy();

      // Check page has substantial content (not empty)
      const mainContent = pageObj.locator('main, article, .content, .container').first();
      const contentText = await mainContent.textContent();
      expect(contentText?.length).toBeGreaterThan(100);

      await pageObj.close();
    });

    test(`should have proper meta tags on ${page.name}`, async ({ context }) => {
      const pageObj = await context.newPage();
      await pageObj.goto(page.path);

      // Check for essential meta tags
      const metaDescription = await pageObj.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();

      // Check for Open Graph tags
      const ogTitle = await pageObj.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();

      // Check for viewport meta tag
      const viewport = await pageObj.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');

      await pageObj.close();
    });
  }

  test('should have working contact form if present', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for contact form
    const contactForm = page.locator('form').first();
    
    if (await contactForm.isVisible()) {
      // Check for form fields
      const nameField = page.locator('input[name*="name"], input[type="text"]').first();
      const emailField = page.locator('input[name*="email"], input[type="email"]').first();
      const messageField = page.locator('textarea[name*="message"]').first();
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();

      // Fill form if fields exist
      if (await nameField.isVisible()) {
        await nameField.fill('Test User');
        const nameValue = await nameField.inputValue();
        expect(nameValue).toBe('Test User');
      }

      if (await emailField.isVisible()) {
        await emailField.fill('test@example.com');
        const emailValue = await emailField.inputValue();
        expect(emailValue).toBe('test@example.com');
      }

      if (await messageField.isVisible()) {
        await messageField.fill('This is a test message');
        const messageValue = await messageField.inputValue();
        expect(messageValue).toBe('This is a test message');
      }

      await expect(submitButton).toBeVisible();
    }
  });

  test('should check internal links on static pages', async ({ page }) => {
    // Test on About page
    await page.goto('/about');
    await page.waitForLoadState('networkidle');

    // Get all internal links
    const internalLinks = page.locator('a[href^="/"], a[href^="./"], a[href^="../"]');
    const linkCount = await internalLinks.count();

    const brokenLinks: string[] = [];

    for (let i = 0; i < Math.min(linkCount, 10); i++) { // Test first 10 links
      const link = internalLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && !href.startsWith('#')) {
        const response = await page.request.get(href).catch(() => null);
        
        if (!response || response.status() >= 400) {
          brokenLinks.push(href);
        }
      }
    }

    expect(brokenLinks).toHaveLength(0);
  });
});