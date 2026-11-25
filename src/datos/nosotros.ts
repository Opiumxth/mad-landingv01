// Imágenes del grid bento de la sección "Nosotros" de la home: 4, en este orden (la posición en el grid sale del orden, ver nosotros.css):
//   1 → grande, a la izquierda, de toda la altura (~48 % del ancho)
//   2 → ancha, arriba a la derecha (todo el ancho de esa columna, ~45 % de la altura)
//   3 → pequeña, abajo a la derecha (casi cuadrada)
//   4 → más ancha (~2 veces la pequeña), abajo a la derecha
// Para cambiar una, edita su fila:
//   imagen → ruta de una imagen dentro de public/ (se recorta con object-fit: cover); con `null` se muestra un degradado provisional de los colores del proyecto
//   alt    → texto alternativo de la imagen real
// ⚠ PLACEHOLDERS: [Confirmar] imágenes reales y sus textos alternativos (por ahora nombran a la marca).
export interface ImagenNosotros { imagen: string | null; alt: string }

export const imagenesNosotros: ImagenNosotros[] = [
  { imagen: null, alt: 'Equipo de MAD Software Studio' },
  { imagen: null, alt: 'Trabajo en equipo en MAD Software Studio' },
  { imagen: null, alt: 'Proyecto de MAD Software Studio' },
  { imagen: null, alt: 'Reunión con un cliente de MAD Software Studio' },
];
