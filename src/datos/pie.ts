// Contenido del pie de la home. Para cambiar un enlace, un texto o el correo, edita este archivo.
export interface EnlacePie { texto: string; href: string; externo?: boolean }

export const pie = {
  nombre: 'Estudio de software',
  lugar: 'Lima, Perú',
  columnas: [
    {
      etiqueta: 'Navegar',
      enlaces: [
        { texto: 'Inicio', href: '/' },
        { texto: 'Trabajos', href: '/trabajo' }, // en plural solo en el pie (en la cabecera es "Trabajo")
        { texto: 'Soluciones', href: '/#soluciones' },
        { texto: 'Nosotros', href: '/#nosotros' },
        { texto: 'Contacto', href: '/book' },
        { texto: 'Privacidad', href: '/privacidad' },
      ] as EnlacePie[],
    },
    {
      etiqueta: 'Conectar',
      enlaces: [
        { texto: 'Instagram', href: 'https://www.instagram.com/somos_mad_pe/', externo: true },
        { texto: 'TikTok', href: 'https://www.tiktok.com/@somos_mad_pe', externo: true },
        // Número de Mathias, confirmado como público
        { texto: 'WhatsApp +51 987 882 601', href: 'https://wa.me/51987882601', externo: true },
        // ⚠ PROVISIONAL: [Confirmar] cambiar por contact@somosmad.com cuando exista
        { texto: 'somosmad.pe@gmail.com', href: 'mailto:somosmad.pe@gmail.com' },
      ] as EnlacePie[],
    },
  ],
  derechos: '© 2026 MAD Software Studio. Todos los derechos reservados.',
  subir: 'Volver arriba',
};
