import EncabezadoSeccion from './EncabezadoSeccion';
import BotonHover from './BotonHover';
import { es } from '../i18n/es';
import './banda-contacto.css';

const t = es.contacto;

// Banda de contacto (#contacto): bloque grande y centrado (alto mínimo ~70 % de la pantalla), sin fondo propio: la página pasa a tema oscuro al llegar
// aquí y vuelve a claro al llegar al pie (ver TemaFondo.tsx). Encabezado estandarizado centrado (H2 + subtítulo con revelado) y, debajo, el botón
// "Hablemos" (BotonHover, el mismo diseño y efecto que el del hero) hacia /book.
export default function BandaContacto() {
  return (
    <section id="contacto" className="con" aria-labelledby="contacto-h2">
      <div className="con__caja">
        <EncabezadoSeccion id="contacto-h2" titulo={t.titulo} subtitulo={t.subtitulo} alinear="centro" />
        <BotonHover texto={t.cta.texto} href={t.cta.href} tono="oscuro" className="con__boton" />
      </div>
    </section>
  );
}
