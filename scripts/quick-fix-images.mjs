import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 游戏名称到正确图片名称的映射
const gameImageMap = {
    '2048': '20481',
    'agar-io-online': 'agar-io1',
    'age-of-war': 'age-of-war1',
    'among-us-game': 'among-us1',
    'angry-birds-online': 'angry-birds1',
    'basketball-bros': 'basketball-bros1',
    'basketball-stars': 'basketball-stars1',
    'bitlife': 'bitlife1',
    'block-blast': 'block-blast1',
    'bloons-td-6-game': 'bloons-td-61',
    'blumgi-rocket': 'blumgi-rocket1',
    'brain-lines': 'brain-lines1',
    'brain-test': 'brain-test1',
    'bubble-shooter': 'bubble-shooter1',
    'candy-crush-saga': 'candy-crush-saga1',
    'chess-game': 'chess1',
    'chill-guy-clicker': 'chill-guy-clicker1',
    'chrome-dino-game': 'chrome-dino1',
    'color-switch': 'color-switch1',
    'cookie-clicker': 'cookie-clicker1',
    'cookie-clicker-game': 'cookie-clicker1',
    'crossy-road': 'crossy-road1',
    'crossy-road-game': 'crossy-road1',
    'curve-rush': 'curve-rush1',
    'cut-the-rope-3': 'cut-the-rope-31',
    'diep-io': 'diep-io1',
    'doodle-jump-game': 'doodle-jump1',
    'drift-hunters': 'drift-hunters1',
    'drive-mad': 'drive-mad1',
    'duck-life': 'duck-life1',
    'eggy-car': 'eggy-car1',
    'escape-road': 'escape-road1',
    'escape-road-city-2': 'escape-road-city-21',
    'fireboy-and-watergirl': 'fireboy-and-watergirl1',
    'fireboy-and-watergirl-5': 'fireboy-and-watergirl-51',
    'five-nights-at-freddys': 'five-nights-at-freddys1',
    'flappy-bird-game': 'flappy-bird1',
    'flying-kong': 'flying-kong1',
    'fruit-ninja-online': 'fruit-ninja1',
    'geometry-dash': 'geometry-dash1',
    'geometry-dash-game': 'geometry-dash1',
    'geometry-jump': 'geometry-jump1',
    'geotastic': 'geotastic1',
    'getting-over-it-game': 'getting-over-it1',
    'globe-guesser': 'globe-guesser1',
    'happy-glass': 'happy-glass1',
    'happy-wheels': 'happy-wheels1',
    'happy-wheels-game': 'happy-wheels1',
    'head-soccer-2024': 'head-soccer-20241',
    'house-of-hazards': 'house-of-hazards1',
    'idle-breakout': 'idle-breakout1',
    'little-big-snake': 'little-big-snake1',
    'merge-cakes': 'merge-cakes1',
    'merge-dragons': 'merge-dragons1',
    'minecraft-classic-game': 'minecraft-classic1',
    'minesweeper-game': 'minesweeper1',
    'monkey-mart': 'monkey-mart1',
    'moto-x3m': 'moto-x3m1',
    'openguessr': 'openguessr1',
    'ovo': 'ovo1',
    'pac-man-game': 'pacmangame1',
    'papas-freezeria': 'papas-freezeria1',
    'papas-freezeria-deluxe': 'papas-freezeria-deluxe1',
    'papas-pizzeria': 'papas-pizzeria1',
    'paper-io-2': 'paper-io-21',
    'penalty-shooters-2': 'penalty-shooters-21',
    'plants-vs-zombies-online': 'plants-vs-zombies1',
    'red-rush': 'red-rush1',
    'retro-bowl': 'retro-bowl1',
    'retro-bowl-college': 'retro-bowl-college1',
    'roblox-game': 'roblox1',
    'run-3': 'run-31',
    'run-3-game': 'run-31',
    'shell-shockers': 'shell-shockers1',
    'skibidi-toilet': 'skibidi-toilet1',
    'slither-io': 'slither-io1',
    'slope-2': 'slope-21',
    'slope-3': 'slope-31',
    'snow-road-3d': 'snow-road-3d1',
    'soccer-skills': 'soccer-skills1',
    'solitaire': 'solitaire1',
    'spear-warzone': 'spear-warzone1',
    'stack-ball': 'stack-ball1',
    'stick-fight': 'stick-fight1',
    'stickman-hook': 'stickman-hook1',
    'stumble-guys': 'stumble-guys1',
    'subway-surfers': 'subway-surfers1',
    'subway-surfers-online': 'subway-surfers1',
    'sudoku': 'sudoku1',
    'talking-tom-gold-run': 'talking-tom-gold-run1',
    'temple-run-2': 'temple-run-21',
    'temple-run-online': 'temple-run1',
    'tetris': 'tetris1',
    'tetris-classic': 'tetris-classic1',
    'tunnel-rush': 'tunnel-rush1',
    'venge-io': 'venge-io1',
    'vex-7': 'vex-71',
    'war-brokers': 'war-brokers1',
    'wordle': 'wordle1',
    'world-geography-games': 'world-geography-games1'
};

// 获取现有游戏列表
async function getExistingGames() {
    const gamesDir = path.join(__dirname, 'src/content/games');
    const files = await fs.readdir(gamesDir);
    return files
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
}

// 更新游戏文件的图片URL
async function updateGameImage(gameSlug) {
    const filePath = path.join(__dirname, 'src/content/games', `${gameSlug}.md`);
    
    try {
        // 读取现有文件
        const content = await fs.readFile(filePath, 'utf8');
        
        // 检查当前图片URL
        const currentImageMatch = content.match(/image:\s*"([^"]*)"/);
        if (!currentImageMatch) return false;
        
        const currentImageUrl = currentImageMatch[1];
        
        // 如果当前图片是logo或不正确，使用映射修复
        if (currentImageUrl.includes('logo') || currentImageUrl.includes('azgame_logo') || !currentImageUrl.includes('-m144x144')) {
            const imageKey = gameImageMap[gameSlug];
            if (imageKey) {
                const newImageUrl = `https://azgames.io/upload/cache/upload/imgs/${imageKey}-m144x144.webp`;
                
                const updatedContent = content.replace(
                    /image:\s*"[^"]*"/,
                    `image: "${newImageUrl}"`
                );
                
                await fs.writeFile(filePath, updatedContent, 'utf8');
                console.log(`✅ 更新图片: ${gameSlug} -> ${newImageUrl}`);
                return true;
            }
        } else {
            console.log(`✓ 图片已正确: ${gameSlug}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ 处理失败: ${gameSlug} - ${error.message}`);
        return false;
    }
}

// 主函数
async function main() {
    console.log('🖼️  开始修复图片URL...\n');
    
    const games = await getExistingGames();
    console.log(`📋 找到 ${games.length} 个游戏文件\n`);
    
    let updatedCount = 0;
    
    for (const game of games) {
        const updated = await updateGameImage(game);
        if (updated) updatedCount++;
    }
    
    console.log(`\n🎉 修复完成！`);
    console.log(`✅ 更新了 ${updatedCount} 个游戏的图片URL`);
}

// 运行脚本
main().catch(console.error); 