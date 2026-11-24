import type { CSSProperties } from 'react';
import SolucionesPop from './SolucionesPop';
import { soluciones } from '../datos/soluciones';
import { es } from '../i18n/es';
import './soluciones.css';

const t = es.soluciones;

// Sección "Soluciones" (#soluciones): fondo oscuro, H2 editorial a la izquierda y cuatro tarjetas azules apiladas.
// El contenido va en el HTML (sin JS). Cada tarjeta se pulsa entera con UN solo enlace ("Ver solución"), extendido con ::after (stretched link).
export default function Soluciones() {
  return (
    <section id="soluciones" className="sol" aria-labelledby="soluciones-h2">
      <div className="sol__caja">
        <h2 id="soluciones-h2" className="sol__titulo">{t.titulo}</h2>
        <ol className="sol__lista">
          {soluciones.map((s, i) => (
            <li key={s.id} className="sol__item" style={{ '--i': i } as CSSProperties}>
              <article className="sol__card">
                <div className="sol__texto">
                  {/* Número, título y descripción forman un solo bloque compacto */}
                  <div className="sol__grupo">
                    <p className="sol__numero" aria-hidden="true">{s.numero}</p>
                    <h3>{s.titulo}</h3>
                    <p className="sol__desc">{s.descripcion}</p>
                  </div>
                  <a className="sol__enlace" href={s.href} aria-label={t.enlaceEtiqueta(s.titulo)}>{t.enlace}</a>
                </div>
                {/* Espacio visual provisional: bloque de degradado, sin texto ni imagen */}
                <div className="sol__visual" aria-hidden="true"></div>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <SolucionesPop />
    </section>
  );
}
