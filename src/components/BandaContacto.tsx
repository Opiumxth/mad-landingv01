import EncabezadoSeccion from './EncabezadoSeccion';
import BotonHover from './BotonHover';
import { es } from '../i18n/es';
import './banda-contacto.css';

const t = es.contacto;

// CTA de la home (#contacto), antes del pie. Sin panel ni marco: una sección sobre el mismo fondo del resto, con todo alineado a la DERECHA, pegado al borde derecho del
// mismo contenedor que usan las demás secciones. Título y subtítulo con el encabezado estandarizado (mismo tamaño y estilo, y el mismo revelado palabra por palabra
// que el resto), y una fila de dos botones sin borde al final, a la derecha: primario (BotonHover, el mismo diseño y efecto que el "Hablemos" del hero) y secundario
// (blanco, solo una sombra muy suave). Detrás, un arco muy fino de casi nulo contraste. El énfasis en palabras sueltas del subtítulo se quitó: en el encabezado
// estandarizado todas las palabras terminan en el color de texto del tema, así que no se distinguiría.
export default function BandaContacto() {
  return (
    <section id="contacto" className="con" aria-labelledby="contacto-h2">
      {/* Arco decorativo: una curva fina que cruza el fondo detrás del contenido */}
      <svg className="con__arco" viewBox="0 0 1440 640" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M-80 600 C 360 560, 940 330, 1520 30" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="con__caja">
        <EncabezadoSeccion id="contacto-h2" titulo={t.titulo} subtitulo={t.subtitulo} alinear="derecha" />
        <div className="con__botones">
          <BotonHover texto={t.cta.texto} href={t.cta.href} className="con__prim" />
          <a className="btn con__sec" href={t.cta2.href}>{t.cta2.texto}</a>
        </div>
      </div>
    </section>
  );
}
