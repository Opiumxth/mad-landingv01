import './enlace-texto.css';

// Enlace de texto con el mismo estilo que los enlaces de la cabecera (Trabajo, Soluciones, Nosotros): mismo tamaño y color (el del texto de
// la sección). Hover y foco de teclado: subrayado que se dibuja de izquierda a derecha y un poco más de negrita, sin cambiar el ancho.
export default function EnlaceTexto({ texto, href, className = '' }: { texto: string; href: string; className?: string }) {
  return <a className={`enlace-texto${className ? ' ' + className : ''}`} href={href}>{texto}</a>;
}
