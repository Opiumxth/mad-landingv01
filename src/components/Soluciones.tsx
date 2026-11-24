import type { CSSProperties } from 'react';
import TextoTapado from './TextoTapado';
import TemaFondo from './TemaFondo';
import EncabezadoSeccion from './EncabezadoSeccion';
import { soluciones } from '../datos/soluciones';
import { es } from '../i18n/es';
import './texto-tapado.css';
import './soluciones.css';

const t = es.soluciones;

// Sección "Soluciones" (#soluciones): sin fondo propio (la página pasa a tema oscuro al llegar aquí), encabezado (H2 + subtítulo) quieto a la izquierda
// y cuatro tarjetas azules que se apilan debajo de él y luego lo cubren. El contenido va en el HTML (sin JS). Cada tarjeta se pulsa entera con UN solo enlace, extendido con
// ::after (stretched link), cuyo texto es solo para lectores de pantalla.
export default function Soluciones() {
  return (
    <section id="soluciones" className="sol" aria-labelledby="soluciones-h2">
      <div className="sol__caja tt" style={{ '--tt-n': soluciones.length } as CSSProperties}>
        {/* Efecto de texto quieto (texto-tapado.css): el encabezado se queda quieto, las tarjetas se apilan debajo de él y, ya apiladas,
            el conjunto sube y lo cubre; entonces todo sale junto. */}
        <div className="tt__guia">
          <div className="tt__texto sol__cabeza">
            <EncabezadoSeccion id="soluciones-h2" titulo={t.titulo} subtitulo={t.subtitulo} />
          </div>
        </div>
        <div className="tt__hueco" aria-hidden="true"></div>
        <ol className="sol__lista tt__tapas">
          {soluciones.map((s, i) => (
            <li key={s.id} className="sol__item tt__tapa" style={{ '--i': i } as CSSProperties}>
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
      <TextoTapado raiz="soluciones" />
    </section>
  );
}
