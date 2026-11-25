// Precios y condiciones (de la propuesta de servicios enviada).
// - `mostrarPrecios` en false oculta TODO precio: bloque de precios, "desde S/750" y las menciones en la FAQ.
// - En la home solo se muestra "desde S/750"; la comparación A/B y las condiciones se muestran en /salones.
export const mostrarPrecios = true;

// PENDIENTE DE CONFIRMAR CON LOS SOCIOS antes de mezclar a main. En false se oculta de /salones.
export const mostrarExclusividad = true;

export interface Plan {
  id: 'A' | 'B';
  nombre: string;
  precio: string; // total mostrado
  precioNum: number;
  resumen: string;
  incluye: string[];
}

export const planes: Plan[] = [
  {
    id: 'A',
    nombre: 'Web',
    precio: 'S/750',
    precioNum: 750,
    resumen: 'Tu sitio propio, listo para que te encuentren.',
    incluye: [
      'Web para celular',
      'Una página por servicio',
      'Sección Novedades',
      'SEO y ficha de Google (Search Console, Bing, Analytics)',
      'Dominio y puesta en línea',
    ],
  },
  {
    id: 'B',
    nombre: 'Web + sistema',
    precio: 'S/1,650',
    precioNum: 1650,
    resumen: 'Todo lo de Web, más el sistema detrás de la web.',
    incluye: [
      'Todo lo del plan Web',
      'Panel con usuario y clave',
      'Solicitudes de cita por servicio',
      'Lista de clientes con exportación a Excel',
    ],
  },
];

export const desde = 'S/750';

export const condiciones = {
  pago: '50% al aprobar y 50% al entregar, antes de publicar.',
  mantenimiento: { monto: 'S/100 al mes', detalle: 'Desde la publicación: dominio (se renueva cada año), alojamiento, copias de seguridad, capacitación, revisiones y actualizaciones menores.' },
  pasarAB: 'Puedes empezar con el plan Web y pasar a Web + sistema por S/900. Pagas solo lo que suma el sistema.',
  datos: 'El dominio, la ficha de Google y las cuentas quedan a nombre de tu negocio. Si dejas de trabajar con nosotros, te entregamos una copia exportable de tu web y de tus datos.',
  exclusividad: 'Mientras trabajamos con un salón, no atendemos a otro que quede pegado al suyo.',
  noIncluye: [
    'Marketing: redes, videos, anuncios y campañas.',
    'Administrar tus redes actuales.',
    'Pago en línea, recordatorios automáticos por WhatsApp y tienda en línea: se cotizan aparte.',
  ],
};
