#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 内容模板生成器
class ContentGenerator {
  constructor() {
    this.templates = {
      faq: [
        { q: "Is {game} really free to play?", a: "Yes! {game} is completely free with no hidden costs." },
        { q: "Do I need to download {game}?", a: "No downloads required! Play {game} instantly in your browser." },
        { q: "Can I play {game} on mobile?", a: "{game} is fully optimized for mobile devices." },
        { q: "Is {game} safe for kids?", a: "{game} is family-friendly and suitable for all ages." },
        { q: "How do I save my progress in {game}?", a: "Your progress is automatically saved in your browser." }
      ],
      tips: [
        "Master the controls first before attempting advanced strategies",
        "Watch gameplay videos to learn from experienced players",
        "Practice regularly to improve your skills",
        "Join the community to share tips and strategies",
        "Start with easier levels and gradually increase difficulty"
      ],
      features: [
        "Instant play - no downloads or registration required",
        "Cross-platform compatibility - play on any device",
        "Regular updates with new content and features",
        "Competitive leaderboards to track your progress",
        "Community features for sharing and competing"
      ]
    };
  }

  // 生成游戏FAQ内容
  generateFAQ(gameName) {
    const faqs = this.templates.faq.map(item => ({
      question: item.q.replace('{game}', gameName),
      answer: item.a.replace('{game}', gameName)
    }));
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  // 生成长尾关键词内容
  generateLongTailContent(keyword, variants) {
    const content = {
      sections: []
    };

    // 生成"如何玩"部分
    content.sections.push({
      title: `How to Play ${keyword}`,
      content: `Playing ${keyword} is easy and fun! Simply click the play button above to start your game instantly. No downloads or registration required - just pure gaming enjoyment right in your browser.`
    });

    // 生成技巧部分
    content.sections.push({
      title: `${keyword} Tips and Tricks`,
      content: this.templates.tips.map(tip => `• ${tip}`).join('\n')
    });

    // 生成特性部分
    content.sections.push({
      title: `Why Choose ${keyword}?`,
      content: this.templates.features.map(feature => `✓ ${feature}`).join('\n')
    });

    // 生成变体关键词部分
    variants.forEach(variant => {
      content.sections.push({
        title: `About ${variant}`,
        content: `Experience the excitement of ${variant}! This version offers unique gameplay elements while maintaining the core fun that makes ${keyword} so popular. Perfect for players looking for a fresh take on the classic game.`
      });
    });

    return content;
  }

  // 生成游戏评分结构化数据
  generateRatingSchema(game) {
    return {
      "@context": "https://schema.org",
      "@type": "Game",
      "name": game.title,
      "description": game.description,
      "image": game.image,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": game.rating || 4.5,
        "ratingCount": Math.floor(Math.random() * 1000) + 100,
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
  }

  // 批量生成游戏内容增强
  async enhanceGameContent(gamesDir) {
    const files = await fs.readdir(gamesDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    for (const file of mdFiles) {
      const filePath = path.join(gamesDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      
      // 解析frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) continue;

      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*"(.+)"/);
      if (!titleMatch) continue;

      const gameTitle = titleMatch[1];
      
      // 检查是否已有FAQ部分
      if (content.includes('## Frequently Asked Questions')) continue;

      // 生成新内容
      const faqSection = `
## Frequently Asked Questions

${this.generateFAQ(gameTitle).mainEntity.map(item => 
  `**${item.name}**\n\n${item.acceptedAnswer.text}`
).join('\n\n')}

## Game Features

${this.templates.features.map(f => `- ${f}`).join('\n')}

## Tips for Success

${this.templates.tips.map(t => `- ${t}`).join('\n')}
`;

      // 添加到文件末尾
      const newContent = content + '\n' + faqSection;
      
      await fs.writeFile(filePath, newContent);
      console.log(`Enhanced content for: ${gameTitle}`);
    }
  }
}

// 运行内容生成器
async function main() {
  const generator = new ContentGenerator();
  const gamesDir = path.join(__dirname, '..', 'src', 'content', 'games');
  
  console.log('Starting content enhancement...');
  await generator.enhanceGameContent(gamesDir);
  console.log('Content enhancement complete!');
}

main().catch(console.error);