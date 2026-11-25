import './enlace-texto.css';

// Enlace de texto con el mismo estilo que los enlaces de la cabecera (Trabajo, Soluciones, Nosotros): mismo tamaño y color (el del texto de
// la sección). Hover y foco de teclado: subrayado que se dibuja de izquierda a derecha y un poco más de negrita, sin cambiar el ancho.
// `flecha`: añade una flecha (→) al final, SVG en línea del mismo color y tamaño que el texto (aria-hidden), que se desplaza unos 3,5 px a la derecha
// en hover y foco (sin desplazamiento con movimiento reducido).
export default function EnlaceTexto({ texto, href, className = '', flecha = false }: { texto: string; href: string; className?: string; flecha?: boolean }) {
  return (
    <a className={`enlace-texto${className ? ' ' + className : ''}`} href={href}>
      {texto}
      {flecha ? (
        <svg className="enlace-texto__flecha" viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M2 8h11M9 4.5 13 8l-4 3.5" />
        </svg>
      ) : null}
    </a>
  );
}
