import EncabezadoSeccion from './EncabezadoSeccion';
import BotonHover from './BotonHover';
import { precioDesde } from '../datos/cta';
import { es } from '../i18n/es';
import './banda-contacto.css';

const t = es.contacto;

// CTA de la home (#contacto), antes del pie: panel ancho de esquinas redondeadas y fondo claro tipo mármol sutil (degradados suaves en CSS, sin imagen).
// Título y subtítulo con el encabezado estandarizado (centrado, con su revelado), un solo botón (BotonHover: mismo diseño y efecto hover que el "Hablemos"
// del hero) hacia /book y una línea discreta con el precio de partida (src/datos/cta.ts, ⚠ sin confirmar). Sin fondo propio en la sección: el panel va
// sobre el tema claro de la página.
export default function BandaContacto() {
  return (
    <section id="contacto" className="con" aria-labelledby="contacto-h2">
      <div className="con__panel">
        <EncabezadoSeccion id="contacto-h2" titulo={t.titulo} subtitulo={t.subtitulo} alinear="centro" />
        <div className="con__accion">
          <BotonHover texto={t.cta.texto} href={t.cta.href} />
          {precioDesde ? <p className="con__precio">{precioDesde}</p> : null}
        </div>
      </div>
    </section>
  );
}
