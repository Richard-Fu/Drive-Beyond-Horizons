# 🚀 Deployment Guide

This guide will help you deploy your game framework to Vercel or other platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- GitHub account
- Vercel account (free tier works)

## 🔧 Environment Setup

1. **Copy environment template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Update environment variables**:
   - `PUBLIC_SITE_URL`: Your production domain
   - `PUBLIC_GA_ID`: Google Analytics ID (optional)
   - `PUBLIC_GTM_ID`: Google Tag Manager ID (optional)

## 🌐 Deploy to Vercel (Recommended)

### Method 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set environment variables** in Vercel dashboard or CLI:
   ```bash
   vercel env add PUBLIC_SITE_URL
   vercel env add PUBLIC_GA_ID
   ```

### Method 2: GitHub Integration

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set framework preset to "Astro"
   - Add environment variables in settings

3. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 🎯 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All games are accessible
- [ ] Search functionality works
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags present
- [ ] Analytics tracking active (if configured)
- [ ] PWA features working
- [ ] Performance score >90 (check with Lighthouse)

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to main branch
- Generate preview deployments for pull requests
- Run build checks and tests

## 🌍 Custom Domain Setup

1. **Add domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update environment variables**:
   - Change `PUBLIC_SITE_URL` to your custom domain
   - Redeploy if needed

## 📊 Performance Optimization

### Vercel-specific optimizations:
- Images are automatically optimized
- Static assets are cached with long TTL
- Gzip compression enabled
- Global CDN distribution

### Additional recommendations:
- Use WebP images when possible
- Minimize JavaScript bundle size
- Enable service worker caching
- Optimize Core Web Vitals

## 🐛 Troubleshooting

### Build Errors:
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

### Environment Variables Not Working:
- Ensure variables start with `PUBLIC_` for client-side access
- Check Vercel dashboard environment variables
- Redeploy after adding new variables

### Performance Issues:
- Check Network tab in DevTools
- Use Vercel Analytics for insights
- Optimize images and fonts
- Review bundle size

## 📈 Monitoring

### Vercel Analytics:
- Page views and unique visitors
- Core Web Vitals scores
- Top pages and referrers

### Third-party options:
- Google Analytics (if configured)
- Search Console for SEO monitoring
- Uptime monitoring services

## 🔒 Security

The deployment includes:
- Security headers (CSP, XSS protection)
- HTTPS enforcement
- Safe iframe embedding policies
- Content type validation

## 💡 Tips for Success

1. **Test locally first**: Always run `npm run build && npm run preview`
2. **Monitor performance**: Check Lighthouse scores regularly
3. **Keep dependencies updated**: Regular security updates
4. **Backup content**: Use version control for all content
5. **SEO optimization**: Submit sitemap to search engines

## 📞 Support

- Vercel Documentation: https://vercel.com/docs
- Astro Documentation: https://docs.astro.build
- GitHub Issues: Create issues for bugs or questions

---

🎮 Happy gaming and successful deployment!