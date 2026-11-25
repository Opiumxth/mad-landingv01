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
        { texto: 'Trabajo', href: '/trabajo' },
        { texto: 'Soluciones', href: '/#soluciones' },
        { texto: 'Nosotros', href: '/#nosotros' },
        { texto: 'Contacto', href: '/book' },
      ] as EnlacePie[],
    },
    {
      etiqueta: 'Conectar',
      enlaces: [
        { texto: 'Instagram', href: 'https://www.instagram.com/somos_mad_pe/', externo: true },
        { texto: 'TikTok', href: 'https://www.tiktok.com/@somos_mad_pe', externo: true },
        // ⚠ PROVISIONAL: [Confirmar] cambiar por contact@somosmad.com cuando exista
        { texto: 'somosmad.pe@gmail.com', href: 'mailto:somosmad.pe@gmail.com' },
      ] as EnlacePie[],
    },
  ],
  // Teléfono (número público de Mathias, confirmado): "51/" y tres cajitas; todo el bloque enlaza a WhatsApp
  telefono: { prefijo: 'teléfono: 51/', cajas: ['987', '882', '601'], href: 'https://wa.me/51987882601', etiqueta: 'Teléfono y WhatsApp: 51 987 882 601' },
  derechos: '© 2026 MAD Software Studio. Todos los derechos reservados.',
  privacidad: { texto: 'Política de privacidad', href: '/privacidad' },
  subir: 'Volver arriba',
};
