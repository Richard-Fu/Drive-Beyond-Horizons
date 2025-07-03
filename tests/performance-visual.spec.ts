import { test, expect } from '@playwright/test';

test.describe('Performance and Visual Tests', () => {
  test('should check page load performance', async ({ page }) => {
    const performanceMetrics: any = {};
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart,
        dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,
        connectTime: navigation.connectEnd - navigation.connectStart,
        responseTime: navigation.responseEnd - navigation.responseStart
      };
    });
    
    console.log('Performance metrics:', metrics);
    
    // Page should load within reasonable time
    expect(metrics.totalTime).toBeLessThan(5000); // 5 seconds
    expect(metrics.domContentLoaded).toBeLessThan(2000); // 2 seconds
  });

  test('should check for visual/layout issues on different viewports', async ({ page }) => {
    const viewports = [
      { name: 'Desktop', width: 1920, height: 1080 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 667 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBeFalsy();
      
      // Check for overlapping elements
      const overlappingElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const overlapping: string[] = [];
        
        for (let i = 0; i < Math.min(elements.length, 100); i++) {
          const rect1 = elements[i].getBoundingClientRect();
          for (let j = i + 1; j < Math.min(elements.length, 100); j++) {
            const rect2 = elements[j].getBoundingClientRect();
            
            if (rect1.width > 0 && rect1.height > 0 && rect2.width > 0 && rect2.height > 0) {
              const overlap = !(rect1.right < rect2.left || 
                              rect2.right < rect1.left || 
                              rect1.bottom < rect2.top || 
                              rect2.bottom < rect1.top);
              
              if (overlap && !elements[i].contains(elements[j]) && !elements[j].contains(elements[i])) {
                overlapping.push(`${elements[i].tagName}.${elements[i].className} overlaps ${elements[j].tagName}.${elements[j].className}`);
              }
            }
          }
        }
        
        return overlapping.slice(0, 5); // Return max 5 overlapping pairs
      });
      
      if (overlappingElements.length > 0) {
        console.log(`Overlapping elements on ${viewport.name}:`, overlappingElements);
      }
      
      // Take screenshot for visual reference
      await page.screenshot({ 
        path: `screenshots/${viewport.name.toLowerCase()}-homepage.png`,
        fullPage: true 
      });
    }
  });

  test('should check image optimization', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const imageStats = await page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const stats = {
        total: images.length,
        withAlt: 0,
        withLazyLoad: 0,
        largeSizeCount: 0,
        missingImages: 0
      };
      
      images.forEach(img => {
        if (img.alt) stats.withAlt++;
        if (img.loading === 'lazy' || img.dataset.src) stats.withLazyLoad++;
        if (img.naturalWidth > 1920 || img.naturalHeight > 1080) stats.largeSizeCount++;
        if (!img.complete || img.naturalWidth === 0) stats.missingImages++;
      });
      
      return stats;
    });
    
    console.log('Image statistics:', imageStats);
    
    // All images should have alt text for accessibility
    expect(imageStats.withAlt).toBe(imageStats.total);
    
    // No missing images
    expect(imageStats.missingImages).toBe(0);
    
    // Most images should use lazy loading
    expect(imageStats.withLazyLoad).toBeGreaterThan(imageStats.total * 0.5);
  });

  test('should check for console errors on multiple pages', async ({ page }) => {
    const pagesToTest = ['/', '/action', '/sports', '/games/kitten-defense/'];
    const allErrors: { page: string; errors: string[] }[] = [];
    
    for (const pagePath of pagesToTest) {
      const errors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      
      if (errors.length > 0) {
        allErrors.push({ page: pagePath, errors });
      }
      
      // Remove listener for next iteration
      page.removeAllListeners('console');
    }
    
    if (allErrors.length > 0) {
      console.log('Console errors found:', allErrors);
    }
    
    expect(allErrors).toHaveLength(0);
  });

  test('should check resource loading times', async ({ page }) => {
    const slowResources: any[] = [];
    
    page.on('requestfinished', async (request) => {
      const timing = await request.timing();
      const resourceType = request.resourceType();
      const url = request.url();
      
      // Check for slow resources (> 1 second)
      if (timing.responseEnd > 1000) {
        slowResources.push({
          url: url.substring(0, 100),
          type: resourceType,
          time: timing.responseEnd
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    if (slowResources.length > 0) {
      console.log('Slow resources:', slowResources);
    }
    
    // Should not have too many slow resources
    expect(slowResources.length).toBeLessThan(5);
  });

  test('should check memory usage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate through several pages
    const pages = ['/', '/action', '/sports', '/games/kitten-defense/', '/'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
    }
    
    // Check memory usage if available
    const memoryUsage = await page.evaluate(() => {
      if ('memory' in performance) {
        return {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize / 1048576,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize / 1048576,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit / 1048576
        };
      }
      return null;
    });
    
    if (memoryUsage) {
      console.log('Memory usage (MB):', memoryUsage);
      
      // Check for reasonable memory usage
      expect(memoryUsage.usedJSHeapSize).toBeLessThan(100); // Less than 100MB
    }
  });

  test('should check accessibility basics', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for basic accessibility features
    const accessibilityChecks = await page.evaluate(() => {
      const checks = {
        hasLangAttribute: !!document.documentElement.lang,
        hasSkipLink: !!document.querySelector('a[href="#main"], a[href="#content"]'),
        hasMainLandmark: !!document.querySelector('main, [role="main"]'),
        buttonsWithText: true,
        linksWithText: true,
        headingStructure: true
      };
      
      // Check buttons have text
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
          checks.buttonsWithText = false;
        }
      });
      
      // Check links have text
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        if (!link.textContent?.trim() && !link.getAttribute('aria-label')) {
          checks.linksWithText = false;
        }
      });
      
      // Check heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let lastLevel = 0;
      headings.forEach(heading => {
        const level = parseInt(heading.tagName[1]);
        if (level - lastLevel > 1) {
          checks.headingStructure = false;
        }
        lastLevel = level;
      });
      
      return checks;
    });
    
    console.log('Accessibility checks:', accessibilityChecks);
    
    expect(accessibilityChecks.hasLangAttribute).toBeTruthy();
    expect(accessibilityChecks.hasMainLandmark).toBeTruthy();
    expect(accessibilityChecks.buttonsWithText).toBeTruthy();
    expect(accessibilityChecks.linksWithText).toBeTruthy();
  });
});