import { test } from '@playwright/test';

test('check all images on homepage', async ({ page }) => {
  // Track all image requests
  const imageRequests: { url: string; status: number }[] = [];
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('.jpg') || url.includes('.png') || url.includes('.webp') || url.includes('.svg')) {
      imageRequests.push({
        url: url,
        status: response.status()
      });
    }
  });

  // Navigate to homepage
  await page.goto('/');
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  
  // Get all img elements
  const images = await page.$$eval('img', imgs => 
    imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete
    }))
  );
  
  console.log('\n=== All Images on Page ===');
  images.forEach((img, index) => {
    console.log(`\nImage ${index + 1}:`);
    console.log(`  src: ${img.src}`);
    console.log(`  alt: ${img.alt}`);
    console.log(`  loaded: ${img.complete && img.naturalWidth > 0 ? 'Yes' : 'No'}`);
    console.log(`  dimensions: ${img.naturalWidth}x${img.naturalHeight}`);
  });
  
  console.log('\n=== All Image Requests ===');
  imageRequests.forEach(req => {
    console.log(`${req.status === 200 ? '✓' : '✗'} [${req.status}] ${req.url}`);
  });
  
  const failedImages = imageRequests.filter(req => req.status !== 200);
  if (failedImages.length > 0) {
    console.log('\n=== Failed Image Requests ===');
    failedImages.forEach(req => {
      console.log(`✗ [${req.status}] ${req.url}`);
    });
  }
});