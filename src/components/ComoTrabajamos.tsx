import { Fragment, type CSSProperties } from 'react';
import ComoProgreso from './ComoProgreso';
import { pasos } from '../datos/como-trabajamos';
import { es } from '../i18n/es';
import './como-trabajamos.css';

const t = es.comoTrabajamos;

// Revelado del título: igual que el de "Soluciones" (cada palabra en su <span>; pasa de gris a blanco con el scroll, ver como-trabajamos.css).
const INICIO = 22;
const FIN = 50;
const VENTANA = 2.5;
const palabras = t.titulo.split(' ');
const paso = (FIN - INICIO) / (palabras.length - 1 + VENTANA);
const r2 = (n: number) => +n.toFixed(2);

// Sección "Cómo trabajamos" (#como-trabajamos): H2 y, debajo, una pista alta con un panel pegado (sticky) donde los 5 pasos se van
// encendiendo con el scroll mientras el panel visual de la izquierda cambia. Todo el texto va en el HTML; el panel es decorativo.
// Construido desde cero siguiendo la mecánica de "Scroll Reveal Content A" (21st.dev, autor abui), cuyo código NO se copió:
// su página pública indica "License: no-license".
export default function ComoTrabajamos() {
  return (
    <section id="como-trabajamos" className="como" aria-labelledby="como-h2">
      <div className="como__caja como__cabeza">
        <h2 id="como-h2" className="como__titulo">
          {palabras.map((p, i) => (
            <Fragment key={i}>
              <span className="como__p" style={{ '--ini': r2(INICIO + i * paso), '--fin': r2(INICIO + (i + VENTANA) * paso) } as CSSProperties}>{p}</span>
              {i < palabras.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h2>
      </div>
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
      <ComoProgreso />
    </section>
  );
}
