import { Fragment } from 'react';
import BotonHover from './BotonHover';
import { precioDesde } from '../datos/cta';
import { es } from '../i18n/es';
import './banda-contacto.css';

const t = es.contacto;

// CTA de la home (#contacto), antes del pie. Sin panel ni marco: una sección sobre el mismo fondo del resto, con todo alineado a la IZQUIERDA sobre el mismo
// borde y ancho de contenedor que las demás secciones (p. ej. las preguntas frecuentes). De arriba abajo: título grande y liviano (Regular), subtítulo en gris con
// unas pocas palabras destacadas, fila de dos botones (primario: BotonHover, el mismo diseño y efecto que el "Hablemos" del hero; secundario: botón blanco con
// borde fino y sombra suave) y una línea discreta con el precio de partida (src/datos/cta.ts, ⚠ sin confirmar). Detrás, un arco muy fino de casi nulo contraste.
// En es.ts las palabras destacadas del subtítulo van entre asteriscos: *así*.
export default function BandaContacto() {
  const partes = t.subtitulo.split('*');
  return (
    <section id="contacto" className="con" aria-labelledby="contacto-h2">
      {/* Arco decorativo: una curva fina que cruza el fondo detrás del contenido */}
      <svg className="con__arco" viewBox="0 0 1440 640" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M-80 600 C 360 560, 940 330, 1520 30" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="con__caja">
        <h2 id="contacto-h2" className="con__titulo">{t.titulo}</h2>
        <p className="con__sub">
          {partes.map((p, i) => (i % 2 ? <strong key={i} className="con__enfasis">{p}</strong> : <Fragment key={i}>{p}</Fragment>))}
        </p>
        <div className="con__botones">
          <BotonHover texto={t.cta.texto} href={t.cta.href} />
          <a className="btn con__sec" href={t.cta2.href}>{t.cta2.texto}</a>
        </div>
        {precioDesde ? <p className="con__precio">{precioDesde}</p> : null}
      </div>
    </section>
  );
}
