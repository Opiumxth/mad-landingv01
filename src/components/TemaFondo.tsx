'use client';
import { useEffect } from 'react';

// Cambio de tema de la página (fondo, texto principal y texto suave: variables --tema-* de tokens.css). La página es clara por defecto y cambia en estos
// puntos, en orden de aparición. Cada punto es un elemento y la fracción de la altura de la pantalla (contada desde arriba) a la que su borde superior
// dispara el cambio al bajar; al subir ocurre lo contrario:
//   1. Soluciones   → OSCURO cuando el bloque del título llega al 70 %.
//   2. Nosotros     → CLARO  cuando su bloque de texto llega al 70 %.
//   3. Contacto     → OSCURO cuando el bloque del título de la banda llega al 70 %.
//   4. Pie          → CLARO  cuando el pie llega al 40 %: la banda es de ~70 % de la pantalla y, con 70 %, el cambio ocurriría justo cuando la banda está
//                     completa en pantalla; al 40 % su contenido ya se está yendo por arriba y el cambio casi no se ve.
// Se activa con <html data-tema="oscuro">. La transición (~300 ms) la hace el CSS; con movimiento reducido es instantánea. Se lee la posición en cada scroll
// (un IntersectionObserver no avisa si se salta de golpe más allá de un bloque, por ejemplo con la tecla Fin o al recargar abajo); en cada cuadro solo se
// leen unas pocas posiciones y se cambia un atributo cuando hace falta. No renderiza nada.
const PUNTOS: Array<{ selector: string; umbral: number; tema: 'oscuro' | 'claro' }> = [
  { selector: '#soluciones .sol__cabeza', umbral: 0.7, tema: 'oscuro' },
  { selector: '#nosotros .tt__texto', umbral: 0.7, tema: 'claro' },
  { selector: '#contacto .enc', umbral: 0.7, tema: 'oscuro' },
  { selector: 'footer', umbral: 0.4, tema: 'claro' },
];

export default function TemaFondo() {
  useEffect(() => {
    const puntos = PUNTOS.map((p) => ({ ...p, el: document.querySelector(p.selector) })).filter((p): p is typeof p & { el: Element } => !!p.el);
    if (!puntos.length) return;
    const raiz = document.documentElement;
    let pendiente = 0;
    const revisar = () => {
      pendiente = 0;
      const alto = window.innerHeight;
      // El tema es el del último punto (en orden de aparición) que ya llegó a su umbral
      let tema: 'oscuro' | 'claro' = 'claro';
      for (const p of puntos) if (p.el.getBoundingClientRect().top <= alto * p.umbral) tema = p.tema;
      if ((tema === 'oscuro') !== (raiz.getAttribute('data-tema') === 'oscuro')) {
        if (tema === 'oscuro') raiz.setAttribute('data-tema', 'oscuro'); else raiz.removeAttribute('data-tema');
      }
    };
    const pedir = () => { if (!pendiente) pendiente = window.requestAnimationFrame(revisar); };
    revisar();
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir);
    return () => {
      window.removeEventListener('scroll', pedir);
      window.removeEventListener('resize', pedir);
      if (pendiente) window.cancelAnimationFrame(pendiente);
      raiz.removeAttribute('data-tema');
    };
  }, []);
  return null;
}
