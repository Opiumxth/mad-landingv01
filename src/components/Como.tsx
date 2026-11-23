import { etapas, nota3Semanas, type PaginaCopy } from '../data/paginas';
import './como.css';

export default function Como({ copy }: { copy: PaginaCopy['como'] }) {
  return (
    <section className="seccion tono-claro" id="como-trabajamos">
      <div className="cont">
        <header className="seccion__cab">
          <p className="etiqueta">{copy.etiqueta}</p>
          <h2>{copy.titulo}</h2>
          <p className="lead">{copy.lead}</p>
        </header>
        <ol className="etapas">
          {etapas.map((h) => (
            <li className="etapa" key={h.n}>
              <span className="etapa__n etiqueta">{h.n} · {h.cuando}</span>
              <h3>{h.titulo}</h3>
              <p>{h.texto}</p>
            </li>
          ))}
        </ol>
        <p className="nota">{nota3Semanas}</p>
      </div>
    </section>
  );
}
