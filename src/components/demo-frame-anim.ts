// Animación del frame que crece. Se carga con import() dinámico desde DemoFrame (nunca en el primer render).
// GSAP + ScrollTrigger solo leen el scroll y escriben `transform` y `clip-path` (nada de width/height: no hay reflujo).
// Sin Lenis: medido en celular empeoraba el TBT (552 ms con Lenis contra 450 ms sin él) y no aporta nada con el tacto.
// El suavizado lo da `scrub` de ScrollTrigger. Licencia de GSAP: "Standard 'no charge' license" (https://gsap.com/standard-license).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Fracción del recorrido en la que el frame termina de crecer; el resto es "pegado un momento" antes de soltarse.
const CRECE_HASTA = 0.75;
const RADIO_INICIAL = 8; // px en pantalla, igual que --r en el CSS

export async function iniciar(pista: HTMLElement, caja: HTMLElement): Promise<() => void> {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const mm = gsap.matchMedia();
  mm.add(
    // matchMedia ejecuta la función solo si alguna condición se cumple: por eso `escritorio` también está
    { movil: '(max-width: 47.99rem)', escritorio: '(min-width: 48rem)', reducir: '(prefers-reduced-motion: reduce)' },
    (ctx) => {
      const { movil, reducir } = ctx.conditions as { movil: boolean; reducir: boolean };
      if (reducir) return; // sin pin ni animación: el CSS deja el frame en su tamaño final

      // La escala inicial (--a) sale del CSS: 0,55 en escritorio y 0,85 en celular
      const a = parseFloat(getComputedStyle(caja).getPropertyValue('--a')) || (movil ? 0.85 : 0.55);
      // Recorrido: del scroll 0 (el frame ya asoma bajo el hero) hasta el momento en que el escenario sticky se suelta:
      // cuando el borde inferior de la pista llega al borde inferior del frame ya centrado en pantalla.
      const finDelRecorrido = () => {
        const arriba = pista.getBoundingClientRect().top + window.scrollY;
        return arriba + pista.offsetHeight - (window.innerHeight + caja.offsetHeight) / 2;
      };
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pista,
          start: 0,
          end: finDelRecorrido,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
      // El radio va dividido entre la escala para que en pantalla midan 8 px al inicio y 0 al final.
      tl.fromTo(
        caja,
        { scale: a, clipPath: `inset(0px round ${RADIO_INICIAL / a}px)` },
        { scale: 1, clipPath: 'inset(0px round 0px)', duration: CRECE_HASTA, ease: 'power1.inOut' },
      ).to({}, { duration: 1 - CRECE_HASTA });

    },
  );
  return () => mm.revert();
}
