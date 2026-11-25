import { Fragment, type CSSProperties } from 'react';
import { REVELADO } from './EncabezadoSeccion';
import './encabezado.css';

// Párrafo con el mismo revelado palabra por palabra que los subtítulos del EncabezadoSeccion (mismo rango: empieza con el bloque a ~70 % de la altura de
// la pantalla y termina a ~45 %; gris sin revelar, cobalto en el frente, color de texto del tema al final). El texto sigue siendo un <p> normal con
// las palabras en <span>. Sin soporte de scroll-driven o con movimiento reducido se ve el texto final, sin animar. Usa las clases de encabezado.css.
// `negrita`: frase del texto (p. ej. un nombre de marca) que se muestra en Bold; sus palabras se revelan igual que las demás.
export default function TextoRevelado({ texto, negrita, className = '' }: { texto: string; negrita?: string; className?: string }) {
  const ps = texto.split(' ');
  const nb = negrita ? negrita.split(' ') : [];
  const sinPunto = (w: string) => w.replace(/[.,;:!?¿¡]+$/, '');
  const ib = nb.length ? ps.findIndex((_, i) => nb.every((w, k) => sinPunto(ps[i + k] ?? '') === w)) : -1;
  const { inicio, fin, ventana } = REVELADO;
  const paso = (fin - inicio) / (ps.length - 1 + ventana);
  const r2 = (n: number) => +n.toFixed(2);
  return (
    <p className={`enc${className ? ' ' + className : ''}`} style={{ '--rp': r2(paso) } as CSSProperties}>
      {ps.map((p, i) => (
        <Fragment key={i}>
          <span className={ib >= 0 && i >= ib && i < ib + nb.length ? 'enc__p enc__p--b' : 'enc__p'} style={{ '--k': i } as CSSProperties}>{p}</span>
          {i < ps.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  );
}
