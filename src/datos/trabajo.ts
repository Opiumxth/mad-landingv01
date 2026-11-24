// Proyectos de la sección "Nuestro trabajo" de la home. Para cambiar un proyecto, edita su fila:
//   slug        → la tarjeta lleva a /trabajo/[slug] (esas páginas aún no existen)
//   nombre      → nombre del proyecto o de la empresa (negrita)
//   descripcion → 1 a 2 líneas
//   imagen      → archivo 16:9 dentro de public/ (hoy: marcadores de public/trabajo/)
export interface Proyecto { slug: string; nombre: string; descripcion: string; imagen: string }

// ⚠ PLACEHOLDERS: no son clientes reales. [Confirmar] nombre, descripción, imagen y slug de cada proyecto antes de publicar.
export const proyectos: Proyecto[] = Array.from({ length: 8 }, (_, i) => ({
  slug: `demo-${i + 1}`,
  nombre: 'Nombre de empresa',
  descripcion: 'Descripción del proyecto realizado',
  imagen: `/trabajo/demo-${i + 1}.svg`,
}));

// Mientras los proyectos sean marcadores, se muestra la línea "Demos de ejemplo" bajo la banda.
// Para quitarla (con proyectos reales), cambia esto a false.
export const sonDemosDeEjemplo = true;
