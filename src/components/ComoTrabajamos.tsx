import type { CSSProperties } from 'react';
import ComoProgreso from './ComoProgreso';
import EncabezadoSeccion from './EncabezadoSeccion';
import { pasos } from '../datos/como-trabajamos';
import { es } from '../i18n/es';
import './como-trabajamos.css';

const t = es.comoTrabajamos;

// Sección "Cómo trabajamos" (#como-trabajamos): una pista alta con un panel pegado (sticky). A la derecha van el encabezado (H2 + subtítulo,
// siempre visible) y, debajo, los 5 pasos, que se van encendiendo con el scroll mientras el panel visual de la izquierda cambia. Todo el texto va en el HTML; el panel es decorativo.
// Construido desde cero siguiendo la mecánica de "Scroll Reveal Content A" (21st.dev, autor abui), cuyo código NO se copió:
// su página pública indica "License: no-license".
export default function ComoTrabajamos() {
  return (
    <section id="como-trabajamos" className="como" aria-labelledby="como-h2">
      <div className="como__pista" style={{ '--n': pasos.length } as CSSProperties}>
        <div className="como__escena">
          <div className="como__caja como__cuerpo">
            {/* Panel visual (solo escritorio con movimiento): una capa por paso; se apilan y se encienden con el fundido */}
            <div className="como__panel" aria-hidden="true">
              {pasos.map((p, i) => (
                <div key={i} className={'como__capa' + (i === 0 ? ' is-on' : '')}>
                  {p.imagen ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.imagen} alt="" decoding="async" /> : null}
                </div>
              ))}
            </div>
            <div className="como__der">
              <EncabezadoSeccion id="como-h2" titulo={t.titulo} subtitulo={t.subtitulo} />
            <ol className="como__lista" role="list">
              {pasos.map((p, i) => (
                <li key={p.numero} className={'como__paso' + (i === 0 ? ' is-on' : '')} style={{ '--i': i } as CSSProperties}>
                  <p className="como__numero" aria-hidden="true">{p.numero}</p>
                  <div className="como__fila">
                    <div className="como__linea" aria-hidden="true"><span className="como__relleno"></span></div>
                    <div className="como__texto">
                      <h3>{p.titulo}</h3>
                      <p>{p.descripcion}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            </div>
          </div>
        </div>
      </div>
      <ComoProgreso />
    </section>
  );
}
