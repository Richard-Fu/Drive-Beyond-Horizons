import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function analyzeSite() {
  console.log('开始分析游戏站框架...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // 设置视口大小
    await page.setViewport({ width: 1920, height: 1080 });
    
    // 分析首页
    console.log('\n1. 分析首页...');
    await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });
    
    // 获取页面性能数据
    const performanceData = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigation?.loadEventEnd || 0,
        domReady: navigation?.domContentLoadedEventEnd || 0,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
      };
    });
    
    console.log('页面加载性能:', performanceData);
    
    // 获取SEO相关信息
    const seoData = await page.evaluate(() => {
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content,
        ogDescription: document.querySelector('meta[property="og:description"]')?.content,
        ogImage: document.querySelector('meta[property="og:image"]')?.content,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        h1Count: document.querySelectorAll('h1').length,
        h2Count: document.querySelectorAll('h2').length,
        imageCount: document.querySelectorAll('img').length,
        linksCount: document.querySelectorAll('a').length,
        structuredData: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => s.textContent)
      };
    });
    
    console.log('\nSEO数据:', JSON.stringify(seoData, null, 2));
    
    // 截图首页
    await page.screenshot({ 
      path: 'screenshots/homepage-desktop.png',
      fullPage: true 
    });
    
    // 移动端视图
    await page.setViewport({ width: 375, height: 667 });
    await page.screenshot({ 
      path: 'screenshots/homepage-mobile.png',
      fullPage: true 
    });
    
    // 分析游戏页面
    console.log('\n2. 分析游戏页面...');
    await page.goto('http://localhost:4321/games/slope/', { waitUntil: 'networkidle0' });
    
    // 检查游戏页面结构
    const gamePageData = await page.evaluate(() => {
      return {
        hasPlayButton: !!document.querySelector('#playButton'),
        hasRatingSystem: !!document.querySelector('[id*="rating"]'),
        hasComments: !!document.querySelector('[id*="comment"]'),
        hasRelatedGames: !!document.querySelector('.games-grid'),
        gameIframeUrl: document.querySelector('#gameFrame')?.src || 'not loaded'
      };
    });
    
    console.log('游戏页面结构:', gamePageData);
    
    // 测试游戏加载
    await page.click('#playButton');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    await page.screenshot({ 
      path: 'screenshots/game-loading.png',
      fullPage: false 
    });
    
    // 分析分类页面
    console.log('\n3. 分析分类页面...');
    await page.goto('http://localhost:4321/action/', { waitUntil: 'networkidle0' });
    
    const categoryData = await page.evaluate(() => {
      const gameCards = document.querySelectorAll('.games-grid > a');
      return {
        gameCount: gameCards.length,
        hasFilters: !!document.querySelector('select'),
        hasPagination: !!document.querySelector('[class*="pagination"]'),
        categoryTitle: document.querySelector('h1')?.textContent
      };
    });
    
    console.log('分类页面数据:', categoryData);
    
    // 创建分析报告
    const report = {
      timestamp: new Date().toISOString(),
      performance: performanceData,
      seo: seoData,
      gamePage: gamePageData,
      categoryPage: categoryData,
      recommendations: [
        '缺少sitemap.xml文件',
        '缺少robots.txt文件',
        '缺少结构化数据(Schema.org)',
        '图片未使用CDN优化',
        '缺少PWA支持',
        '缺少多语言支持',
        '缺少面包屑导航的结构化数据',
        '缺少游戏评分的结构化数据'
      ]
    };
    
    await fs.writeFile('site-analysis-report.json', JSON.stringify(report, null, 2));
    console.log('\n分析报告已保存到 site-analysis-report.json');
    
  } catch (error) {
    console.error('分析过程中出错:', error);
  } finally {
    await browser.close();
  }
}

// 创建截图目录
await fs.mkdir('screenshots', { recursive: true });

// 运行分析
analyzeSite();