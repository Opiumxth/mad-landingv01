// Animación del frame que crece. Se carga con import() dinámico desde DemoFrame (nunca en el primer render).
// GSAP + ScrollTrigger solo leen el scroll y escriben `transform` y `clip-path` (nada de width/height: no hay reflujo).
// Sin Lenis: medido en celular empeoraba el TBT (552 ms con Lenis contra 450 ms sin él) y no aporta nada con el tacto.
// El suavizado lo da `scrub` de ScrollTrigger. Licencia de GSAP: "Standard 'no charge' license" (https://gsap.com/standard-license).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Fracción del recorrido en la que el frame termina de crecer; el resto es "pegado un momento" antes de soltarse.
const CRECE_HASTA = 0.75;
const RADIO_INICIAL = 8; // px en pantalla, igual que --r en el CSS

export async function iniciar(caja: HTMLElement): Promise<() => void> {
  const escena = caja.parentElement as HTMLElement; // .marco__escena (sticky)
  const pista = escena.parentElement as HTMLElement; // .ih__pista (padre del sticky)

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const mm = gsap.matchMedia();
  mm.add(
    // matchMedia ejecuta la función solo si alguna condición se cumple: por eso `escritorio` también está
    { movil: '(max-width: 47.99rem)', escritorio: '(min-width: 48rem)', reducir: '(prefers-reduced-motion: reduce)' },
    (ctx) => {
      const { movil, reducir } = ctx.conditions as { movil: boolean; reducir: boolean };
      if (reducir) return; // sin pin ni animación: el CSS deja el frame en su tamaño final

      // La escala inicial (--a) sale del CSS: 0,34 en escritorio y 0,7 en celular
      const a = parseFloat(getComputedStyle(caja).getPropertyValue('--a')) || (movil ? 0.7 : 0.34);
      // Si la pantalla es alta, el frame final queda centrado más abajo que el pequeño: el tramo sobrante del escenario (--extra)
      const bajar = () => Math.max(0, escena.offsetHeight - caja.offsetHeight);
      // Recorrido: del scroll 0 hasta el momento en que el escenario sticky se suelta (su borde inferior llega al final de la pista).
      const finDelRecorrido = () => {
        const finPista = pista.getBoundingClientRect().bottom + window.scrollY;
        const arriba = parseFloat(getComputedStyle(escena).top) || 0;
        return finPista - arriba - escena.offsetHeight;
      };
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: pista, start: 0, end: finDelRecorrido, scrub: 0.4, invalidateOnRefresh: true },
      });
      // El radio va dividido entre la escala para que en pantalla midan 8 px al inicio y 0 al final.
      tl.fromTo(
        caja,
        { scale: a, y: 0, transformOrigin: '50% 0', clipPath: `inset(0px round ${RADIO_INICIAL / a}px)` },
        { scale: 1, y: bajar, clipPath: 'inset(0px round 0px)', duration: CRECE_HASTA, ease: 'power1.inOut' },
      ).to({}, { duration: 1 - CRECE_HASTA });
    },
  );
  return () => mm.revert();
}
