'use client';
import { useEffect } from 'react';

// "Pop" al encajar: cuando una tarjeta llega a su posición sticky y queda pegada, se le pone la clase `is-pop`
// (escala 1 → 1,02 → 1, ver soluciones.css); la clase se quita al soltarse y la tarjeta vuelve a hacerlo al encajar de nuevo.
// Detección con IntersectionObserver: cada tarjeta se observa con una franja de 1 px a la altura de su `top` sticky;
// la tarjeta "llega" cuando su borde superior alcanza esa franja. No renderiza nada. Solo ≥ 900 px y sin movimiento reducido.
export default function SolucionesPop() {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 56.25rem) and (prefers-reduced-motion: no-preference)');
    let observers: IntersectionObserver[] = [];
    const parar = () => { observers.forEach((o) => o.disconnect()); observers = []; document.querySelectorAll('.sol__item.is-pop').forEach((e) => e.classList.remove('is-pop')); };
    const montar = () => {
      parar();
      if (!mq.matches) return;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('#soluciones .sol__item').forEach((li) => {
        const top = Math.round(parseFloat(getComputedStyle(li).top));
        if (!(top >= 0) || top >= vh - 2) return;
        let listo = false; // la primera lectura es el estado inicial (p. ej. al recargar a media sección): no hace pop
        const io = new IntersectionObserver(([e]) => {
          li.classList.toggle('is-pop', e.isIntersecting && listo);
          listo = true;
        }, { rootMargin: `-${top}px 0px -${vh - top - 1}px 0px` });
        io.observe(li);
        observers.push(io);
      });
    };
    montar();
    let t = 0;
    const alCambiar = () => { window.clearTimeout(t); t = window.setTimeout(montar, 150); };
    mq.addEventListener('change', alCambiar);
    window.addEventListener('resize', alCambiar);
    return () => { window.clearTimeout(t); mq.removeEventListener('change', alCambiar); window.removeEventListener('resize', alCambiar); parar(); };
  }, []);
  return null;
}
