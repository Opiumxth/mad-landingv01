import type { MetadataRoute } from 'next';
import { SITIO } from '../data/sitio';

// Todo rastreable (incluidos los rastreadores de IA); solo se excluye la ruta del formulario.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITIO.dominio}/sitemap.xml`,
  };
}
