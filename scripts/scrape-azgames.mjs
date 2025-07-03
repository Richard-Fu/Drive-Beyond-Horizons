import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取现有游戏列表
async function getExistingGames() {
    const gamesDir = path.join(__dirname, 'src/content/games');
    const files = await fs.readdir(gamesDir);
    return files
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
}

// 从azgames.io爬取游戏信息
async function scrapeGameInfo(browser, gameSlug) {
    const page = await browser.newPage();
    
    try {
        console.log(`🔍 正在爬取游戏: ${gameSlug}`);
        
        // 访问游戏页面
        const url = `https://azgames.io/${gameSlug}`;
        await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 30000 
        });
        
        // 等待页面加载
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 提取游戏信息
        const gameInfo = await page.evaluate(() => {
            // 获取游戏标题
            const titleElement = document.querySelector('h1, .game-title, .title, #content h1');
            const title = titleElement ? titleElement.textContent.trim() : '';
            
            // 获取游戏描述
            const descElement = document.querySelector('.game-description, .description, .game-info p, #content p');
            const description = descElement ? descElement.textContent.trim() : '';
            
            // 获取游戏图片 - 寻找多种可能的图片选择器
            const imgSelectors = [
                'img[src*="upload/cache/upload/imgs"][src*="-m144x144"]',
                'img[src*="upload/cache/upload/imgs"][src*="-m180x180"]',
                'img[src*="upload/cache/upload/imgs"]:not([src*="logo"]):not([src*="azgame"])',
                '.game-image img',
                '.game-thumb img', 
                '.thumbnail img',
                '#game-thumbnail img',
                'img[alt*="game"]'
            ];
            
            let imageUrl = '';
            for (const selector of imgSelectors) {
                const imgElement = document.querySelector(selector);
                if (imgElement && imgElement.src && !imgElement.src.includes('logo') && !imgElement.src.includes('azgame_logo')) {
                    imageUrl = imgElement.src;
                    break;
                }
            }
            
            // 获取iframe源 - 寻找游戏嵌入iframe
            const iframeSelectors = [
                'iframe[src*="embed"]',
                'iframe[src*="azgames"]',
                '#game-frame',
                '.game-iframe iframe',
                'iframe'
            ];
            
            let embedUrl = '';
            for (const selector of iframeSelectors) {
                const iframeElement = document.querySelector(selector);
                if (iframeElement && iframeElement.src) {
                    embedUrl = iframeElement.src;
                    break;
                }
            }
            
            // 获取游戏标签/类别
            const tagElements = document.querySelectorAll('.game-tags a, .tags a, .category, .breadcrumb a');
            const tags = Array.from(tagElements).map(tag => tag.textContent.trim()).filter(tag => tag.length > 0);
            
            // 获取评分
            const ratingElement = document.querySelector('.rating, .score, .votes');
            const rating = ratingElement ? parseFloat(ratingElement.textContent.match(/\d+\.?\d*/)?.[0]) || 8.0 : 8.0;
            
            return {
                title,
                description,
                imageUrl,
                embedUrl,
                tags,
                rating
            };
        });
        
        console.log(`✅ ${gameSlug}: 标题="${gameInfo.title}", 图片="${gameInfo.imageUrl}", embed="${gameInfo.embedUrl}"`);
        
        return {
            slug: gameSlug,
            ...gameInfo
        };
        
    } catch (error) {
        console.log(`❌ ${gameSlug}: 爬取失败 - ${error.message}`);
        return null;
    } finally {
        await page.close();
    }
}

// 更新游戏文件
async function updateGameFile(gameData) {
    if (!gameData) return;
    
    const filePath = path.join(__dirname, 'src/content/games', `${gameData.slug}.md`);
    
    try {
        // 读取现有文件
        const content = await fs.readFile(filePath, 'utf8');
        
        // 解析frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) return;
        
        const frontmatter = frontmatterMatch[1];
        const bodyContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
        
        // 更新frontmatter
        let updatedFrontmatter = frontmatter;
        
        // 更新标题
        if (gameData.title && gameData.title.length > 2) {
            updatedFrontmatter = updatedFrontmatter.replace(
                /title:\s*"[^"]*"/,
                `title: "${gameData.title.replace(/"/g, '\\"')}"`
            );
        }
        
        // 更新描述
        if (gameData.description && gameData.description.length > 10) {
            const cleanDesc = gameData.description.replace(/"/g, '\\"').substring(0, 200);
            updatedFrontmatter = updatedFrontmatter.replace(
                /description:\s*"[^"]*"/,
                `description: "${cleanDesc}"`
            );
        }
        
        // 更新图片URL
        if (gameData.imageUrl && gameData.imageUrl.includes('azgames.io')) {
            updatedFrontmatter = updatedFrontmatter.replace(
                /image:\s*"[^"]*"/,
                `image: "${gameData.imageUrl}"`
            );
        }
        
        // 更新embedUrl
        if (gameData.embedUrl && gameData.embedUrl.includes('azgames.io')) {
            updatedFrontmatter = updatedFrontmatter.replace(
                /embedUrl:\s*"[^"]*"/,
                `embedUrl: "${gameData.embedUrl}"`
            );
        }
        
        // 更新评分
        if (gameData.rating && gameData.rating > 0) {
            updatedFrontmatter = updatedFrontmatter.replace(
                /rating:\s*[\d.]+/,
                `rating: ${gameData.rating}`
            );
        }
        
        // 重新组装文件内容
        const newContent = `---\n${updatedFrontmatter}\n---\n${bodyContent}`;
        
        await fs.writeFile(filePath, newContent, 'utf8');
        console.log(`📝 已更新: ${gameData.slug}`);
        
    } catch (error) {
        console.log(`❌ 更新文件失败 ${gameData.slug}: ${error.message}`);
    }
}

// 主函数
async function main() {
    console.log('🚀 开始从azgames.io爬取游戏资源...\n');
    
    // 启动浏览器
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
    
    try {
        // 获取现有游戏列表
        const games = await getExistingGames();
        console.log(`📋 找到 ${games.length} 个游戏文件\n`);
        
        let successCount = 0;
        let totalCount = 0;
        
        // 分批处理游戏（避免过载）
        const batchSize = 3; // 减少批次大小避免被限制
        for (let i = 0; i < games.length; i += batchSize) {
            const batch = games.slice(i, i + batchSize);
            
            console.log(`📦 处理批次 ${Math.floor(i/batchSize) + 1}/${Math.ceil(games.length/batchSize)}`);
            
            // 并发爬取这一批游戏
            const promises = batch.map(game => scrapeGameInfo(browser, game));
            const results = await Promise.all(promises);
            
            // 更新成功爬取的游戏文件
            for (const gameData of results) {
                if (gameData) {
                    await updateGameFile(gameData);
                    successCount++;
                }
                totalCount++;
            }
            
            // 批次间暂停
            if (i + batchSize < games.length) {
                console.log('⏳ 等待 5 秒...\n');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
        
        console.log(`\n🎉 爬取完成！`);
        console.log(`✅ 成功: ${successCount}/${totalCount} 个游戏`);
        console.log(`❌ 失败: ${totalCount - successCount} 个游戏`);
        
    } catch (error) {
        console.error('💥 爬取过程出错:', error);
    } finally {
        await browser.close();
    }
}

// 运行爬虫
main().catch(console.error); 