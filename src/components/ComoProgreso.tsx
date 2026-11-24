'use client';
import { useEffect } from 'react';

// Progreso de "Cómo trabajamos". No usa estado de React: escribe directamente en el DOM.
// · Escritorio (≥ 900 px) con movimiento: un listener pasivo de scroll, limitado a un cuadro con requestAnimationFrame, calcula el progreso
//   del scroll de la pista (0 a 1) y lo escribe en la variable CSS --p; el CSS reparte --p entre los pasos (barras con transform).
//   El paso activo (floor(p × pasos)) solo se aplica cuando cambia: clase `is-on` en los pasos y capas alcanzados.
// · Celular (< 900 px) con movimiento: cada paso se enciende al llegar a la mitad de la pantalla (IntersectionObserver + scrollend,
//   y se recalcula todo desde las posiciones, así un salto de scroll no deja pasos sin actualizar).
// · Movimiento reducido (o sin JS): no se hace nada; el CSS deja los 5 pasos encendidos con la barra llena y sin sticky.
export default function ComoProgreso() {
  useEffect(() => {
    const sec = document.getElementById('como-trabajamos');
    const pista = sec?.querySelector<HTMLElement>('.como__pista');
    if (!sec || !pista) return;
    const pasos = [...sec.querySelectorAll<HTMLElement>('.como__paso')];
    const capas = [...sec.querySelectorAll<HTMLElement>('.como__capa')];
    const n = pasos.length;
    const mqMov = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const mqEsc = window.matchMedia('(min-width: 56.25rem)');
    let limpiar = () => {};

    const marcar = (hasta: (i: number) => boolean) => {
      pasos.forEach((li, i) => li.classList.toggle('is-on', hasta(i)));
      capas.forEach((c, i) => c.classList.toggle('is-on', hasta(i)));
    };

    const montar = () => {
      limpiar();
      limpiar = () => {};
      sec.classList.remove('como--vivo');
      pista.style.removeProperty('--p');
      if (!mqMov.matches) return; // movimiento reducido: todo encendido (CSS)
      sec.classList.add('como--vivo');

      if (mqEsc.matches) {
        let actual = -1, pendiente = 0;
        const calcular = () => {
          pendiente = 0;
          const r = pista.getBoundingClientRect();
          const recorrido = r.height - window.innerHeight;
          const p = recorrido > 0 ? Math.min(1, Math.max(0, -r.top / recorrido)) : 0;
          pista.style.setProperty('--p', p.toFixed(4));
          const paso = Math.min(n - 1, Math.floor(p * n));
          if (paso !== actual) { actual = paso; marcar((i) => i <= paso); }
        };
        const pedir = () => { if (!pendiente) pendiente = window.requestAnimationFrame(calcular); };
        calcular();
        window.addEventListener('scroll', pedir, { passive: true });
        window.addEventListener('resize', pedir);
        limpiar = () => { window.removeEventListener('scroll', pedir); window.removeEventListener('resize', pedir); if (pendiente) window.cancelAnimationFrame(pendiente); };
      } else {
        const evaluar = () => { const mitad = window.innerHeight / 2; marcar((i) => pasos[i].getBoundingClientRect().top <= mitad); };
        evaluar();
        const io = new IntersectionObserver(evaluar, { rootMargin: '-50% 0px -50% 0px' });
        pasos.forEach((li) => io.observe(li));
        window.addEventListener('scrollend', evaluar);
        window.addEventListener('resize', evaluar);
        limpiar = () => { io.disconnect(); window.removeEventListener('scrollend', evaluar); window.removeEventListener('resize', evaluar); };
      }
    };

    montar();
    mqMov.addEventListener('change', montar);
    mqEsc.addEventListener('change', montar);
    return () => { limpiar(); mqMov.removeEventListener('change', montar); mqEsc.removeEventListener('change', montar); sec.classList.remove('como--vivo'); pista.style.removeProperty('--p'); };
  }, []);
  return null;
}
