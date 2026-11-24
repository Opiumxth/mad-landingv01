// Animación del frame del hero en dos fases (crece y se achica) y desvanecimiento de los textos. Se carga con import() dinámico desde DemoFrame (nunca en el primer render).
// GSAP + ScrollTrigger solo leen el scroll y escriben `transform`, `clip-path` y la `opacity` de los textos (nada de width/height/top/left).
// Sin Lenis: medido en celular empeoraba el TBT (552 ms con Lenis contra 450 ms sin él) y no aporta nada con el tacto.
// El suavizado lo da `scrub` de ScrollTrigger. Licencia de GSAP: "Standard 'no charge' license" (https://gsap.com/standard-license).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Reparto del recorrido: la fase 1 (crece + textos se desvanecen) ocupa esta fracción; el resto es la fase 2 (el frame se achica).
const FASE_1 = 0.55;
const RADIO_INICIAL = 8; // px en pantalla, igual que --r en el CSS
// Por debajo de esta opacidad los textos cuentan como invisibles: el botón deja de recibir clics y foco
const OPACIDAD_OCULTO = 0.3;

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
      // Recorrido: del scroll 0 hasta el momento en que el escenario sticky se suelta. El sticky se rige por la caja CON margen del
      // escenario (el margen inferior es negativo): se suelta cuando esa caja llega al final de la pista.
      const finDelRecorrido = () => {
        const finPista = pista.getBoundingClientRect().bottom + window.scrollY;
        const arriba = parseFloat(getComputedStyle(escena).top) || 0;
        const cajaConMargen = escena.offsetHeight + (parseFloat(getComputedStyle(escena).marginBottom) || 0);
        return finPista - cajaConMargen - arriba;
      };
      const textos = pista.querySelector<HTMLElement>('.ih__in')!;
      const boton = textos.querySelector<HTMLElement>('a')!;
      const radio = (esc: number) => `inset(0px round ${RADIO_INICIAL / esc}px)`;
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: pista, start: 0, end: finDelRecorrido, scrub: 0.4, invalidateOnRefresh: true },
        // Textos invisibles: sin clics (clase en CSS) y sin foco por teclado, pero siguen en el DOM (H1 para SEO y lectores de pantalla)
        onUpdate: () => {
          const oculto = Number(gsap.getProperty(textos, 'opacity')) < OPACIDAD_OCULTO;
          textos.classList.toggle('ih__in--oculto', oculto);
          if (oculto) boton.setAttribute('tabindex', '-1'); else boton.removeAttribute('tabindex');
        },
      });
      // Fase 1: el frame crece (el radio va dividido entre la escala: 8 px en pantalla al inicio, 0 al final) y los textos se desvanecen
      tl.fromTo(
        caja,
        { scale: a, y: 0, transformOrigin: '50% 0', clipPath: radio(a) },
        { scale: 1, y: bajar, clipPath: 'inset(0px round 0px)', duration: FASE_1, ease: 'power1.inOut' },
        0,
      )
        .fromTo(textos, { opacity: 1 }, { opacity: 0, duration: FASE_1 }, 0)
        // Fase 2: el frame vuelve a su tamaño inicial, solo achicándose (sin tocar su opacidad); los textos no reaparecen
        .fromTo(
          caja,
          { scale: 1, y: bajar, clipPath: 'inset(0px round 0px)' },
          { scale: a, y: 0, clipPath: radio(a), duration: 1 - FASE_1, ease: 'power1.inOut', immediateRender: false }, // sin esto pintaría el frame grande al cargar
          FASE_1,
        );

      return () => {
        textos.classList.remove('ih__in--oculto');
        boton.removeAttribute('tabindex');
      };
    },
  );
  return () => mm.revert();
}
