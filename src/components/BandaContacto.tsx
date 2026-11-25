import EncabezadoSeccion from './EncabezadoSeccion';
import BotonHover from './BotonHover';
import { es } from '../i18n/es';
import './banda-contacto.css';

const t = es.contacto;

// CTA de la home (#contacto), antes del pie. Sin panel ni marco: una sección sobre el mismo fondo del resto, con todo alineado a la DERECHA, pegado al borde derecho del
// mismo contenedor que usan las demás secciones. Título y subtítulo con el encabezado estandarizado (mismo tamaño y estilo, y el mismo revelado palabra por palabra
// que el resto), y una fila de dos botones sin borde al final, a la derecha: primario (BotonHover, el mismo diseño y efecto que el "Hablemos" del hero) y secundario
// (blanco, solo una sombra muy suave). El énfasis en palabras sueltas del subtítulo se quitó: en el encabezado
// estandarizado todas las palabras terminan en el color de texto del tema, así que no se distinguiría.
export default function BandaContacto() {
  return (
    <section id="contacto" className="con" aria-labelledby="contacto-h2">
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
