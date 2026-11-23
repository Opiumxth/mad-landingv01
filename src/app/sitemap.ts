import type { MetadataRoute } from 'next';
import { SITIO } from '../data/sitio';
import { rubros } from '../data/rubros';

// Solo páginas indexables. /gracias queda fuera (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ['/', ...rubros.map((r) => `/${r.slug}`), '/privacidad'];
  return rutas.map((r) => ({ url: SITIO.dominio + (r === '/' ? '' : r) }));
}
