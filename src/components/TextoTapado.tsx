'use client';
import { useEffect } from 'react';

// Isla del efecto "texto quieto + tapas que lo cubren" (ver texto-tapado.css). No renderiza nada. Sin estado de React.
// · Mide el alto real del texto quieto (.tt__texto) y lo escribe en --tt-h del contenedor (el CSS lo usa para el hueco y para el tramo final);
//   se vuelve a medir si el texto cambia de tamaño.
// · "Pop" al encajar: cuando una tapa llega a su posición pegada se le pone la clase `is-pop` (escala 1 → 1,02 → 1); se quita al soltarse y la
//   tapa vuelve a hacerlo al encajar de nuevo. Detección con IntersectionObserver: cada tapa se observa con una franja de 1 px a la altura de su
//   `top` sticky; "llega" cuando su borde superior alcanza esa franja. La primera lectura es el estado inicial y no hace pop.
// Solo ≥ 900 px y sin movimiento reducido (el pop); la medida se hace siempre.
export default function TextoTapado({ raiz }: { raiz: string }) {
  useEffect(() => {
    const cont = document.querySelector<HTMLElement>(`#${raiz} .tt`);
    const texto = cont?.querySelector<HTMLElement>('.tt__texto');
    if (!cont || !texto) return;
    const mq = window.matchMedia('(min-width: 56.25rem) and (prefers-reduced-motion: no-preference)');
    let observers: IntersectionObserver[] = [];
    const parar = () => { observers.forEach((o) => o.disconnect()); observers = []; cont.querySelectorAll('.tt__tapa.is-pop').forEach((e) => e.classList.remove('is-pop')); };
    const montar = () => {
      parar();
      cont.style.setProperty('--tt-h', `${texto.offsetHeight}px`);
      if (!mq.matches) return;
      const vh = window.innerHeight;
      cont.querySelectorAll<HTMLElement>('.tt__tapa').forEach((tapa) => {
        const top = Math.round(parseFloat(getComputedStyle(tapa).top));
        if (!(top >= 0) || top >= vh - 2) return;
        let listo = false;
        const io = new IntersectionObserver(([e]) => {
          tapa.classList.toggle('is-pop', e.isIntersecting && listo);
          listo = true;
        }, { rootMargin: `-${top}px 0px -${vh - top - 1}px 0px` });
        io.observe(tapa);
        observers.push(io);
      });
    };
    montar();
    let t = 0;
    const alCambiar = () => { window.clearTimeout(t); t = window.setTimeout(montar, 150); };
    mq.addEventListener('change', alCambiar);
    window.addEventListener('resize', alCambiar);
    const ro = new ResizeObserver(alCambiar);
    ro.observe(texto);
    return () => { ro.disconnect(); window.clearTimeout(t); mq.removeEventListener('change', alCambiar); window.removeEventListener('resize', alCambiar); parar(); };
  }, [raiz]);
  return null;
}
