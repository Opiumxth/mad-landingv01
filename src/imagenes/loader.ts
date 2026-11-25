// Cargador de next/image: cada imagen tiene variantes ya generadas (public/img/<nombre>-<ancho>.webp).
export default function loader({ src, width }: { src: string; width: number; quality?: number }): string {
  return `${src}-${width}.webp`;
}
