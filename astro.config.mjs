import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://artimex.vercel.app',
  integrations: [react(), sitemap()],
  output: 'static',
  vite: {
    server: {
      host: true
    }
  }
});
