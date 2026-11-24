// Animación del frame del hero: crece mientras los textos se desvanecen y se queda grande y pegado un momento (como en la referencia). Se carga con import() dinámico desde DemoFrame (nunca en el primer render).
// GSAP + ScrollTrigger solo leen el scroll y escriben `transform`, `clip-path` y la `opacity` de los textos (nada de width/height/top/left).
// Sin Lenis: medido en celular empeoraba el TBT (552 ms con Lenis contra 450 ms sin él) y no aporta nada con el tacto.
// El suavizado lo da `scrub` de ScrollTrigger. Licencia de GSAP: "Standard 'no charge' license" (https://gsap.com/standard-license).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Reparto del recorrido: el frame crece y los textos se desvanecen en esta fracción; el resto es "pegado un momento" con el frame grande.
const CRECE = 0.7;
const RADIO = 8; // px en pantalla: el mismo redondeo al inicio y con el frame grande (igual que --r en el CSS)
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
      // El radio se compensa con la escala en cada cuadro: siempre mide 8 px en pantalla, al inicio y con el frame grande
      const ajustarRadio = () => { caja.style.clipPath = `inset(0px round ${RADIO / Number(gsap.getProperty(caja, 'scale'))}px)`; };
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: pista, start: 0, end: finDelRecorrido, scrub: 0.4, invalidateOnRefresh: true },
        // Textos invisibles: sin clics (clase en CSS) y sin foco por teclado, pero siguen en el DOM (H1 para SEO y lectores de pantalla)
        onUpdate: () => {
          ajustarRadio();
          const oculto = Number(gsap.getProperty(textos, 'opacity')) < OPACIDAD_OCULTO;
          textos.classList.toggle('ih__in--oculto', oculto);
          if (oculto) boton.setAttribute('tabindex', '-1'); else boton.removeAttribute('tabindex');
        },
      });
      // El frame crece de scale(a) a scale(1) y los textos se desvanecen al mismo ritmo; después se queda grande hasta que el sticky se suelta
      tl.fromTo(caja, { scale: a, y: 0, transformOrigin: '50% 0' }, { scale: 1, y: bajar, duration: CRECE, ease: 'power1.inOut' }, 0)
        .fromTo(textos, { opacity: 1 }, { opacity: 0, duration: CRECE }, 0)
        .to({}, { duration: 1 - CRECE }, CRECE);

      return () => {
        textos.classList.remove('ih__in--oculto');
        boton.removeAttribute('tabindex');
        caja.style.clipPath = '';
      };
    },
  );
  return () => mm.revert();
}
