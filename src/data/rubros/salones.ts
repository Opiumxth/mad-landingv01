// Rubro: salones, barberías y spas. La demo es la de un salón real de ejemplo.
// Lo que va [entre corchetes] es un dato que falta confirmar.
import { IMG } from '../../imagenes';
import type { RubroDatos } from './tipos';

export const salones: RubroDatos = {
  slug: 'salones',
  nombre: 'Salones, barberías y spas',
  deNegocio: 'del salón',
  formRubro: 'salon',
  title: 'Web y reservas para salones y spas | MAD Software Studio',
  description: 'Web con carta de servicios y reservas, y un panel para confirmar citas, para salones, barberías y spas. Pide tu demo con tu logo, sin costo.',
  whatsappMensaje: 'Hola, tengo un salón, barbería o spa y quiero pedir mi demo con mi logo.',
  hero: {
    h1: 'Web y reservas para tu salón',
    sub: 'Para salones, barberías y spas: tu carta de servicios y reservas por WhatsApp.',
  },
  demo: {
    titulo: 'Así se ve la demo de un salón',
    lead: 'Una demo de MAD hecha para un salón: lo que ve tu cliente y lo que ves tú. Los textos y precios son de ejemplo.',
    videos: [
      {
        id: 'web',
        etiqueta: 'Sitio web',
        titulo: 'La carta que ven tus clientas',
        texto: 'Servicios por categoría, duración y precio, con un botón de reserva en cada uno.',
        poster: IMG.sitioCarta,
        url: '', // TODO: URL del video del sitio web
        duracion: '[duración]',
      },
      {
        id: 'panel',
        etiqueta: 'Panel',
        titulo: 'La agenda que usa recepción',
        texto: 'Las citas de la semana en una sola vista: por confirmar, confirmadas y atendidas.',
        poster: IMG.panelAgenda,
        url: '', // TODO: URL del video del panel
        duracion: '[duración]',
      },
    ],
  },
  servicios: {
    titulo: 'Los servicios de tu carta',
    lead: 'Esto es lo que suele ir en la web de un salón, barbería o spa. Los tuyos los definimos juntos en la reunión de arranque.',
    items: [
      { nombre: 'Cortes', detalle: 'Dama, caballero e infantil, con lavado y peinado.' },
      { nombre: 'Color y balayage', detalle: 'Desde un retoque de raíz hasta luces y babylights.' },
      { nombre: 'Tratamientos y alisados', detalle: 'Hidratación, reparación y alisados para el cabello.' },
      { nombre: 'Manicure y pedicure', detalle: 'Manos y pies, con esmaltado y cuidado de uñas.' },
      { nombre: 'Pestañas y cejas', detalle: 'Lifting, extensiones y diseño de cejas.' },
      { nombre: 'Maquillaje y peinado', detalle: 'Para eventos, novias y sesiones.' },
      { nombre: 'Faciales', detalle: 'Limpieza e hidratación de la piel del rostro.' },
      { nombre: 'Spa y masajes', detalle: 'Masajes relajantes en un ambiente tranquilo.' },
    ],
  },
  preguntas: [
    {
      pregunta: '¿Mis clientas pueden reservar sin llamar?',
      respuesta: 'Sí, con el plan Web + sistema: eligen el servicio en la web y la solicitud llega a tu panel; recepción la confirma por WhatsApp. No es un pago en línea: ese se cotiza aparte.',
    },
    {
      pregunta: '¿Qué puedo hacer desde el panel?',
      respuesta: 'En la demo, recepción confirma citas, ve qué clientas están por retoque y cambia las promociones. [Confirmar qué funciones del panel entran en el plan Web + sistema]',
    },
    {
      pregunta: 'Tengo una barbería o un spa, ¿también sirve?',
      respuesta: 'Sí. La carta se arma con tus servicios, sean cortes de caballero, barba, faciales o masajes. Marca tu rubro en el formulario y preparamos la demo con eso.',
    },
  ],
  formulario: { titulo: 'Cuéntanos de tu salón, barbería o spa' },
  cierre: { titulo: 'Mira tu salón con su propia web', texto: 'Déjanos tus datos y prepara tu demo con tu logo.' },
};
