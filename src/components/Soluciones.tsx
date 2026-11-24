import { Fragment, type CSSProperties } from 'react';
import SolucionesPop from './SolucionesPop';
import TemaFondo from './TemaFondo';
import { soluciones } from '../datos/soluciones';
import { es } from '../i18n/es';
import './soluciones.css';

const t = es.soluciones;

// Revelado del título y del subtítulo: cada palabra va en su <span> (el texto sigue siendo normal dentro del h2 y del p) y pasa de gris a
// blanco con el scroll (CSS scroll-driven, ver soluciones.css). El tramo del scroll en que ocurre (en % del recorrido del bloque,
// "cover"): empieza cuando el título llega al punto del cambio de tema y termina con el bloque centrado en la pantalla (50 %).
// Cada palabra ocupa una ventana de VENTANA pasos y las ventanas se solapan: en el frente del revelado hay dos o tres palabras en azul.
const INICIO = 22;
const FIN = 50;
const VENTANA = 2.5;
const palabras = (texto: string) => texto.split(' ');
const total = palabras(t.titulo).length + palabras(t.subtitulo).length;
const paso = (FIN - INICIO) / (total - 1 + VENTANA);
const r2 = (n: number) => +n.toFixed(2);

function Palabras({ texto, desde }: { texto: string; desde: number }) {
  const ps = palabras(texto);
  return (
    <>
      {ps.map((p, i) => {
        const ini = INICIO + (desde + i) * paso;
        return (
          <Fragment key={i}>
            <span className="sol__p" style={{ '--ini': r2(ini), '--fin': r2(ini + VENTANA * paso) } as CSSProperties}>{p}</span>
            {i < ps.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </>
  );
}

// Sección "Soluciones" (#soluciones): sin fondo propio (la página pasa a tema oscuro al llegar aquí), H2 editorial y subtítulo a la izquierda
// y cuatro tarjetas azules apiladas. El contenido va en el HTML (sin JS). Cada tarjeta se pulsa entera con UN solo enlace, extendido con
// ::after (stretched link), cuyo texto es solo para lectores de pantalla.
export default function Soluciones() {
  const nTitulo = palabras(t.titulo).length;
  return (
    <section id="soluciones" className="sol" aria-labelledby="soluciones-h2">
      <div className="sol__caja">
        <div className="sol__cabeza">
          <h2 id="soluciones-h2" className="sol__titulo"><Palabras texto={t.titulo} desde={0} /></h2>
          <p className="sol__sub"><Palabras texto={t.subtitulo} desde={nTitulo} /></p>
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
