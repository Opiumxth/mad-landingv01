import { Fragment, type CSSProperties } from 'react';
import { REVELADO } from './EncabezadoSeccion';
import './encabezado.css';

// Párrafo con el mismo revelado palabra por palabra que los subtítulos del EncabezadoSeccion (mismo rango: empieza con el bloque a ~70 % de la altura de
// la pantalla y termina a ~45 %; gris sin revelar, cobalto en el frente, color de texto del tema al final). El texto sigue siendo un <p> normal con
// las palabras en <span>. Sin soporte de scroll-driven o con movimiento reducido se ve el texto final, sin animar. Usa las clases de encabezado.css.
export default function TextoRevelado({ texto, className = '' }: { texto: string; className?: string }) {
  const ps = texto.split(' ');
  const { inicio, fin, ventana } = REVELADO;
  const paso = (fin - inicio) / (ps.length - 1 + ventana);
  const r2 = (n: number) => +n.toFixed(2);
  return (
    <p className={`enc${className ? ' ' + className : ''}`}>
      {ps.map((p, i) => (
        <Fragment key={i}>
          <span className="enc__p" style={{ '--ini': r2(inicio + i * paso), '--fin': r2(inicio + (i + ventana) * paso) } as CSSProperties}>{p}</span>
          {i < ps.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  );
}
