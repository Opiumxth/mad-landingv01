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
    subtitulo: 'Ejemplos de lo que podemos construir para tu negocio.', // ⚠ provisional
    verMas: { texto: 'Ver más trabajo', href: '/trabajo' },
    avisoDemos: 'Demos de ejemplo',
    ruta: (slug: string) => `/trabajo/${slug}`,
  },
  // Sección "Soluciones" de la home
  soluciones: {
    titulo: 'Soluciones',
    subtitulo: 'Desde una página web hasta un sistema a la medida: diseñamos, desarrollamos y automatizamos lo que tu negocio necesita para trabajar mejor.', // ⚠ provisional
    enlaceEtiqueta: (titulo: string) => `Ver solución: ${titulo}`,
  },
  // Sección "Cómo trabajamos" de la home
  comoTrabajamos: {
    titulo: 'Cómo trabajamos', // ⚠ provisional
    subtitulo: 'Cinco pasos claros, de la primera conversación a la puesta en línea.', // ⚠ provisional
  },
  // Sección "Nosotros" de la home
  nosotros: {
    titulo: 'Nosotros',
    cta: { texto: 'Conócenos', href: '/nosotros' },
    // ⚠ provisional: sin cifras, clientes, plazos ni promesas
    parrafo: 'Somos un equipo de ingeniería de sistemas y software en Lima. Diseñamos y desarrollamos páginas web, aplicaciones y automatizaciones para negocios de todo el Perú.',
  },
  // Sección "Preguntas frecuentes" de la home
  faq: {
    titulo: 'Preguntas frecuentes',
    subtitulo: 'Lo que suelen preguntarnos antes de empezar.', // ⚠ provisional
    enlace: { texto: '¿No encuentras tu respuesta? Escríbenos', href: '/book' },
  },
  // Banda de contacto de la home
  contacto: {
    titulo: '¿Hablamos de tu proyecto?', // ⚠ provisional
    subtitulo: 'Cuéntanos qué necesitas y te enviamos una propuesta.', // ⚠ provisional
    cta: { texto: 'Hablemos', href: '/book' },
  },
} as const;

export type Diccionario = typeof es;
