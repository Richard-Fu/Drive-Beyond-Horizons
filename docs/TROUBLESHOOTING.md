# 🔧 故障排除指南

## 🚀 Vercel 部署问题

### ❌ zod 模块找不到错误

**症状：**
```bash
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/vercel/path0/node_modules/zod/index.js'
imported from /vercel/path0/node_modules/astro/dist/core/config/schema.js
```

**根本原因：**
- `--legacy-peer-deps` 标志导致依赖解析冲突
- 构建日志显示 `added X packages, removed Y packages` 数量异常
- zod 包在安装过程中被错误移除

**完整解决方案：**

1. **修复 vercel.json 配置**
   ```json
   {
     "buildCommand": "npm run build:production",
     "installCommand": "npm ci",
     "outputDirectory": "dist",
     "framework": "astro",
     "env": {
       "NODE_OPTIONS": "--max-old-space-size=4096",
       "VERCEL_FORCE_NO_BUILD_CACHE": "1"
     }
   }
   ```

2. **添加 .npmrc 文件**
   ```
   engine-strict=true
   audit=false
   fund=false
   ```

3. **完全重置依赖**
   ```bash
   rm package-lock.json node_modules -rf
   npm install
   ```

4. **本地验证**
   ```bash
   npm run build
   # 确保构建成功后再部署
   ```

5. **提交并部署**
   ```bash
   git add .
   git commit -m "fix: resolve dependency conflicts in Vercel deployment"
   git push origin main
   ```

### ❌ 依赖冲突通用解决

**症状：**
- 构建日志显示大量包被添加和移除
- 本地正常，部署失败
- 模块找不到错误

**诊断步骤：**
```bash
# 1. 检查本地依赖状态
npm ls [package-name]
npm outdated

# 2. 检查配置差异
git diff vercel.json
git status

# 3. 分析构建日志
# 关注：install 命令参数、包数量变化
```

**通用修复流程：**
```bash
# 1. 完全清理
rm package-lock.json node_modules .npmrc -rf

# 2. 创建标准 .npmrc
echo "engine-strict=true
audit=false
fund=false" > .npmrc

# 3. 重新安装
npm install

# 4. 本地验证
npm run build

# 5. 更新 vercel.json（使用 npm ci）
# 6. 提交所有更改
```

## 🛠 配置模板

### 标准 vercel.json

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

**关键要点：**
- ✅ 使用 `npm ci` 而不是 `npm install`
- ✅ 避免任何 `--legacy-peer-deps` 标志
- ✅ 设置合适的内存限制
- ✅ 必要时添加 `VERCEL_FORCE_NO_BUILD_CACHE=1`

### 标准 .npmrc

```
engine-strict=true
audit=false
fund=false
```

### 推荐的 package.json engines

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "type": "module"
}
```

## 🔍 诊断工具

### 快速检查脚本

添加到 `package.json` scripts：

```json
{
  "scripts": {
    "diagnose": "npm ls && npm outdated && npm run build",
    "clean-install": "rm -rf node_modules package-lock.json && npm install",
    "verify-build": "npm run build && echo '✅ Build successful!'"
  }
}
```

### 依赖检查命令

```bash
# 检查特定包
npm ls zod astro @astrojs/vercel

# 检查过期包
npm outdated

# 检查依赖树
npm ls --depth=2

# 安全审计
npm audit --audit-level high
```

## ⚠️ 常见陷阱

### ❌ 绝对避免

1. **使用 `--legacy-peer-deps`** - 会导致不可预测的依赖冲突
2. **忽略构建日志** - `added/removed packages` 数量异常是危险信号
3. **本地构建失败仍部署** - 本地失败，Vercel 必然失败
4. **混用包管理器** - 确保团队使用相同的包管理器
5. **提交 node_modules** - 应在 .gitignore 中排除

### ✅ 最佳实践

1. **版本锁定** - 使用 `npm ci` 确保环境一致性
2. **引擎约束** - 在 `package.json` 中明确版本要求
3. **缓存策略** - 遇到问题时优先清除缓存
4. **渐进修复** - 一次只改一个配置
5. **日志分析** - 仔细阅读构建日志

## 🚨 紧急修复

当部署完全失败时的快速修复：

```bash
# 1. 立即回滚配置
git checkout HEAD~1 -- vercel.json package-lock.json

# 2. 或完全重置
rm package-lock.json node_modules -rf
npm install
git add .
git commit -m "fix: emergency dependency reset"
git push

# 3. 在 Vercel 控制台强制重新部署
# 设置环境变量：VERCEL_FORCE_NO_BUILD_CACHE=1
```

## 📋 问题报告模板

当需要寻求帮助时，请提供：

```markdown
## 问题描述
[简要描述问题]

## 错误日志
```
[粘贴完整的构建日志]
```

## 环境信息
- Node.js 版本：
- npm 版本：
- 操作系统：
- 本地构建是否成功：

## 当前配置
vercel.json:
```json
[粘贴 vercel.json 内容]
```

package.json engines:
```json
[粘贴 engines 部分]
```

## 已尝试的解决方案
- [ ] 清理并重新安装依赖
- [ ] 检查 vercel.json 配置
- [ ] 本地构建验证
- [ ] 其他：
```

## 📚 相关资源

- [Vercel 部署文档](https://vercel.com/docs/deployments)
- [Astro 部署指南](https://docs.astro.build/en/guides/deploy/vercel/)
- [npm ci vs npm install](https://docs.npmjs.com/cli/v8/commands/npm-ci)
- [Node.js 版本管理](https://nodejs.org/en/download/)

---

💡 **提示：** 大多数部署问题都是依赖相关的。当遇到问题时，优先考虑完全重置依赖树。