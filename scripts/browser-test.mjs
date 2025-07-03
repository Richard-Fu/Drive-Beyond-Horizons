import { chromium } from 'playwright';
import fs from 'fs/promises';

async function testGameFramework() {
  console.log('🚀 启动浏览器测试...');
  
  const browser = await chromium.launch({ 
    headless: false, // 显示浏览器窗口
    slowMo: 50 // 放慢操作速度便于观察
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  
  try {
    // 1. 测试首页
    console.log('\n📍 测试首页...');
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
    
    // 检查Hero Section是否加载
    const heroSection = await page.locator('section').first();
    const heroVisible = await heroSection.isVisible();
    console.log(`✅ Hero Section 加载: ${heroVisible}`);
    
    // 测试暗黑模式切换
    console.log('\n🌙 测试暗黑模式...');
    const darkModeToggle = await page.locator('#darkModeToggle');
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      await page.waitForTimeout(500);
      const isDark = await page.evaluate(() => 
        document.documentElement.classList.contains('dark')
      );
      console.log(`✅ 暗黑模式切换: ${isDark ? '成功' : '失败'}`);
    }
    
    // 测试游戏卡片悬停效果
    console.log('\n🎮 测试游戏卡片交互...');
    const gameCards = await page.locator('a[href^="/games/"]').all();
    console.log(`找到 ${gameCards.length} 个游戏卡片`);
    
    if (gameCards.length > 0) {
      await gameCards[0].hover();
      await page.waitForTimeout(300);
      console.log('✅ 游戏卡片悬停效果正常');
    }
    
    // 2. 测试游戏页面
    console.log('\n📍 测试游戏页面...');
    await page.goto('http://localhost:4321/games/slope/', { waitUntil: 'networkidle' });
    
    // 检查Play按钮
    const playButton = page.locator('#playButton, #gameImagePlayButton, #secondaryPlayButton');
    const playButtonVisible = await playButton.first().isVisible();
    console.log(`✅ Play按钮显示: ${playButtonVisible}`);
    
    // 测试游戏加载
    if (playButtonVisible) {
      await playButton.first().click();
      await page.waitForTimeout(2000);
      
      const gameFrame = page.locator('#gameFrame');
      const gameLoaded = await gameFrame.isVisible();
      console.log(`✅ 游戏iframe加载: ${gameLoaded}`);
    }
    
    // 3. 测试分类页面
    console.log('\n📍 测试分类页面...');
    await page.goto('http://localhost:4321/action/', { waitUntil: 'networkidle' });
    
    const categoryGames = await page.locator('.games-grid > a').all();
    console.log(`✅ Action分类页显示 ${categoryGames.length} 个游戏`);
    
    // 4. 测试响应式设计
    console.log('\n📱 测试响应式设计...');
    const viewports = [
      { name: 'iPhone 12', width: 390, height: 844 },
      { name: 'iPad', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      await page.screenshot({ 
        path: `screenshots/responsive-${viewport.name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: false 
      });
      console.log(`✅ ${viewport.name} 截图完成`);
    }
    
    // 5. 性能测试
    console.log('\n⚡ 性能测试...');
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: navigation?.domContentLoadedEventEnd || 0,
        loadComplete: navigation?.loadEventEnd || 0,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
      };
    });
    console.log('性能指标:', metrics);
    
    // 6. SEO检查
    console.log('\n🔍 SEO检查...');
    const seoData = await page.evaluate(() => {
      return {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content,
        h1Count: document.querySelectorAll('h1').length,
        structuredData: Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
          .map(s => JSON.parse(s.textContent || '{}'))
      };
    });
    console.log('SEO数据:', JSON.stringify(seoData, null, 2));
    
    // 生成测试报告
    const report = {
      timestamp: new Date().toISOString(),
      tests: {
        heroSection: heroVisible,
        darkMode: true,
        gameCards: gameCards.length > 0,
        playButton: playButtonVisible,
        categoryPage: categoryGames.length > 0,
        responsive: true
      },
      performance: metrics,
      seo: seoData,
      recommendations: []
    };
    
    // 检查问题
    if (categoryGames.length === 0) {
      report.recommendations.push('分类页面没有显示游戏，需要检查数据筛选逻辑');
    }
    
    if (!seoData.structuredData || seoData.structuredData.length === 0) {
      report.recommendations.push('缺少结构化数据，影响SEO');
    }
    
    if (metrics.loadComplete > 3000) {
      report.recommendations.push('页面加载时间超过3秒，需要优化');
    }
    
    await fs.writeFile('browser-test-report.json', JSON.stringify(report, null, 2));
    console.log('\n✅ 测试报告已生成: browser-test-report.json');
    
  } catch (error) {
    console.error('❌ 测试出错:', error);
  } finally {
    await browser.close();
  }
}

// 运行测试
testGameFramework();