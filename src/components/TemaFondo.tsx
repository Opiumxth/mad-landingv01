'use client';
import { useEffect } from 'react';

// Cambio de tema de la página (fondo, texto principal y texto suave: variables --tema-* de tokens.css). La página es clara por defecto y pasa a:
//   · OSCURO cuando el bloque del título de "Soluciones" llega a UMBRAL de la altura de la pantalla (contada desde arriba), al bajar;
//   · CLARO otra vez cuando el bloque de texto de "Nosotros" (título, enlace y párrafo) llega a ese mismo umbral.
// Al subir ocurre lo contrario. Se activa con <html data-tema="oscuro">. La transición (~300 ms) la hace el CSS; con movimiento reducido es
// instantánea. Se lee la posición en cada scroll (un IntersectionObserver no avisa si se salta de golpe más allá del bloque, por ejemplo con
// la tecla Fin o al recargar abajo); en cada cuadro solo se leen dos posiciones y se cambia un atributo cuando hace falta. No renderiza nada.
const UMBRAL = 0.7;

export default function TemaFondo() {
  useEffect(() => {
    const entraOscuro = document.querySelector('#soluciones .sol__cabeza');
    const vuelveClaro = document.querySelector('#nosotros .tt__texto'); // puede no existir
    if (!entraOscuro) return;
    const raiz = document.documentElement;
    let pendiente = 0;
    const revisar = () => {
      pendiente = 0;
      const limite = window.innerHeight * UMBRAL;
      const oscuro = entraOscuro.getBoundingClientRect().top <= limite && !(vuelveClaro && vuelveClaro.getBoundingClientRect().top <= limite);
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
