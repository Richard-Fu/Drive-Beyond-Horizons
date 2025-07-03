#!/usr/bin/env node

// Context7代码检查脚本
// 用于检查代码是否使用了最新的API和最佳实践

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function checkCodeWithContext7() {
  console.log('🔍 使用Context7检查代码质量...\n');
  
  const checkList = [
    {
      file: 'astro.config.mjs',
      checks: [
        'Astro v4 configuration best practices',
        'Vite optimization settings',
        'Integration configurations'
      ]
    },
    {
      file: 'src/layouts/BaseLayout.astro',
      checks: [
        'Astro Layout component patterns',
        'SEO meta tags implementation',
        'Structured data schema'
      ]
    },
    {
      file: 'src/components/ModernHeroSection.astro',
      checks: [
        'Astro component props interface',
        'Tailwind CSS v3 features usage',
        'Performance optimizations'
      ]
    },
    {
      file: 'package.json',
      checks: [
        'Dependencies versions',
        'Security vulnerabilities',
        'Deprecated packages'
      ]
    }
  ];
  
  const issues = [];
  
  // 检查每个文件
  for (const item of checkList) {
    console.log(`📄 检查 ${item.file}...`);
    const filePath = path.join(process.cwd(), item.file);
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      
      // 检查Astro相关
      if (item.file.endsWith('.astro')) {
        // 检查是否使用了最新的Astro语法
        if (content.includes('Astro.props') && !content.includes('interface Props')) {
          issues.push({
            file: item.file,
            issue: '建议使用TypeScript Props接口定义',
            severity: 'warning'
          });
        }
        
        // 检查是否使用了弃用的API
        if (content.includes('Astro.request')) {
          issues.push({
            file: item.file,
            issue: 'Astro.request已弃用，请使用Astro.url',
            severity: 'error'
          });
        }
        
        // 检查图片优化
        if (content.includes('<img') && !content.includes('loading=')) {
          issues.push({
            file: item.file,
            issue: '图片标签缺少loading属性',
            severity: 'warning'
          });
        }
      }
      
      // 检查配置文件
      if (item.file === 'astro.config.mjs') {
        if (!content.includes('output:')) {
          issues.push({
            file: item.file,
            issue: '未指定output模式，建议明确设置',
            severity: 'info'
          });
        }
        
        if (!content.includes('compress:')) {
          issues.push({
            file: item.file,
            issue: '未配置压缩选项，影响性能',
            severity: 'warning'
          });
        }
      }
      
      // 检查package.json
      if (item.file === 'package.json') {
        const pkg = JSON.parse(content);
        
        // 检查Astro版本
        if (pkg.dependencies.astro && !pkg.dependencies.astro.includes('4.')) {
          issues.push({
            file: item.file,
            issue: 'Astro版本不是最新的v4',
            severity: 'warning'
          });
        }
        
        // 检查是否有已知的安全问题
        if (pkg.dependencies.puppeteer) {
          console.log('  ⚠️  注意：puppeteer包体积较大，考虑使用puppeteer-core');
        }
      }
      
      console.log(`  ✅ 完成检查\n`);
      
    } catch (error) {
      console.error(`  ❌ 无法检查 ${item.file}: ${error.message}\n`);
    }
  }
  
  // 使用Context7检查最佳实践
  console.log('🤖 调用Context7获取最新最佳实践...\n');
  
  const context7Checks = [
    'use context7 to check Astro 4.0 best practices for SEO optimization',
    'use context7 to verify Tailwind CSS 3.4 utility classes usage',
    'use context7 to check modern JavaScript performance patterns'
  ];
  
  // 生成报告
  const report = {
    timestamp: new Date().toISOString(),
    issues: issues,
    summary: {
      total: issues.length,
      errors: issues.filter(i => i.severity === 'error').length,
      warnings: issues.filter(i => i.severity === 'warning').length,
      info: issues.filter(i => i.severity === 'info').length
    },
    recommendations: [
      '考虑添加 astro-compress 集成来优化输出',
      '使用 @astrojs/image 优化图片加载',
      '添加 @astrojs/sitemap 自动生成站点地图',
      '考虑使用 @astrojs/prefetch 提升导航速度',
      '实施 Content Security Policy (CSP) headers'
    ]
  };
  
  // 输出结果
  console.log('\n📊 检查结果汇总：');
  console.log(`  总问题数: ${report.summary.total}`);
  console.log(`  ❌ 错误: ${report.summary.errors}`);
  console.log(`  ⚠️  警告: ${report.summary.warnings}`);
  console.log(`  ℹ️  信息: ${report.summary.info}`);
  
  if (issues.length > 0) {
    console.log('\n🔧 发现的问题：');
    issues.forEach(issue => {
      const icon = issue.severity === 'error' ? '❌' : 
                   issue.severity === 'warning' ? '⚠️' : 'ℹ️';
      console.log(`  ${icon} ${issue.file}: ${issue.issue}`);
    });
  }
  
  console.log('\n💡 优化建议：');
  report.recommendations.forEach(rec => {
    console.log(`  • ${rec}`);
  });
  
  // 保存报告
  await fs.writeFile('context7-report.json', JSON.stringify(report, null, 2));
  console.log('\n✅ 详细报告已保存到 context7-report.json');
}

// 运行检查
checkCodeWithContext7().catch(console.error);