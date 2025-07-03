import { getCollection } from 'astro:content';
import themeConfig from '../config/theme.config.js';

export async function GET() {
  const games = await getCollection('games');
  const siteUrl = themeConfig.site.url;
  
  // 创建sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 首页 -->
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  
  <!-- 分类页面 -->
  ${Object.keys(themeConfig.categories).map(category => `
  <url>
    <loc>${siteUrl}/${category}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('')}
  
  <!-- 游戏页面 -->
  ${games.map(game => `
  <url>
    <loc>${siteUrl}/games/${game.slug}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${game.data.pubDate.toISOString()}</lastmod>
  </url>`).join('')}
  
  <!-- 功能页面 -->
  <url>
    <loc>${siteUrl}/search/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${siteUrl}/popular/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${siteUrl}/new-games/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  
  <!-- 其他重要页面 -->
  <url>
    <loc>${siteUrl}/about/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${siteUrl}/contact/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${siteUrl}/privacy/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${siteUrl}/terms/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${siteUrl}/dmca/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${siteUrl}/cookies/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}