// Textos de las páginas del embudo (/ y /salones). Misma estructura, distinto enfoque.
// Lo que va [entre corchetes] es un dato que falta. Textos de la propuesta de servicios ya enviada.
import { condiciones, desde, mostrarPrecios, planes } from './precios';

export type Rubro = 'salon' | 'barberia' | 'spa' | 'otro';

export const RUBROS: { valor: Rubro; texto: string }[] = [
  { valor: 'salon', texto: 'Salón' },
  { valor: 'barberia', texto: 'Barbería' },
  { valor: 'spa', texto: 'Spa' },
  { valor: 'otro', texto: 'Otro rubro' },
];

export const NECESIDADES: { valor: string; texto: string }[] = [
  { valor: 'web', texto: 'Sitio web' },
  { valor: 'panel', texto: 'Panel de gestión' },
  { valor: 'web-y-panel', texto: 'Web y panel' },
  { valor: 'no-se', texto: 'Aún no lo sé' },
];

export interface Faq { pregunta: string; respuesta: string; enlace?: { texto: string; href: string } }

export interface PaginaCopy {
  ruta: string;
  esSalones: boolean; // muestra comparación de planes y condiciones completas
  title: string;
  description: string;
  rubroInicial: Rubro | null;
  whatsappMensaje: string;
  hero: { h1: string; sub: string; cta: string; micro: string };
  videos: { etiqueta: string; titulo: string; lead: string };
  como: { etiqueta: string; titulo: string; lead: string };
  precios: { etiqueta: string; titulo: string; lead: string };
  condiciones: { etiqueta: string; titulo: string };
  form: { etiqueta: string; titulo: string; lead: string };
  faq: { etiqueta: string; titulo: string; items: Faq[] };
  cierre: { titulo: string; texto: string };
}

const CTA = 'Pide tu demo con tu logo';
const MICRO = 'Sin costo · te escribimos por WhatsApp';

// 3 etapas (de la propuesta). 3 semanas desde la aprobación y la entrega de logo, fotos y textos.
export const etapas = [
  { n: '01', cuando: 'Arranque', titulo: 'Reunión de una hora', texto: 'Definimos servicios, precios, horarios, logo, fotos y el nombre del dominio.' },
  { n: '02', cuando: 'Semanas 1 y 2', titulo: 'Construcción', texto: 'Armamos la web y una página por servicio y, en el plan Web + sistema, el sistema de citas. Te mostramos un avance y optimizamos para buscadores.' },
  { n: '03', cuando: 'Semana 3', titulo: 'Pruebas y publicación', texto: 'Pruebas y revisión de calidad, capacitación a tu equipo, ajustes con tus comentarios y publicación.' },
];
export const nota3Semanas = 'Son 3 semanas desde la aprobación y la entrega del logo, las fotos y los textos. Los plazos dependen de recibir ese material a tiempo.';

const precioFaq = (salones: boolean) =>
  mostrarPrecios
    ? salones
        ? `Plan Web ${planes[0].precio} y plan Web + sistema ${planes[1].precio}. Pago: ${condiciones.pago} Mantenimiento: ${condiciones.mantenimiento.monto}.`
        : `Desde ${desde}. Hay un plan con panel de citas. Los precios completos están en la página para salones, barberías y spas.`
    : 'Escríbenos por WhatsApp y te enviamos las opciones.';

function faq(salones: boolean): Faq[] {
  const negocio = salones ? 'del salón' : 'de tu negocio';
  const items: Faq[] = [
    { pregunta: '¿Qué es la demo con mi logo?', respuesta: 'Es una muestra de cómo se vería tu sitio con tu logo, para que la veas antes de decidir. No tiene costo.' },
    { pregunta: '¿Cuánto toma el trabajo completo?', respuesta: nota3Semanas },
    { pregunta: '¿Cuánto cuesta?', respuesta: precioFaq(salones), ...(mostrarPrecios && !salones ? { enlace: { texto: 'Ver planes para salones, barberías y spas', href: '/salones#precios' } } : {}) },
  ];
  if (mostrarPrecios) items.push({ pregunta: '¿Puedo empezar por el plan Web y pasar al otro después?', respuesta: condiciones.pasarAB });
  items.push(
    { pregunta: '¿Qué pasa con mi dominio, mi ficha de Google y mis cuentas?', respuesta: `Quedan a nombre ${negocio}. Si dejas de trabajar con nosotros, te entregamos una copia exportable de tu web y de tus datos.` },
    { pregunta: '¿Voy a salir primero en Google?', respuesta: 'No garantizamos posición, visitas ni resultados. Tener web y ficha de Google completas ayuda a que Google y los asistentes de IA entiendan tu negocio; cómo te muestren depende de ellos.' },
    { pregunta: '¿Qué no incluye?', respuesta: 'Marketing (redes, videos, anuncios y campañas) y administrar tus redes actuales. Pago en línea, recordatorios automáticos por WhatsApp y tienda en línea se cotizan aparte.' },
    { pregunta: '¿Cómo me contactan?', respuesta: 'Por WhatsApp, al número que dejes en el formulario. [Confirmar plazo de respuesta]' },
    { pregunta: '¿Qué hacen con mis datos del formulario?', respuesta: 'Solo los usamos para contactarte sobre tu demo. El detalle está en la política de privacidad.', enlace: { texto: 'Leer la política de privacidad', href: '/privacidad' } },
  );
  return items;
}

export const home: PaginaCopy = {
  ruta: '/',
  esSalones: false,
  title: 'MAD Software Studio | Web y reservas para tu negocio',
  description: 'Webs con reservas y paneles de gestión para negocios de servicios en Lima. Pide tu demo con tu logo, sin costo.',
  rubroInicial: null,
  whatsappMensaje: 'Hola, quiero pedir mi demo con mi logo.',
  hero: {
    h1: 'Web y reservas para tu negocio',
    sub: 'Hacemos webs con reservas por WhatsApp para negocios de servicios en Lima.',
    cta: CTA,
    micro: MICRO,
  },
  videos: {
    etiqueta: 'Demo de MAD',
    titulo: 'Así se ve una demo de MAD',
    lead: 'Un sitio web y un panel de ejemplo hechos por nosotros. Los textos y precios que ves en la demo son de ejemplo.',
  },
  como: { etiqueta: 'Cómo trabajamos', titulo: '3 semanas, 3 etapas', lead: 'Sabes en qué paso estamos todo el tiempo.' },
  precios: {
    etiqueta: 'Precios',
    titulo: `Desde ${desde}`,
    lead: 'Hay dos planes: solo web, o web con un sistema de citas y panel. Los precios y lo que incluye cada uno están en la página para salones, barberías y spas.',
  },
  condiciones: { etiqueta: 'Condiciones', titulo: 'Cómo trabajamos con tus datos' },
  form: { etiqueta: 'Tu demo', titulo: 'Cuéntanos de tu negocio', lead: 'Son 4 datos. Te escribimos por WhatsApp para preparar tu demo con tu logo.' },
  faq: { etiqueta: 'Preguntas frecuentes', titulo: 'Lo que suelen preguntar', items: faq(false) },
  cierre: { titulo: 'Mira tu negocio con su propia web', texto: 'Déjanos tus datos y prepara tu demo con tu logo.' },
};

export const salones: PaginaCopy = {
  ruta: '/salones',
  esSalones: true,
  title: 'Web y reservas para salones y spas | MAD Software Studio',
  description: 'Web con carta de servicios y reservas, y un panel para confirmar citas, para salones, barberías y spas. Pide tu demo con tu logo, sin costo.',
  rubroInicial: 'salon',
  whatsappMensaje: 'Hola, tengo un salón, barbería o spa y quiero pedir mi demo con mi logo.',
  hero: {
    h1: 'Web y reservas para tu salón',
    sub: 'Para salones, barberías y spas: tu carta de servicios y reservas por WhatsApp.',
    cta: CTA,
    micro: MICRO,
  },
  videos: {
    etiqueta: 'Demo de MAD',
    titulo: 'Así se ve la demo de un salón',
    lead: 'Una demo de MAD hecha para un salón: lo que ve tu cliente y lo que ves tú. Los textos y precios son de ejemplo.',
  },
  como: home.como,
  precios: { etiqueta: 'Precios', titulo: 'Dos planes', lead: 'Montos en soles, pago único por la web. El mantenimiento mensual se detalla más abajo.' },
  condiciones: { etiqueta: 'Condiciones', titulo: 'Pago, mantenimiento y tus datos' },
  form: { etiqueta: 'Tu demo', titulo: 'Cuéntanos de tu salón, barbería o spa', lead: 'Son 4 datos. Te escribimos por WhatsApp para preparar tu demo con tu logo.' },
  faq: { etiqueta: 'Preguntas frecuentes', titulo: 'Lo que suelen preguntar', items: faq(true) },
  cierre: { titulo: 'Mira tu salón con su propia web', texto: 'Déjanos tus datos y prepara tu demo con tu logo.' },
};
