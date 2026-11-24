import type { CSSProperties } from 'react';
import SolucionesPop from './SolucionesPop';
import TemaFondo from './TemaFondo';
import EncabezadoSeccion from './EncabezadoSeccion';
import { soluciones } from '../datos/soluciones';
import { es } from '../i18n/es';
import './soluciones.css';

const t = es.soluciones;

// Sección "Soluciones" (#soluciones): sin fondo propio (la página pasa a tema oscuro al llegar aquí), H2 editorial y subtítulo a la izquierda
// y cuatro tarjetas azules apiladas. El contenido va en el HTML (sin JS). Cada tarjeta se pulsa entera con UN solo enlace, extendido con
// ::after (stretched link), cuyo texto es solo para lectores de pantalla.
export default function Soluciones() {
  return (
    <section id="soluciones" className="sol" aria-labelledby="soluciones-h2">
      <div className="sol__caja">
        {/* Encabezado fijo (sticky) mientras dura el apilado de las tarjetas; las tarjetas se apilan debajo de él (ver soluciones.css) */}
        <div className="sol__cabeza">
          <EncabezadoSeccion id="soluciones-h2" titulo={t.titulo} subtitulo={t.subtitulo} />
        </div>
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
                  <a className="sol__enlace" href={s.href}><span className="sr-only">{t.enlaceEtiqueta(s.titulo)}</span></a>
                </div>
                {/* Espacio visual provisional: bloque de degradado, sin texto ni imagen */}
                <div className="sol__visual" aria-hidden="true"></div>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <TemaFondo />
      <SolucionesPop />
    </section>
  );
}
