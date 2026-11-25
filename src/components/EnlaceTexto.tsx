import './enlace-texto.css';

// Enlace de texto con el mismo estilo que los enlaces de la cabecera (Trabajo, Soluciones, Nosotros): mismo tamaño y color (el del texto de
// la sección). Hover y foco de teclado: subrayado que se dibuja de izquierda a derecha y un poco más de negrita, sin cambiar el ancho.
// `flecha`: añade una flecha diagonal (↗) al final, SVG en línea del mismo color y tamaño que el texto (aria-hidden), a ~4 px del texto, que se
// desplaza unos 3 px hacia arriba a la derecha en hover y foco (sin desplazamiento con movimiento reducido).
// `externo`: se abre en otra pestaña (target _blank con rel noopener).
export default function EnlaceTexto({ texto, href, className = '', flecha = false, externo = false }: { texto: string; href: string; className?: string; flecha?: boolean; externo?: boolean }) {
  return (
    <a className={`enlace-texto${className ? ' ' + className : ''}`} href={href} {...(externo ? { target: '_blank', rel: 'noopener' } : {})}>
      {texto}
      {flecha ? (
        <svg className="enlace-texto__flecha" viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M2.5 13.5 13 3M5.5 3H13v7.5" />
        </svg>
      ) : null}
    </a>
  );
}
