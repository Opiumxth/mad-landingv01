// Datos globales del sitio. Cambia aquí el WhatsApp, el dominio, las redes, etc.
export const SITIO = {
  nombre: 'MAD Software Studio', // nombre oficial en toda la web
  nombreMarca: 'MAD SOFTWARE STUDIO', // versión en mayúsculas (se estiliza con CSS; esto es solo texto accesible)
  dominio: 'https://somosmad.com', // canónico, sin www
  whatsappNumero: '51987882601', // +51 987-882-601 (formato wa.me, sin signos)
  whatsappVisible: '+51 987-882-601',
  instagramUsuario: 'somos_mad_pe',
  instagramUrl: 'https://www.instagram.com/somos_mad_pe/',
  idioma: 'es-PE',
  queHacemos: 'Hacemos webs con reservas por WhatsApp para negocios de servicios en Lima.', // una línea (pie de página)
  anio: new Date().getFullYear(),
} as const;

export function enlaceWhatsApp(mensaje: string): string {
  return `https://wa.me/${SITIO.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

// Cuentas oficiales (pie de página y JSON-LD sameAs)
export const REDES: { nombre: string; url: string; texto: string }[] = [
  { nombre: 'Instagram', url: SITIO.instagramUrl, texto: `@${SITIO.instagramUsuario}` },
  { nombre: 'WhatsApp', url: `https://wa.me/${SITIO.whatsappNumero}`, texto: SITIO.whatsappVisible },
];
