import { desde, mostrarPrecios, planes } from '../data/precios';
import type { PaginaCopy } from '../data/paginas';
import './precios.css';

export default function Precios({ copy, completo }: { copy: PaginaCopy['precios']; completo: boolean }) {
  if (!mostrarPrecios) return null;
  if (completo) {
    return (
      <section className="seccion tono-claro" id="precios">
        <div className="cont">
          <header className="seccion__cab">
            <p className="etiqueta">{copy.etiqueta}</p>
            <h2>{copy.titulo}</h2>
            <p className="lead">{copy.lead}</p>
          </header>
          <div className="planes">
            {planes.map((p) => (
              <article className="plan" key={p.id}>
                <p className="etiqueta plan__nombre">Plan {p.id} · {p.nombre}</p>
                <p className="plan__precio" aria-label={`Precio del plan ${p.nombre}`}>{p.precio}</p>
                <p className="plan__desc">{p.resumen}</p>
                <ul className="plan__lista">{p.incluye.map((i) => <li key={i}>{i}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  // Home: una banda compacta de una línea (la comparación completa vive en la página del rubro)
  return (
    <section className="banda tono-claro" id="precios" aria-label="Precios">
      <div className="cont banda__fila">
        <p className="etiqueta banda__etq">Precios</p>
        <p className="banda__monto">Desde <strong>{desde}</strong></p>
        <a className="banda__enlace" href="/salones#precios">Ver planes y precios <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
