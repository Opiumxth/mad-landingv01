import EncabezadoSeccion from './EncabezadoSeccion';
import EnlaceTexto from './EnlaceTexto';
import { preguntas } from '../datos/faq';
import { es } from '../i18n/es';
import './preguntas-frecuentes.css';

const t = es.faq;

// Sección "Preguntas frecuentes" (#faq): tema claro, sin franja. Dos columnas: a la izquierda el encabezado estandarizado (H2 + subtítulo con revelado) y
// el enlace de texto; a la derecha el acordeón. Construido desde cero con <details>/<summary> nativos: `name` compartido para que solo una pregunta esté
// abierta a la vez; las respuestas cerradas siguen en el HTML. Referencia solo de layout: "text-reveal-faqs" (Ruixen UI, 21st.dev); su código no se usó.
export default function PreguntasFrecuentes() {
  return (
    <section id="faq" className="faq" aria-labelledby="faq-h2">
      <div className="faq__caja">
        <div className="faq__izq">
          <EncabezadoSeccion id="faq-h2" titulo={t.titulo} subtitulo={t.subtitulo} />
          <EnlaceTexto className="faq__enlace" texto={t.enlace.texto} href={t.enlace.href} />
        </div>
        <div className="faq__lista">
          {preguntas.map((q) => (
            <details key={q.id} className="faq__item" name="faq">
              <summary className="faq__pregunta">
                <span>{q.pregunta}</span>
                <span className="faq__marca" aria-hidden="true"></span>
              </summary>
              <div className="faq__respuesta">
                <p>{q.respuesta}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
