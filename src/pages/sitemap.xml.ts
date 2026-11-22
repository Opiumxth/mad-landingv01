import type { APIRoute } from 'astro';
import { SITIO } from '../data/sitio';

// Solo páginas indexables. /gracias queda fuera (noindex).
const rutas = ['/', '/salones', '/privacidad'];

export const GET: APIRoute = () => {
  const urls = rutas
    .map((r) => `  <url><loc>${SITIO.dominio}${r}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
