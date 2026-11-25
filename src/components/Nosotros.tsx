import type { CSSProperties } from 'react';
import TextoTapado from './TextoTapado';
import EncabezadoSeccion from './EncabezadoSeccion';
import EnlaceTexto from './EnlaceTexto';
import TextoRevelado from './TextoRevelado';
import { imagenesNosotros } from '../datos/nosotros';
import { es } from '../i18n/es';
import './texto-tapado.css';
import './nosotros.css';

const t = es.nosotros;

// Sección "Nosotros" (#nosotros): sin fondo propio; la página vuelve al tema claro al llegar aquí (ver TemaFondo.tsx). Arriba, dos columnas: a la izquierda el
// H2 y el enlace de texto "Conócenos" (no es un CTA), alineados a la derecha de su columna; a la derecha, el párrafo, con revelado palabra por palabra. Abajo, un grid bento de 4 imágenes. Con el efecto "texto quieto + tapas que lo
// cubren" (texto-tapado.css): el bloque de texto se queda quieto, el bento sube y lo cubre por completo, y al final todo sale junto.
// El enlace de texto es el principal; el bento también es clicable hacia el mismo destino, pero es redundante (tabindex -1, aria-hidden).
export default function Nosotros() {
  return (
    <section id="nosotros" className="nos" aria-labelledby="nosotros-h2">
      <div className="nos__caja tt">
        <div className="tt__guia">
          <div className="tt__texto nos__texto">
            <div className="nos__izq">
              <EncabezadoSeccion id="nosotros-h2" titulo={t.titulo} alinear="derecha" />
              <EnlaceTexto texto={t.cta.texto} href={t.cta.href} flecha />
            </div>
            <TextoRevelado texto={t.parrafo} negrita={t.marca} className="nos__parrafo" />
          </div>
        </div>
        <div className="tt__hueco" aria-hidden="true"></div>
        <div className="tt__tapas">
          {/* Grid bento: todo el bento es UN solo enlace (más simple que cuatro enlaces iguales), redundante con el enlace de texto: tabindex -1 y aria-hidden */}
          <a className="tt__tapa nos__bento" href={t.cta.href} tabIndex={-1} aria-hidden="true" style={{ '--i': 0 } as CSSProperties}>
            {imagenesNosotros.map((im, i) => (
              <span key={i} className={`nos__tile nos__tile--${i + 1}`}>
                {im.imagen ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={im.imagen} alt={im.alt} decoding="async" /> : <span className="nos__ph"></span>}
              </span>
            ))}
          </a>
        </div>
      </div>
      <TextoTapado raiz="nosotros" />
    </section>
  );
}
