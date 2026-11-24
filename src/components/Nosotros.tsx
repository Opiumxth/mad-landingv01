import type { CSSProperties } from 'react';
import TextoTapado from './TextoTapado';
import EncabezadoSeccion from './EncabezadoSeccion';
import BotonHover from './BotonHover';
import { imagenNosotros } from '../datos/nosotros';
import { es } from '../i18n/es';
import './texto-tapado.css';
import './nosotros.css';

const t = es.nosotros;

// Sección "Nosotros" (#nosotros): sin fondo propio (tema oscuro de la página). Arriba, dos columnas: a la izquierda el H2 y el botón "Conócenos",
// alineados a la derecha de su columna; a la derecha, el párrafo. Abajo, una imagen ancha y baja. Con el efecto "texto quieto + tapas que lo
// cubren" (texto-tapado.css): el bloque de texto se queda quieto, la imagen sube y lo cubre por completo, y al final todo sale junto.
// El botón es el enlace principal; la imagen también es clicable hacia el mismo destino, pero es redundante (tabindex -1, aria-hidden).
export default function Nosotros() {
  return (
    <section id="nosotros" className="nos" aria-labelledby="nosotros-h2">
      <div className="nos__caja tt">
        <div className="tt__guia">
          <div className="tt__texto nos__texto">
            <div className="nos__izq">
              <EncabezadoSeccion id="nosotros-h2" titulo={t.titulo} alinear="derecha" />
              <BotonHover texto={t.cta.texto} href={t.cta.href} tono="oscuro" />
            </div>
            <p className="nos__parrafo">{t.parrafo}</p>
          </div>
        </div>
        <div className="tt__hueco" aria-hidden="true"></div>
        <div className="tt__tapas">
          <a className="tt__tapa nos__imagen" href={t.cta.href} tabIndex={-1} aria-hidden="true" style={{ '--i': 0 } as CSSProperties}>
            {imagenNosotros.imagen ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={imagenNosotros.imagen} alt={imagenNosotros.alt} decoding="async" /> : <span className="nos__ph"></span>}
          </a>
        </div>
      </div>
      <TextoTapado raiz="nosotros" />
    </section>
  );
}
