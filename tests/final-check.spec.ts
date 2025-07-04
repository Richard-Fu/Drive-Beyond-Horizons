import { test, expect } from '@playwright/test';

test('verify Drive Beyond Horizons resources load correctly', async ({ page }) => {
  const errors: string[] = [];
  const failedRequests: string[] = [];
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  // Capture failed requests
  page.on('requestfailed', request => {
    failedRequests.push(request.url());
  });
  
  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push(`[${response.status()}] ${response.url()}`);
    }
  });

  // Navigate to homepage
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Check specific Drive Beyond Horizons images
  const driveImages = await page.$$eval('img[alt*="Drive Beyond"]', imgs => 
    imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      loaded: img.complete && img.naturalWidth > 0
    }))
  );
  
  console.log('\n=== Drive Beyond Horizons Images ===');
  driveImages.forEach((img, index) => {
    console.log(`${index + 1}. ${img.alt}`);
    console.log(`   URL: ${img.src}`);
    console.log(`   Loaded: ${img.loaded ? '✓ Yes' : '✗ No'}`);
  });
  
  // Check if the game iframe will load correctly
  const gamePlayer = await page.$('.game-container iframe');
  if (gamePlayer) {
    const src = await gamePlayer.getAttribute('src');
    console.log('\n=== Game iFrame ===');
    console.log(`URL: ${src}`);
  }
  
  // Report any errors
  if (errors.length > 0) {
    console.log('\n=== Console Errors ===');
    errors.forEach(err => console.log(`✗ ${err}`));
  }
  
  if (failedRequests.length > 0) {
    console.log('\n=== Failed Requests ===');
    failedRequests.forEach(req => console.log(`✗ ${req}`));
  }
  
  // Verify all Drive Beyond images loaded successfully
  const allLoaded = driveImages.every(img => img.loaded);
  expect(allLoaded).toBe(true);
  
  // Verify no errors occurred
  expect(errors.length).toBe(0);
  expect(failedRequests.length).toBe(0);
});