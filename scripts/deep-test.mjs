import { chromium } from 'playwright';
import fs from 'fs/promises';

async function deepTestFramework() {
  console.log('🔍 开始深度检查游戏框架...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const issues = [];
  const baseUrl = 'http://localhost:4321';
  
  try {
    // 1. 检查首页
    console.log('📍 检查首页...');
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    
    // 检查所有404错误
    page.on('response', response => {
      if (response.status() === 404) {
        issues.push({
          type: '404错误',
          url: response.url(),
          page: page.url()
        });
      }
    });
    
    // 检查grid.svg
    const gridSvg = await page.locator('[style*="grid.svg"]').count();
    if (gridSvg > 0) {
      console.log('❌ 发现grid.svg引用但文件不存在');
      issues.push({
        type: '缺失文件',
        file: '/grid.svg',
        description: 'ModernHeroSection组件引用了不存在的grid.svg'
      });
    }
    
    // 检查导航链接
    console.log('\n📍 检查导航链接...');
    const navLinks = [
      { selector: 'a[href="/new-games"]', text: 'New Games' },
      { selector: 'a[href="/popular"]', text: 'Popular' }
    ];
    
    for (const link of navLinks) {
      const linkExists = await page.locator(link.selector).count();
      if (linkExists > 0) {
        await page.locator(link.selector).first().click();
        await page.waitForTimeout(1000);
        
        const is404 = await page.locator('text=404').count() > 0;
        if (is404 || page.url().includes('404')) {
          console.log(`❌ ${link.text}页面不存在`);
          issues.push({
            type: '缺失页面',
            page: link.text,
            href: link.selector
          });
        }
        await page.goBack();
      }
    }
    
    // 检查游戏卡片
    console.log('\n📍 检查游戏卡片...');
    const gameCards = await page.locator('a[href^="/games/"]').all();
    console.log(`找到 ${gameCards.length} 个游戏卡片`);
    
    // 随机检查3个游戏页面
    const randomGames = gameCards
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    for (const gameCard of randomGames) {
      const href = await gameCard.getAttribute('href');
      console.log(`\n检查游戏: ${href}`);
      
      await gameCard.click();
      await page.waitForLoadState('networkidle');
      
      // 检查游戏页面元素
      const checks = {
        playButton: await page.locator('#playButton').isVisible(),
        gameImage: await page.locator('img').first().isVisible(),
        ratingSystem: await page.locator('[class*="rating"]').count() > 0,
        relatedGames: await page.locator('.games-grid').count() > 0
      };
      
      Object.entries(checks).forEach(([key, value]) => {
        if (!value) {
          issues.push({
            type: '缺失元素',
            page: href,
            element: key
          });
        }
      });
      
      // 测试游戏加载
      if (checks.playButton) {
        await page.locator('#playButton').click();
        await page.waitForTimeout(3000);
        
        const gameFrame = await page.locator('#gameFrame');
        const frameSrc = await gameFrame.getAttribute('src');
        
        if (!frameSrc || frameSrc === '') {
          console.log('❌ 游戏iframe未加载');
          issues.push({
            type: '功能错误',
            page: href,
            description: '游戏iframe未正确加载'
          });
        }
      }
      
      await page.goto(baseUrl);
    }
    
    // 检查分类页面
    console.log('\n📍 检查分类页面...');
    const categories = ['action', 'puzzle', 'sports', 'racing'];
    
    for (const category of categories) {
      await page.goto(`${baseUrl}/${category}/`);
      await page.waitForLoadState('networkidle');
      
      const categoryGames = await page.locator('.games-grid > a').count();
      console.log(`${category}分类: ${categoryGames} 个游戏`);
      
      if (categoryGames === 0) {
        issues.push({
          type: '数据问题',
          page: `/${category}/`,
          description: '分类页面没有显示任何游戏'
        });
      }
    }
    
    // 检查移动端
    console.log('\n📱 检查移动端...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(baseUrl);
    
    // 检查移动菜单
    const mobileMenuToggle = await page.locator('#mobileMenuToggle');
    if (await mobileMenuToggle.isVisible()) {
      await mobileMenuToggle.click();
      await page.waitForTimeout(500);
      
      const mobileMenu = await page.locator('#mobileMenu');
      const menuVisible = await mobileMenu.isVisible();
      
      if (!menuVisible) {
        issues.push({
          type: '移动端问题',
          description: '移动菜单无法打开'
        });
      }
    }
    
    // 检查SEO
    console.log('\n🔍 检查SEO...');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(baseUrl);
    
    const seoChecks = await page.evaluate(() => {
      const results = {
        hasCanonical: !!document.querySelector('link[rel="canonical"]'),
        hasRobots: !!document.querySelector('meta[name="robots"]'),
        imageAlt: Array.from(document.querySelectorAll('img')).filter(img => !img.alt).length,
        emptyLinks: Array.from(document.querySelectorAll('a')).filter(a => !a.textContent.trim()).length
      };
      return results;
    });
    
    if (!seoChecks.hasCanonical) {
      issues.push({ type: 'SEO问题', description: '缺少canonical标签' });
    }
    
    if (seoChecks.imageAlt > 0) {
      issues.push({ 
        type: 'SEO问题', 
        description: `${seoChecks.imageAlt}个图片缺少alt属性` 
      });
    }
    
    // 生成报告
    const report = {
      timestamp: new Date().toISOString(),
      totalIssues: issues.length,
      issues: issues,
      summary: {
        critical: issues.filter(i => i.type === '404错误' || i.type === '功能错误').length,
        warnings: issues.filter(i => i.type === 'SEO问题' || i.type === '数据问题').length,
        info: issues.filter(i => i.type === '缺失元素').length
      }
    };
    
    console.log('\n📊 检查完成！');
    console.log(`发现 ${report.totalIssues} 个问题`);
    console.log(`  ❌ 严重: ${report.summary.critical}`);
    console.log(`  ⚠️  警告: ${report.summary.warnings}`);
    console.log(`  ℹ️  信息: ${report.summary.info}`);
    
    await fs.writeFile('deep-test-report.json', JSON.stringify(report, null, 2));
    console.log('\n报告已保存到 deep-test-report.json');
    
  } catch (error) {
    console.error('测试出错:', error);
  } finally {
    await browser.close();
  }
}

deepTestFramework();