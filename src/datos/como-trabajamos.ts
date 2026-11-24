// Pasos de la sección "Cómo trabajamos" de la home. Para cambiar un paso, edita su fila:
//   numero      → número que se muestra ("01"…)
//   titulo      → H3
//   descripcion → una línea
//   imagen      → ruta de una imagen dentro de public/ para el panel visual de ese paso; con `null` se muestra el degradado provisional
export interface Paso { numero: string; titulo: string; descripcion: string; imagen: string | null }

// ⚠ TEXTOS PROVISIONALES: [Confirmar] redacción de cada paso antes de publicar (sin plazos, precios, cifras ni promesas).
export const pasos: Paso[] = [
  { numero: '01', titulo: 'Conversamos', descripcion: 'Entendemos tu negocio y definimos qué material hace falta.', imagen: null },
  { numero: '02', titulo: 'Acordamos', descripcion: 'Alcance, precio y forma de pago por escrito, antes de empezar.', imagen: null },
  { numero: '03', titulo: 'Construimos', descripcion: 'Armamos un borrador que puedes ver y comentar.', imagen: null },
  { numero: '04', titulo: 'Revisamos', descripcion: 'Ajustamos contigo y entregamos.', imagen: null },
  { numero: '05', titulo: 'Publicamos', descripcion: 'Ponemos tu sitio en línea y lo acompañamos con mantenimiento mensual.', imagen: null },
];
