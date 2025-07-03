import { test, expect } from '@playwright/test';
import './types';

test.describe('PWA and Analytics Tests', () => {
  test('should register service worker', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if service worker is registered
    const hasServiceWorker = await page.evaluate(() => {
      return 'serviceWorker' in navigator;
    });
    
    expect(hasServiceWorker).toBeTruthy();

    // Wait for service worker to register
    await page.waitForTimeout(2000);

    const serviceWorkerState = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        return {
          registered: !!registration,
          scope: registration?.scope,
          active: !!registration?.active
        };
      }
      return null;
    });

    if (serviceWorkerState) {
      expect(serviceWorkerState.registered).toBeTruthy();
      console.log('Service Worker scope:', serviceWorkerState.scope);
    }
  });

  test('should have PWA manifest', async ({ page }) => {
    await page.goto('/');
    
    // Check for manifest link
    const manifestLink = page.locator('link[rel="manifest"]').first();
    await expect(manifestLink).toHaveAttribute('href', /.+/);
    
    const manifestHref = await manifestLink.getAttribute('href');
    
    if (manifestHref) {
      // Fetch manifest
      const response = await page.request.get(manifestHref);
      expect(response.status()).toBe(200);
      
      const manifest = await response.json();
      
      // Check manifest properties
      expect(manifest.name).toBeTruthy();
      expect(manifest.short_name).toBeTruthy();
      expect(manifest.start_url).toBeTruthy();
      expect(manifest.display).toBeTruthy();
      expect(manifest.icons).toBeInstanceOf(Array);
      expect(manifest.icons.length).toBeGreaterThan(0);
    }
  });

  test('should test offline functionality', async ({ page, context }) => {
    // First visit to cache resources
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for service worker to be ready
    await page.waitForTimeout(3000);
    
    // Go offline
    await context.setOffline(true);
    
    // Try to navigate
    await page.reload();
    
    // Check if page still loads (from cache)
    const title = await page.title();
    expect(title).toBeTruthy();
    
    // Check for offline indicator if any
    const offlineIndicator = page.locator('text=/Offline|No connection/i').first();
    const isOfflineIndicatorVisible = await offlineIndicator.isVisible().catch(() => false);
    
    // Page should either work offline or show offline message
    const pageWorks = title.length > 0 && !title.includes('Error');
    expect(pageWorks || isOfflineIndicatorVisible).toBeTruthy();
    
    // Go back online
    await context.setOffline(false);
  });

  test('should have GA4 analytics script', async ({ page }) => {
    const gaScripts: string[] = [];
    
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('googletagmanager.com') || url.includes('google-analytics.com')) {
        gaScripts.push(url);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for GA4 script in page
    const hasGAScript = await page.evaluate(() => {
      return !!window.gtag || !!window.dataLayer;
    });
    
    expect(hasGAScript).toBeTruthy();
    
    // Check if GA scripts were loaded
    expect(gaScripts.length).toBeGreaterThan(0);
    console.log('Analytics scripts loaded:', gaScripts);
  });

  test('should track game play events', async ({ page }) => {
    
    // Intercept analytics calls
    await page.addInitScript(() => {
      window.analyticsEvents = [];
      
      // Override gtag if it exists
      if (window.gtag) {
        const originalGtag = window.gtag;
        window.gtag = function(...args: any[]) {
          window.analyticsEvents?.push(args);
          return originalGtag.apply(this, args);
        };
      }
      
      // Override dataLayer.push if it exists
      if (window.dataLayer) {
        const originalPush = window.dataLayer.push;
        window.dataLayer.push = function(...args: any[]) {
          window.analyticsEvents?.push(args);
          return originalPush.apply(this, args);
        };
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to a game
    const gameLink = page.locator('a[href*="/games/"]').first();
    await gameLink.click();
    await page.waitForLoadState('networkidle');
    
    // Get tracked events
    const events = await page.evaluate(() => {
      return window.analyticsEvents || [];
    });
    
    // Should have tracked page view or game play event
    console.log('Tracked events:', events.length);
    
    // Click play button if available
    const playButton = page.locator('button:has-text("Play"), button:has-text("Start")').first();
    if (await playButton.isVisible()) {
      await playButton.click();
      await page.waitForTimeout(1000);
      
      // Check for new events
      const newEvents = await page.evaluate(() => {
        return window.analyticsEvents || [];
      });
      
      expect(newEvents.length).toBeGreaterThan(events.length);
    }
  });

  test('should have proper meta tags for PWA', async ({ page }) => {
    await page.goto('/');
    
    // Check theme-color meta tag
    const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
    expect(themeColor).toBeTruthy();
    
    // Check apple-mobile-web-app-capable
    const appleCapable = await page.locator('meta[name="apple-mobile-web-app-capable"]').getAttribute('content');
    expect(appleCapable).toBe('yes');
    
    // Check viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
    
    // Check for apple touch icon
    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]').first();
    const iconHref = await appleTouchIcon.getAttribute('href');
    expect(iconHref).toBeTruthy();
  });

  test('should check GTM (Google Tag Manager) implementation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for GTM script
    const gtmScript = page.locator('script[src*="googletagmanager.com"]').first();
    const hasGTMScript = await gtmScript.isVisible();
    
    // Check for GTM noscript (if needed for future use)
    // const gtmNoscript = page.locator('noscript iframe[src*="googletagmanager.com"]').first();
    
    // Check dataLayer
    const hasDataLayer = await page.evaluate(() => {
      return Array.isArray(window.dataLayer);
    });
    
    expect(hasGTMScript || hasDataLayer).toBeTruthy();
    
    // Check dataLayer events
    if (hasDataLayer) {
      const dataLayerEvents = await page.evaluate(() => {
        return window.dataLayer;
      });
      
      console.log('DataLayer events:', dataLayerEvents?.length || 0);
    }
  });
});