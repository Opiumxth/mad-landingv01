// @ts-check
import { defineConfig } from 'astro/config';

// Sitio estático. El único código de servidor es worker/index.ts (POST /api/lead).
// El sitemap lo genera src/pages/sitemap.xml.ts (3 páginas, sin /gracias).
export default defineConfig({
  site: 'https://somosmad.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
});
