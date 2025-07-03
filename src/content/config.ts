import { defineCollection, z } from 'astro:content';

// 为"games"集合定义数据结构
const gamesCollection = defineCollection({
  type: 'content', // 'content' 代表 .md 或 .mdx 文件
  schema: z.object({
    title: z.string(), // 游戏标题 (字符串)
    description: z.string(), // 游戏短描述 (字符串)
    image: z.string().optional(), // 游戏封面图路径 (字符串, 可选)
    pubDate: z.date(), // 发布日期 (日期对象)
    
    // 游戏分类系统
    categories: z.array(z.string()), // 主要分类 (字符串数组)
    tags: z.array(z.string()).default([]), // 标签 (字符串数组, 默认空)
    gameType: z.enum(['geography', 'quiz', 'puzzle', 'strategy', 'action', 'education', 'arcade', 'sports', 'shooting', 'survival']).default('action'), // 游戏类型
    
    // 游戏属性
    difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'), // 难度等级
    playTime: z.string().optional(), // 游戏时长 (如: "5-10 minutes")
    players: z.string().default('1'), // 玩家数量 (如: "1", "1-4", "multiplayer")
    
    // 显示和推荐
    featured: z.boolean().default(false), // 是否为特色游戏 (布尔值, 默认为 false)
    popular: z.boolean().default(false), // 是否为热门游戏
    rating: z.number().min(0).max(10).optional(), // 评分 (0-10星)
    
    // 嵌入和技术
    embedUrl: z.string().optional(), // 游戏嵌入的URL (字符串, 可选)
    embedType: z.enum(['iframe', 'redirect', 'internal']).default('iframe'), // 嵌入类型
    external: z.boolean().default(false), // 是否为外部游戏
    
    // SEO和元数据
    keywords: z.array(z.string()).default([]), // SEO关键词
    language: z.enum(['en', 'zh', 'es', 'fr', 'de']).default('en'), // 游戏语言
    
    // 可选的额外信息
    developer: z.string().optional(), // 开发者
    version: z.string().optional(), // 版本号
    lastUpdated: z.date().optional(), // 最后更新时间
  }),
});

// 导出所有定义好的集合
export const collections = {
  'games': gamesCollection,
}; 