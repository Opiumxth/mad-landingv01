// SEO compartido: metadatos por página y JSON-LD de Organization.
import type { Metadata } from 'next';
import { SITIO } from '../data/sitio';

export function metaPagina(o: { title: string; description: string; ruta: string; noindex?: boolean }): Metadata {
  const url = SITIO.dominio + o.ruta;
  return {
    title: { absolute: o.title },
    description: o.description,
    alternates: { canonical: url },
    robots: o.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      locale: 'es_PE',
      siteName: SITIO.nombre,
      title: o.title,
      description: o.description,
      url,
      images: [{ url: `${SITIO.dominio}/og-default.png`, width: 1200, height: 630, alt: 'Logo de MAD Software Studio sobre fondo negro' }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export const organizacion = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITIO.nombre,
  url: SITIO.dominio,
  logo: `${SITIO.dominio}/icon.png`,
  sameAs: [SITIO.instagramUrl, `https://wa.me/${SITIO.whatsappNumero}`],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+' + SITIO.whatsappNumero,
    availableLanguage: 'es',
  },
};
