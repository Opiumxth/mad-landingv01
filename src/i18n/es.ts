// Diccionario de textos del sitio (español de Perú). Todo texto nuevo de la cabecera y de la home va aquí.
// Sin librería de idiomas ni rutas por idioma: si algún día hace falta otro idioma, se crea otro archivo con esta misma forma.
// Lo marcado [Confirmar copy] en REPORTE_BORRADOR.md son propuestas de texto que Mathias debe aprobar.
export const es = {
  cabecera: {
    ubicacion: 'Lima, Perú',
    cobertura: 'Atendemos todo el Perú',
    logoEtiqueta: 'MAD Software Studio, inicio',
    navEtiqueta: 'Principal',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    enlaces: [
      { texto: 'Trabajo', href: '/trabajo' },
      { texto: 'Soluciones', href: '/#soluciones' },
      { texto: 'Nosotros', href: '/#nosotros' },
    ],
    cta: { texto: 'Hablemos', href: '/book' },
  },
  inicio: {
    // Metadatos de la home (título y descripción únicos en el sitio)
    title: 'MAD Software Studio | Webs, apps y automatización en Perú',
    description: 'Estudio de software en Lima. Hacemos webs, apps y automatización para negocios de todo el Perú. Webs desde S/750.',
    hero: {
      h1: 'Webs, apps y automatización para negocios de todo el Perú',
      h2: 'Estudio de software',
      cta: { texto: 'Hablemos', href: '/book' },
      micro: 'Webs desde S/750',
    },
    // Mensaje prellenado del WhatsApp del pie de la home
    whatsappMensaje: 'Hola, quiero conversar con MAD Software Studio sobre un proyecto.',
  },
} as const;

export type Diccionario = typeof es;
