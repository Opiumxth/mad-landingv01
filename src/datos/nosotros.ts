// Imágenes del grid bento de la sección "Nosotros" de la home (5: una grande, dos medianas y dos pequeñas). Para cambiar una, edita su fila:
//   imagen → ruta de una imagen dentro de public/ (se recorta con object-fit: cover); con `null` se muestra un degradado provisional de los colores del proyecto
//   alt    → texto alternativo de la imagen real
//   tam    → tamaño en el bento: 'g' (grande), 'm' (mediana) o 's' (pequeña); la distribución está en nosotros.css
// ⚠ PLACEHOLDERS: [Confirmar] imágenes reales y sus textos alternativos (por ahora nombran a la marca).
export interface ImagenNosotros { imagen: string | null; alt: string; tam: 'g' | 'm' | 's' }

export const imagenesNosotros: ImagenNosotros[] = [
  { imagen: null, alt: 'Equipo de MAD Software Studio', tam: 'g' },
  { imagen: null, alt: 'Trabajo en equipo en MAD Software Studio', tam: 'm' },
  { imagen: null, alt: 'Proyecto de MAD Software Studio', tam: 's' },
  { imagen: null, alt: 'Reunión con un cliente de MAD Software Studio', tam: 'm' },
  { imagen: null, alt: 'Detalle del trabajo de MAD Software Studio', tam: 's' },
];
