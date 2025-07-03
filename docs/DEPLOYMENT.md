# 🚀 部署指南

## 快速部署到 Vercel

### 1. 准备配置文件

确保你的项目有正确的配置：

**vercel.json** (推荐配置):
```json
{
  "buildCommand": "npm run build:production",
  "installCommand": "npm ci",
  "outputDirectory": "dist",
  "framework": "astro",
  "env": {
    "NODE_OPTIONS": "--max-old-space-size=4096"
  }
}
```

**.npmrc** (确保依赖正确解析):
```
engine-strict=true
audit=false
fund=false
```

### 2. 本地验证

部署前务必确保本地构建成功：

```bash
# 清理并重新安装依赖
rm package-lock.json node_modules -rf
npm install

# 验证构建
npm run build

# 预览构建结果
npm run preview
```

### 3. 部署方式

#### 方式一：GitHub 集成 (推荐)

1. 推送代码到 GitHub
2. 在 [Vercel Dashboard](https://vercel.com/dashboard) 导入项目
3. 自动部署，每次推送都会重新部署

#### 方式二：Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产部署
vercel --prod
```

### 4. 环境变量配置

在 Vercel 项目设置中添加环境变量：

```bash
PUBLIC_GA_ID=your-google-analytics-id
PUBLIC_GTM_ID=your-google-tag-manager-id
```

## 其他平台部署

### Netlify

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--production=false"
```

### Cloudflare Pages

1. 连接 GitHub 仓库
2. 构建设置：
   - 构建命令: `npm run build`
   - 输出目录: `dist`
   - Node.js 版本: `18`

### GitHub Pages

使用 GitHub Actions：

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v1
        with:
          folder: dist
```

## 性能优化

### 1. 缓存策略

在 vercel.json 中添加：

```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. 预渲染优化

确保 `astro.config.mjs` 配置正确：

```javascript
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  }
});
```

## 监控和维护

### 1. 部署监控

- 设置 Vercel 通知
- 监控构建时间和失败率
- 使用 Vercel Analytics

### 2. 性能监控

```javascript
// 添加到 public/sw.js
self.addEventListener('install', (event) => {
  console.log('SW: Install');
});

// 性能监控
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### 3. SEO 监控

- Google Search Console
- Lighthouse CI
- 定期 SEO 审计

## 故障排除

如果部署失败，参考：
- [完整故障排除指南](./TROUBLESHOOTING.md)
- [Vercel 部署问题](./TROUBLESHOOTING.md#vercel-部署问题)

常见修复：

```bash
# 强制清理缓存部署
VERCEL_FORCE_NO_BUILD_CACHE=1 vercel --prod

# 重置依赖
rm package-lock.json node_modules -rf && npm install
```