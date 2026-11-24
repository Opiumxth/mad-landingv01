'use client';
import { useEffect } from 'react';

// Cambio de tema de la página (fondo, texto principal y texto suave: variables --tema-* de tokens.css).
// Al bajar, cuando el borde superior del bloque del título de "Soluciones" llega a UMBRAL de la altura de la pantalla (contada desde arriba),
// la página pasa a oscuro (<html data-tema="oscuro">); al subir, vuelve a claro. La transición (~300 ms) la hace el CSS; con movimiento
// reducido es instantánea. Se lee la posición en cada scroll (un IntersectionObserver no avisa si se salta de golpe más allá del bloque,
// por ejemplo con la tecla Fin o al recargar abajo). No renderiza nada.
const UMBRAL = 0.7;

export default function TemaFondo() {
  useEffect(() => {
    const el = document.querySelector('#soluciones .sol__cabeza');
    if (!el) return;
    const raiz = document.documentElement;
    let pendiente = 0;
    const revisar = () => {
      pendiente = 0;
      const oscuro = el.getBoundingClientRect().top <= window.innerHeight * UMBRAL;
      if (oscuro !== (raiz.getAttribute('data-tema') === 'oscuro')) {
        if (oscuro) raiz.setAttribute('data-tema', 'oscuro'); else raiz.removeAttribute('data-tema');
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
