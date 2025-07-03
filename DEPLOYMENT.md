# 🚀 Deployment Guide

This guide covers how to deploy your game site to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] Update `src/config/theme.config.js` with your domain and site info
- [ ] Add your games to `src/content/games/`
- [ ] Test locally with `npm run build && npm run preview`
- [ ] Update robots.txt if needed
- [ ] Set up analytics (GA/GTM) if desired
- [ ] Review SEO meta tags

## 🌐 Deployment Options

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Select your account
   - Link to existing project or create new
   - Use default settings

4. **Custom Domain**
   - Go to Vercel dashboard
   - Add your domain in project settings

### Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Continuous Deployment**
   - Connect GitHub repo on Netlify dashboard
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### Cloudflare Pages

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Create project on Cloudflare Pages**
   - Upload `dist` folder
   - Or connect GitHub repo

3. **Build settings**
   - Build command: `npm run build`
   - Build output directory: `dist`

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### AWS S3 + CloudFront

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Create S3 bucket**
   - Enable static website hosting
   - Set index.html as index document

3. **Upload files**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **Setup CloudFront**
   - Create distribution pointing to S3
   - Configure custom domain

### Traditional Hosting (cPanel, FTP)

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Upload via FTP**
   - Upload contents of `dist/` folder
   - Upload to public_html or www directory

## 🔧 Environment Variables

For services that need environment variables:

1. **Create `.env` file**
   ```
   PUBLIC_GA_ID=UA-XXXXXXXXX-X
   PUBLIC_SITE_URL=https://yourdomain.com
   ```

2. **Platform-specific setup**
   - **Vercel**: Add in dashboard → Settings → Environment Variables
   - **Netlify**: Add in dashboard → Site settings → Environment
   - **Cloudflare**: Add in Pages project → Settings → Environment variables

## 🌍 Custom Domain Setup

### DNS Configuration

Add these records to your domain:

**For Vercel/Netlify/Cloudflare:**
```
Type: CNAME
Name: @
Value: [platform-provided-domain]
```

**For apex domain (example.com):**
```
Type: A
Name: @
Value: [platform-provided-IP]
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: [your-domain.com]
```

### SSL Certificate

Most platforms provide free SSL:
- Vercel: Automatic
- Netlify: Automatic
- Cloudflare: Automatic with proxy enabled
- GitHub Pages: Automatic with custom domain

## 📊 Post-Deployment

### 1. Verify Deployment
- Check all pages load correctly
- Test game functionality
- Verify images load
- Check mobile responsiveness

### 2. SEO Verification
- Submit sitemap to Google Search Console
- Verify robots.txt is accessible
- Check meta tags with SEO tools

### 3. Performance Check
- Run Google PageSpeed Insights
- Check Core Web Vitals
- Test loading speed from different locations

### 4. Monitor
- Set up uptime monitoring
- Configure error alerts
- Track analytics

## 🐛 Troubleshooting

### Build Fails
- Check Node version (14.18+ required)
- Clear cache: `rm -rf node_modules dist`
- Reinstall: `npm install`

### 404 Errors
- Ensure trailing slashes match Astro config
- Check if all routes are generated
- Verify dist folder structure

### Slow Loading
- Enable CDN if available
- Compress images
- Check hosting location vs audience

### Games Not Loading
- Check iframe permissions
- Verify HTTPS for all resources
- Test CORS policies

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 📱 Progressive Web App (Optional)

To enable PWA features:

1. Add manifest.json to public/
2. Add service worker
3. Update BaseLayout with PWA meta tags

## 🎯 Optimization Tips

1. **Use CDN for images**
   - Cloudflare Images
   - Imgix
   - Cloudinary

2. **Enable compression**
   - Gzip/Brotli on server
   - Most platforms do this automatically

3. **Cache headers**
   - Set long cache for assets
   - Short cache for HTML

4. **Preload critical resources**
   - Fonts
   - Above-fold images
   - Critical CSS

---

Need help? Check the [README](README.md) or create an issue!