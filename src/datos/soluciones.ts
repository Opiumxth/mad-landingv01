// Tarjetas de la sección "Soluciones" de la home. Para cambiar una, edita su fila:
//   id          → identificador de la tarjeta
//   numero      → número que se muestra ("01"…)
//   titulo      → H3
//   descripcion → texto corto
//   href        → destino del enlace "Ver solución" (esas páginas aún no existen)
export interface Solucion { id: string; numero: string; titulo: string; descripcion: string; href: string }

// ⚠ TEXTOS PROVISIONALES: [Confirmar] redacción de cada solución antes de publicar.
export const soluciones: Solucion[] = [
  { id: 'desarrollo-de-software', numero: '01', titulo: 'Desarrollo de software', descripcion: 'Sistemas a medida para tu negocio, como paneles de gestión, reservas y clientes.', href: '/soluciones/desarrollo-de-software' },
  { id: 'automatizacion', numero: '02', titulo: 'Automatización', descripcion: 'Software que resuelve tareas repetitivas, como reportes y flujos entre tus herramientas.', href: '/soluciones/automatizacion' },
  { id: 'web-apps', numero: '03', titulo: 'Web apps', descripcion: 'Aplicaciones web que funcionan en el celular y en la computadora, sin instalar nada.', href: '/soluciones/web-apps' },
  { id: 'ux-ui', numero: '04', titulo: 'UX/UI', descripcion: 'Diseño de interfaces claras, pensadas para cómo se usa tu producto.', href: '/soluciones/ux-ui' },
];
