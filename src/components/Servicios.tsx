// Servicios típicos del rubro (solo páginas de rubro). El contenido sale de src/data/rubros/<rubro>.ts
import type { PaginaCopy } from '../data/paginas';
import './servicios.css';

export default function Servicios({ copy }: { copy: NonNullable<PaginaCopy['servicios']> }) {
  return (
    <section className="seccion tono-claro" id="servicios">
      <div className="cont">
        <header className="seccion__cab">
          <p className="etiqueta">{copy.etiqueta}</p>
          <h2>{copy.titulo}</h2>
          <p className="lead">{copy.lead}</p>
        </header>
        <ul className="serv">
          {copy.items.map((i) => (
            <li className="serv__item" key={i.nombre}>
              <h3>{i.nombre}</h3>
              <p>{i.detalle}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
