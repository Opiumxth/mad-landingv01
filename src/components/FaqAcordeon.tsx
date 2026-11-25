'use client';
import { useEffect } from 'react';

// Apertura y cierre suaves del acordeón de preguntas frecuentes, sobre los <details>/<summary> nativos y sin CSS experimental ni librerías.
// Técnica: Web Animations API. Se intercepta el clic en el <summary> (Enter y Espacio también lo generan, así que el teclado sigue funcionando) y se anima el
// alto del <details> (de su alto actual al del contenido, o al revés al cerrar) ~350 ms con ease-out; el texto de la respuesta hace un fundido de opacity
// (~250 ms, con un pequeño retraso al abrir). El atributo `open` se pone al inicio al abrir y se quita al final al cerrar. El indicador (más → menos) lo
// mueve el CSS con la misma duración y curva a partir del atributo open / data-cerrando, así va sincronizado.
// · Una pregunta abierta a la vez: el `name` del HTML (que funciona sin JS) se quita aquí, porque el navegador cerraría la anterior de golpe; al abrir una
//   pregunta, la otra se cierra con animación al mismo tiempo.
// · Clics rápidos: cada clic cancela la animación en curso y arranca otra desde el alto (y la opacidad) que tenía en ese instante, hacia el estado contrario:
//   se invierte sin saltos.
// · Con movimiento reducido el cambio es inmediato (sin animación). El contenido sigue en el HTML con las respuestas cerradas y el summary sigue siendo
//   enfocable con teclado.
// No renderiza nada.
const DURACION = 350;
const CURVA = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
const FUNDIDO = 250;
const RETRASO = 100;

interface Item { abierto: () => boolean; ir: (abrir: boolean, animar: boolean) => void; }

export default function FaqAcordeon() {
  useEffect(() => {
    const detalles = [...document.querySelectorAll<HTMLDetailsElement>('#faq details')];
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nombres = detalles.map((d) => d.getAttribute('name'));
    const items: Item[] = [];
    const limpiezas: Array<() => void> = [];

    detalles.forEach((el) => {
      const resumen = el.querySelector('summary');
      const resp = el.querySelector<HTMLElement>('.faq__respuesta');
      if (!resumen || !resp || typeof el.animate !== 'function') return;
      el.removeAttribute('name');
      let anim: Animation | null = null;
      let fundido: Animation | null = null;
      let abierto = el.open;
      const bordes = () => el.offsetHeight - el.clientHeight;

      const limpiar = () => {
        anim?.cancel(); fundido?.cancel(); anim = null; fundido = null;
        el.style.overflow = ''; el.removeAttribute('data-cerrando');
      };

      const ir = (abrir: boolean, animar: boolean) => {
        abierto = abrir;
        // Estado actual (a mitad de una animación también): de aquí parte la nueva, así no hay saltos
        const desde = el.offsetHeight;
        const opDesde = el.open ? parseFloat(getComputedStyle(resp).opacity) : 0; // cerrada: la respuesta parte de transparente
        anim?.cancel(); fundido?.cancel(); anim = null; fundido = null;
        if (!animar) { el.open = abrir; limpiar(); return; }
        if (abrir) { el.open = true; el.removeAttribute('data-cerrando'); } else { el.setAttribute('data-cerrando', ''); }
        // Alto de destino: al abrir, el natural (sin animación en curso, con open puesto); al cerrar, solo el summary
        const hasta = abrir ? el.offsetHeight : resumen.offsetHeight + bordes();
        el.style.overflow = 'hidden';
        const mia = el.animate({ height: [`${desde}px`, `${hasta}px`] }, { duration: DURACION, easing: CURVA });
        anim = mia;
        mia.onfinish = () => { if (anim !== mia) return; if (!abrir) el.open = false; limpiar(); };
        fundido = resp.animate(
          { opacity: abrir ? [opDesde, 1] : [opDesde, 0] },
          abrir ? { duration: FUNDIDO, delay: RETRASO, easing: 'ease-out', fill: 'backwards' } : { duration: 200, easing: 'ease-in', fill: 'forwards' },
        );
      };

      const item: Item = { abierto: () => abierto, ir };
      items.push(item);

      const alClic = (e: Event) => {
        e.preventDefault();
        const animar = !mq.matches;
        if (!abierto) items.forEach((o) => { if (o !== item && o.abierto()) o.ir(false, animar); });
        ir(!abierto, animar);
      };
      resumen.addEventListener('click', alClic);
      limpiezas.push(() => { resumen.removeEventListener('click', alClic); limpiar(); });
    });

    return () => {
      limpiezas.forEach((f) => f());
      detalles.forEach((d, i) => { if (nombres[i]) d.setAttribute('name', nombres[i] as string); });
    };
  }, []);
  return null;
}
