import { Fragment, type CSSProperties } from 'react';
import './encabezado.css';

// Encabezado de sección reutilizable (H2 + subtítulo) con revelado palabra por palabra con el scroll: cada palabra va en su <span>
// dentro del mismo h2 / p (el texto sigue siendo normal para buscadores y lectores de pantalla). Los tres encabezados de la home
// (Nuestro trabajo, Soluciones, Cómo trabajamos) lo usan, con el mismo tamaño y el mismo revelado.
//
// REVELADO (CSS scroll-driven, ver encabezado.css): medido desde que el borde superior del bloque entra por abajo de la pantalla
// (rango "cover" de su view-timeline), en unidades de alto de pantalla (svh). El bloque está a ~70 % de la altura de la pantalla cuando
// lleva 100 − 70 = 30 svh de recorrido, y a ~45 % cuando lleva 55 svh. Cada palabra ocupa una ventana de VENTANA pasos y las ventanas se
// solapan: en el frente del revelado hay dos o tres palabras en cobalto; las anteriores ya están en el color del tema y las siguientes en gris.
// En el HTML solo viaja el índice de cada palabra (--k) y el paso del bloque (--rp); el CSS calcula el rango de cada palabra (más liviano que dos números por palabra:
// el documento queda por debajo del primer envío TCP). Los valores inicio (30) y ventana (2,5) están repetidos en encabezado.css.
export const REVELADO = { inicio: 100 - 70, fin: 100 - 45, ventana: 2.5 };

interface Props {
  id: string; // id del h2 (la sección lo usa en aria-labelledby)
  titulo: string;
  subtitulo?: string; // opcional (Nosotros usa un párrafo propio en su lugar)
  alinear?: 'izquierda' | 'centro' | 'derecha';
}

const palabras = (t: string) => t.split(' ');
const r2 = (n: number) => +n.toFixed(2);

export default function EncabezadoSeccion({ id, titulo, subtitulo, alinear = 'izquierda' }: Props) {
  const pt = palabras(titulo);
  const ps = subtitulo ? palabras(subtitulo) : [];
  const { inicio, fin, ventana } = REVELADO;
  const paso = (fin - inicio) / (pt.length + ps.length - 1 + ventana);
  const span = (p: string, k: number, ultima: boolean) => (
    <Fragment key={k}>
      <span className="enc__p" style={{ '--k': k } as CSSProperties}>{p}</span>
      {ultima ? null : ' '}
    </Fragment>
  );
  return (
    <div className={'enc' + (alinear === 'centro' ? ' enc--centro' : alinear === 'derecha' ? ' enc--der' : '')} style={{ '--rp': r2(paso) } as CSSProperties}>
      <h2 id={id} className="enc__titulo">{pt.map((p, i) => span(p, i, i === pt.length - 1))}</h2>
      {ps.length ? <p className="enc__sub">{ps.map((p, i) => span(p, pt.length + i, i === ps.length - 1))}</p> : null}
    </div>
  );
}
