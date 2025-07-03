import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";
import themeConfig from './src/config/theme.config.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: themeConfig.site.url,
  output: 'static',
  adapter: vercel(),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'zh'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true
    }
  },
  integrations: [
    tailwind(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    ssr: {
      external: ["svgo"],
      noExternal: ["zod"]
    },
    optimizeDeps: {
      include: ["zod"]
    },
  },
  compressHTML: true,
}); 