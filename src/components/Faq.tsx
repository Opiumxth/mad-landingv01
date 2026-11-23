import Icono from './Icono';
import type { PaginaCopy } from '../data/paginas';
import './faq.css';

export default function Faq({ copy }: { copy: PaginaCopy['faq'] }) {
  return (
    <section className="seccion tono-claro" id="preguntas">
      <div className="cont faq">
        <header className="seccion__cab">
          <p className="etiqueta">{copy.etiqueta}</p>
          <h2>{copy.titulo}</h2>
        </header>
        <div className="faq__lista">
          {copy.items.map((it) => (
            // Acordeón nativo (<details>): funciona sin JavaScript y con teclado
            <details name="faq" key={it.pregunta}>
              <summary><span>{it.pregunta}</span><Icono nombre="mas" /></summary>
              <div className="faq__resp">
                <p>{it.respuesta}</p>
                {it.enlace && <p><a href={it.enlace.href}>{it.enlace.texto}</a></p>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
