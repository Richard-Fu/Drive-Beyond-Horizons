import { test } from '@playwright/test';

test('check homepage for errors', async ({ page }) => {
  // Capture console errors
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  // Capture failed requests
  const failedRequests: string[] = [];
  page.on('requestfailed', request => {
    failedRequests.push(`${request.failure()?.errorText} - ${request.url()}`);
  });
  
  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push(`${response.status()} - ${response.url()}`);
    }
  });

  // Navigate to homepage
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot
  await page.screenshot({ path: 'homepage-screenshot.png', fullPage: true });
  
  // Log any errors found
  if (errors.length > 0) {
    console.log('\nConsole errors found:');
    errors.forEach(error => console.log('- ' + error));
  }
  
  if (failedRequests.length > 0) {
    console.log('\nFailed requests:');
    failedRequests.forEach(req => console.log('- ' + req));
  }
  
  if (errors.length === 0 && failedRequests.length === 0) {
    console.log('No errors found on the page');
  }
  
  // Check if any critical elements are missing
  const title = await page.title();
  console.log('\nPage title:', title);
});