// Diccionario de textos del sitio (español de Perú). Todo texto nuevo de la cabecera y de la home va aquí.
// Sin librería de idiomas ni rutas por idioma: si algún día hace falta otro idioma, se crea otro archivo con esta misma forma.
// Lo marcado [Confirmar copy] en REPORTE_BORRADOR.md son propuestas de texto que Mathias debe aprobar.
export const es = {
  cabecera: {
    logoEtiqueta: 'MAD Software Studio, inicio',
    navEtiqueta: 'Principal',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    enlaces: [
      { texto: 'Trabajo', href: '/trabajo' },
      { texto: 'Soluciones', href: '/#soluciones' },
      { texto: 'Nosotros', href: '/#nosotros' },
    ],
  },
  inicio: {
    // Metadatos de la home (título y descripción únicos en el sitio)
    title: 'MAD Software Studio | Páginas web, apps y automatización',
    description: 'Estudio de software en Lima. Creamos páginas web, apps y automatización para negocios de todo el Perú.',
    hero: {
      h1: 'Páginas web, apps y automatización para negocios de todo el Perú',
      h2: 'Estudio de software',
      cta: { texto: 'Hablemos', href: '/book' },
    },
    // Mensaje prellenado del WhatsApp del pie de la home
    whatsappMensaje: 'Hola, quiero conversar con MAD Software Studio sobre un proyecto.',
  },
  // Sección "Nuestro trabajo" de la home
  trabajo: {
    titulo: 'Nuestro trabajo',
    verMas: { texto: 'Ver más trabajo', href: '/trabajo' },
    avisoDemos: 'Demos de ejemplo',
    ruta: (slug: string) => `/trabajo/${slug}`,
  },
  // Sección "Soluciones" de la home
  soluciones: {
    titulo: 'Soluciones',
    subtitulo: 'Páginas web, apps y automatización a la medida de tu negocio.', // ⚠ provisional
    enlace: 'Ver solución',
    enlaceEtiqueta: (titulo: string) => `Ver solución: ${titulo}`,
  },
} as const;

export type Diccionario = typeof es;
