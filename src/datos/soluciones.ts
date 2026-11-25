// Tarjetas de la sección "Soluciones" de la home. Para cambiar una, edita su fila:
//   id          → identificador de la tarjeta
//   numero      → número que se muestra ("01"…)
//   titulo      → H3
//   descripcion → texto corto
//   href        → destino de la tarjeta entera (esas páginas aún no existen)
export interface Solucion { id: string; numero: string; titulo: string; descripcion: string; href: string }

// ⚠ TEXTOS PROVISIONALES: [Confirmar] redacción de cada solución antes de publicar.
export const soluciones: Solucion[] = [
  { id: 'desarrollo-de-software', numero: '01', titulo: 'Desarrollo de software', descripcion: 'Páginas web, sitios web y software a medida para tu negocio, desde una web con reservas hasta un panel de gestión.', href: '/soluciones/desarrollo-de-software' },
  { id: 'automatizacion', numero: '02', titulo: 'Automatizaciones', descripcion: 'Automatización de procesos con herramientas como n8n y WhatsApp: avisos, reportes y tareas repetitivas resueltas sin trabajo manual.', href: '/soluciones/automatizacion' },
  { id: 'aplicaciones-web', numero: '03', titulo: 'Aplicaciones web', descripcion: 'Sistemas ERP, CRM y otras aplicaciones web que funcionan en el navegador, en el celular y en la computadora, sin instalar nada.', href: '/soluciones/aplicaciones-web' },
  { id: 'ux-ui', numero: '04', titulo: 'UX/UI', descripcion: 'Diseño de interfaces claras, pensadas para cómo se usa tu producto.', href: '/soluciones/ux-ui' },
];
