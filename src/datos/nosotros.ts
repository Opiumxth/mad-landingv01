// Imagen ancha de la sección "Nosotros" de la home. Para cambiarla, edita este objeto:
//   imagen → ruta de una imagen dentro de public/ (se recorta con object-fit: cover); con `null` se muestra el degradado provisional
//   alt    → texto alternativo de la imagen real
// ⚠ PLACEHOLDER: [Confirmar] imagen real y su texto alternativo.
export interface ImagenNosotros { imagen: string | null; alt: string }

export const imagenNosotros: ImagenNosotros = { imagen: null, alt: '' };
