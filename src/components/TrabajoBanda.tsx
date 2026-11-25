'use client';
/* Banda curva con una tarjeta al centro a la vez ("Nuestro trabajo").
 *
 * Geometría 3D (SLICES, CAMERA, arc(), measure(), franjas, máscara de los extremos, ResizeObserver) portada de
 * "Tilted Grid Hero" de Ruixen (21st.dev, licencia MIT según su página), llevada a CSS plano.
 * Atribución: Ruixen · https://21st.dev/@ruixen.ui/components/tilted-grid-hero
 *
 * Movimiento propio (reemplaza la animación continua del original): un contador de pasos y un solo temporizador.
 * Cada tarjeta ocupa un "puesto" en la curva (0 = centro, +1 = la siguiente a la derecha, …). Al avanzar un paso,
 * todas pasan al puesto anterior con una transición CSS de `transform` (todas a la vez, ease-in-out). La tarjeta que
 * sale por la izquierda salta sin transición al extremo derecho, donde está oculta (visibility), así que la envoltura
 * del bucle ocurre fuera de pantalla. Cada tarjeta es un solo elemento (sus franjas no pueden desfasarse).
 * Solo se anima `transform`; el desvanecido de los extremos es una máscara estática. Sin GSAP ni Lenis. */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Proyecto } from '../datos/trabajo';
import { es } from '../i18n/es';

const t = es.trabajo;

// ---- Parámetros del movimiento ----
const DWELL = 2500; // ms que cada tarjeta queda centrada y quieta
const MOVE = 700; // ms que dura el paso a la siguiente tarjeta
const EASE = [0.65, 0, 0.35, 1] as const; // ease-in-out (cubic-bezier)
const EASE_CSS = `cubic-bezier(${EASE.join(',')})`;
const FADE = 200; // ms del fundido del texto (100 sale + 100 entra), termina cuando la tarjeta llega al centro

// ---- Parámetros de la banda (valores del componente original salvo los marcados) ----
const SLICES = 16; // franjas por tarjeta
// CURVA INVERTIDA: el espectador queda FUERA del cilindro y la fila se curva hacia él por el medio (el centro es lo más cercano y grande; los lados se alejan y
// se achican). Con CAMERA = 1,3 y CURVE = 62° el alto visual en el borde del marco es 1,3 / (1,3 + 1 − cos 62°) ≈ 0,71 del del centro (1,0).
const CAMERA = 1.3; // distancia de la cámara, en radios del cilindro
const MAX_WIDTH = 55; // una tarjeta nunca supera este % del ancho de la banda
// Tamaño de la tarjeta (propio). El alto sigue el ANCHO de la banda para que el arco que abarca cada tarjeta (~14°) no dependa de la pantalla: así bastan
// 8 tarjetas (una por proyecto) y la que da la vuelta siempre queda oculta. Alto = min(55 % de ancho / proporción, max(ANCHO_K % del ancho, ALTO_MIN % del alto)).
const ANCHO_K = 20; // alto de la tarjeta, % del ancho de la banda
const ALTO_MIN = 34; // mínimo, % del alto de la banda (en celular el ancho es pequeño y este valor manda)
const ASPECT = 16 / 9; // ancho / alto de la tarjeta
const GAP = 6; // separación entre tarjetas, % del alto de una tarjeta
const AXIS = 50; // centro vertical de la fila, % del alto (propio: sin contenido encima, el original usa 56)
const CURVE = 62; // grados que se curva la fila hasta el borde del marco (antes 80; menos curvatura también sirve para celular)
const FADE_EDGE = 12; // ancho del desvanecido de cada extremo, % del ancho
const MAX_PRECARGA = 8; // con más imágenes que esto, solo se montan las de las tarjetas cercanas
const UMBRAL = 50; // px que hay que arrastrar para pasar a la tarjeta anterior o siguiente
const RUEDA = 40; // desplazamiento horizontal acumulado de la rueda/trackpad que cuenta como un gesto

const BEND = (Math.min(85, Math.max(5, CURVE)) * Math.PI) / 180;

/** Radio del cilindro (como parte del ancho) que lleva el borde del marco `bend` radianes por el arco, visto con la cámara. Con la curva invertida, la
 *  profundidad del borde es r(1 − cos θ) HACIA ATRÁS, así que la proyección es r·sinθ · CAMERA / (CAMERA + 1 − cosθ) = ancho / 2, resuelta para r. */
function arc(bend: number) {
  return (CAMERA + 1 - Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

/** Coloca el bucle en el cilindro. Devuelve grados: `unit` = arco que abarca el alto de una tarjeta, `pitch` = distancia
 *  entre centros de tarjetas vecinas y `limit` = hasta dónde puede ir el centro de una tarjeta antes de salir por completo. */
function measure(width: number, height: number) {
  const h = Math.min(((MAX_WIDTH / 100) * width) / ASPECT, Math.max((ANCHO_K / 100) * width, (ALTO_MIN / 100) * height));
  const radius = width * arc(BEND);
  if (!(h > 0) || !(radius > 0)) return { unit: 0, pitch: 1, limit: 0 };
  const deg = (rad: number) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const round = (n: number) => +n.toFixed(4);
  return { unit: round(unit), pitch: round((ASPECT + GAP / 100) * unit), limit: round(deg(BEND) + (ASPECT * unit) / 2) };
}

// Curva cúbica de Bézier: dado el avance p (0–1) del movimiento, devuelve la fracción de tiempo en que se alcanza.
function tiempoParaAvance(p: number) {
  const [x1, y1, x2, y2] = EASE;
  const b = (s: number, a: number, c: number) => 3 * (1 - s) * (1 - s) * s * a + 3 * (1 - s) * s * s * c + s * s * s;
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) { const m = (lo + hi) / 2; if (b(m, y1, y2) < p) lo = m; else hi = m; }
  return b((lo + hi) / 2, x1, x2);
}

const mod = (a: number, n: number) => ((a % n) + n) % n;

export default function TrabajoBanda({ proyectos, avisoDemos }: { proyectos: Proyecto[]; avisoDemos: boolean }) {
  const raiz = useRef<HTMLDivElement>(null);
  const banda = useRef<HTMLDivElement>(null);
  const L = proyectos.length;

  const [medida, setMedida] = useState<ReturnType<typeof measure> | null>(null);
  // `paso`: contador de pasos (sin tope, puede bajar); el centro es el proyecto `paso mod L`. `dir`: sentido del último paso (1 = siguiente, -1 = anterior).
  // `tick`: cuenta cada paso (el texto cambia con él).
  const [est, setEst] = useState({ paso: 0, dir: 1, tick: 0 });
  const { paso, dir, tick } = est;
  const [tocando, setTocando] = useState(false); // el usuario está arrastrando o usando la rueda sobre la banda
  const [textoIdx, setTextoIdx] = useState(0); // proyecto que muestra el texto de abajo (cambia con un fundido)
  const [textoOculto, setTextoOculto] = useState(false);
  const [reducido, setReducido] = useState(false);
  const [enVista, setEnVista] = useState(false);
  const [encima, setEncima] = useState(false); // cursor sobre la tarjeta central o la descripción
  const [foco, setFoco] = useState(false); // foco de teclado dentro de la sección
  const [oculta, setOculta] = useState(false); // pestaña no visible

  // Mide la banda. Hasta medirla queda invisible, así un primer pintado con el tamaño equivocado no se ve.
  useEffect(() => {
    const el = banda.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      const sig = measure(width, height);
      setMedida((p) => (p && p.pitch === sig.pitch && p.limit === sig.limit ? p : sig));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Condiciones de pausa
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const alCambiar = () => setReducido(mq.matches);
    alCambiar();
    mq.addEventListener('change', alCambiar);
    const alVer = () => setOculta(document.hidden);
    alVer();
    document.addEventListener('visibilitychange', alVer);
    const io = new IntersectionObserver(([e]) => setEnVista(e.isIntersecting), { threshold: 0.2 });
    if (raiz.current) io.observe(raiz.current);
    return () => { mq.removeEventListener('change', alCambiar); document.removeEventListener('visibilitychange', alVer); io.disconnect(); };
  }, []);

  const corre = enVista && !encima && !foco && !oculta && !reducido && !tocando;

  // Un solo temporizador. `reposo` cuenta solo el tiempo en marcha: al reanudar, la tarjeta completa lo que le faltaba.
  const reposo = useRef(0);
  const desde = useRef(0);
  const manual = useRef(false); // el último paso lo dio el usuario: el temporizador empieza de cero
  useEffect(() => {
    if (manual.current) { reposo.current = 0; manual.current = false; }
    if (!corre) return;
    desde.current = performance.now();
    let disparado = false;
    const id = window.setTimeout(() => { disparado = true; reposo.current = 0; setEst((e) => ({ paso: e.paso + 1, dir: 1, tick: e.tick + 1 })); }, Math.max(0, MOVE + DWELL - reposo.current));
    return () => {
      window.clearTimeout(id);
      // El paso en curso termina aunque se pause (una transición CSS no se detiene), así que cuenta como completo.
      if (!disparado) reposo.current = Math.max(reposo.current + (performance.now() - desde.current), MOVE);
    };
  }, [corre, paso]);

  // El texto cambia con un fundido corto, de modo que termine cuando la tarjeta llega al centro.
  useEffect(() => {
    if (tick === 0) return;
    const a = window.setTimeout(() => setTextoOculto(true), MOVE - FADE);
    const b = window.setTimeout(() => { setTextoIdx(mod(paso, L)); setTextoOculto(false); }, MOVE - FADE / 2);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [tick, paso, L]);

  // ---- Mover a mano: rueda/trackpad en horizontal, arrastre con el ratón y deslizar con el dedo. Cada gesto pasa a la tarjeta anterior o siguiente. ----
  const ultimo = useRef(0);
  const ir = useCallback((d: 1 | -1) => {
    const ahora = performance.now();
    if (ahora - ultimo.current < MOVE * 0.7) return; // no se encadenan pasos a mitad de movimiento
    ultimo.current = ahora;
    manual.current = true;
    setEst((e) => ({ paso: e.paso + d, dir: d, tick: e.tick + 1 }));
  }, []);
  useEffect(() => {
    const el = banda.current;
    if (!el) return;
    // Rueda o trackpad en horizontal (un gesto = un paso; la inercia del trackpad no cuenta de nuevo). El scroll vertical no se toca.
    let acum = 0, bloqueada = false, tr = 0;
    const alRodar = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      setTocando(true);
      window.clearTimeout(tr);
      tr = window.setTimeout(() => { acum = 0; bloqueada = false; setTocando(false); }, 160);
      if (bloqueada) return;
      acum += e.deltaX;
      if (Math.abs(acum) >= RUEDA) { ir(acum > 0 ? 1 : -1); bloqueada = true; acum = 0; }
    };
    // Arrastre con ratón, lápiz o dedo. En táctil el navegador sigue haciendo el scroll vertical (touch-action: pan-y en el CSS).
    let id = -1, x0 = 0, y0 = 0, arrastra = false, hecho = false;
    const alBajar = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      id = e.pointerId; x0 = e.clientX; y0 = e.clientY; arrastra = false; hecho = false;
      setTocando(true);
    };
    const alMover = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      const dx = e.clientX - x0;
      if (!arrastra && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(e.clientY - y0)) {
        arrastra = true;
        try { el.setPointerCapture(id); } catch { /* el puntero ya terminó */ } // así el clic final no entra al enlace de la tarjeta central
      }
      if (arrastra && !hecho && Math.abs(dx) >= UMBRAL) { hecho = true; ir(dx < 0 ? 1 : -1); }
    };
    const alSoltar = (e: PointerEvent) => { if (e.pointerId === id) { id = -1; setTocando(false); } };
    el.addEventListener('wheel', alRodar, { passive: false });
    el.addEventListener('pointerdown', alBajar);
    el.addEventListener('pointermove', alMover);
    el.addEventListener('pointerup', alSoltar);
    el.addEventListener('pointercancel', alSoltar);
    return () => {
      window.clearTimeout(tr);
      el.removeEventListener('wheel', alRodar);
      el.removeEventListener('pointerdown', alBajar);
      el.removeEventListener('pointermove', alMover);
      el.removeEventListener('pointerup', alSoltar);
      el.removeEventListener('pointercancel', alSoltar);
    };
  }, [ir]);

  const alEnfocar = useCallback(() => setFoco(true), []);
  const alDesenfocar = useCallback((e: React.FocusEvent) => { if (!raiz.current?.contains(e.relatedTarget as Node)) setFoco(false); }, []);

  // ---- Geometría ----
  const { unit, pitch, limit } = medida ?? measure(1200, 560);
  // Tarjetas que hacen falta: debe haber al menos un puesto oculto a cada lado. Con ≤ 8 proyectos, una tarjeta por proyecto
  // (cada una conserva su imagen); si faltan, se repite el ciclo completo.
  const visiblesPorLado = Math.floor(limit / pitch); // puestos con |ángulo| ≤ limit
  const minimo = 2 * (visiblesPorLado + 1) + 1;
  const N = L <= MAX_PRECARGA ? (L >= minimo ? L : L * Math.ceil(minimo / L)) : minimo;
  const atras = Math.floor(N / 2); // puestos a la izquierda del centro (el último es el de la envoltura)

  const u = (n: number) => `calc(${+n.toFixed(4)} * min(${+(MAX_WIDTH / ASPECT).toFixed(4)}cqw, max(${ANCHO_K}cqw, ${ALTO_MIN}cqh)))`;
  const r = 100 * arc(BEND);
  const radio = `${+r.toFixed(3)}cqw`;
  // Eje del cilindro DETRÁS del plano de la pantalla: sale, gira y vuelve. Con ángulo positivo el punto va a la derecha y hacia atrás.
  const girar = (deg: number) => `translateZ(-${radio}) rotateY(${+deg.toFixed(4)}deg) translateZ(${radio})`;
  const share = ASPECT / SLICES;
  const mascara = `linear-gradient(90deg,transparent,#000 ${FADE_EDGE}%,#000 ${100 - FADE_EDGE}%,transparent)`;
  const esVisible = (puesto: number) => Math.abs(puesto) * pitch <= limit;
  const puestoDe = (i: number, p: number) => mod(i - p + atras, N) - atras;

  const activo = proyectos[mod(paso, L)];
  const mostrado = proyectos[textoIdx];
  const href = t.ruta(activo.slug);

  return (
    <div
      ref={raiz}
      className="tb"
      onFocus={alEnfocar}
      onBlur={alDesenfocar}
    >
      <div ref={banda} className="tb__banda" aria-hidden="true">
        <div
          className="tb__escena"
          style={{
            opacity: medida ? 1 : 0,
            perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
            perspectiveOrigin: `50% ${AXIS}%`,
            maskImage: mascara,
            WebkitMaskImage: mascara,
          }}
        >
          {Array.from({ length: N }, (_, i) => {
            const puesto = puestoDe(i, paso);
            // envoltura (sin transición): al avanzar, la tarjeta que sale por la izquierda pasa al extremo derecho; al retroceder, al revés
            const salto = dir > 0 ? puestoDe(i, paso - 1) === -atras && puesto === N - 1 - atras : puestoDe(i, paso + 1) === N - 1 - atras && puesto === -atras;
            const visible = esVisible(puesto);
            // La visibilidad cambia justo cuando el centro de la tarjeta cruza `limit` durante el paso: ni antes (se vería desaparecer
            // una tarjeta aún en pantalla) ni después (tras la cámara se proyecta enorme).
            const viene = puestoDe(i, paso - dir);
            const cruza = !salto && visible !== esVisible(viene);
            const espera = cruza ? Math.round(tiempoParaAvance(Math.abs(limit - Math.abs(viene) * pitch) / pitch) * MOVE) : 0;
            const cerca = L <= MAX_PRECARGA || Math.abs(puesto) <= visiblesPorLado + 2;
            const p = proyectos[mod(paso + puesto, L)];
            return (
              <div
                key={i}
                className="tb__tarjeta"
                style={{
                  left: `calc(50% - ${u(ASPECT / 2)})`,
                  top: `calc(${AXIS}% - ${u(0.5)})`,
                  width: u(ASPECT),
                  height: u(1),
                  transform: girar(puesto * pitch), // puesto positivo = a la derecha (ángulo positivo)
                  visibility: visible ? 'visible' : 'hidden',
                  transition: salto ? 'none' : `transform ${MOVE}ms ${EASE_CSS}, visibility 0s linear ${espera}ms`,
                }}
              >
                {Array.from({ length: SLICES }, (_, k) => (
                  <div
                    key={k}
                    className={'tb__franja' + (k === 0 ? ' tb__franja--ini' : '') + (k === SLICES - 1 ? ' tb__franja--fin' : '')}
                    style={{
                      left: u((ASPECT - share) / 2),
                      // dos píxeles más ancha que su parte para que no se abra una línea entre franjas; la última no tiene vecina
                      width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 2px)`,
                      height: u(1),
                      transform: girar(-(ASPECT / 2 - (k + 0.5) * share) * unit), // la franja 0 es la de la izquierda (ángulo negativo)
                    }}
                  >
                    {cerca ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imagen} alt="" draggable={false} decoding="async" style={{ left: u(-k * share), width: u(ASPECT), height: u(1) }} />
                    ) : null}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Solo la tarjeta central es clicable (con el ratón). Teclado y lector de pantalla usan el enlace de abajo. */}
        <a
          className="tb__central"
          href={href}
          tabIndex={-1}
          style={{ left: `calc(50% - ${u(ASPECT / 2)})`, top: `calc(${AXIS}% - ${u(0.5)})`, width: u(ASPECT), height: u(1) }}
          draggable={false}
          onPointerEnter={() => setEncima(true)}
          onPointerLeave={() => setEncima(false)}
        />
      </div>

      <div className="tb__pie">
        <div
          className={'tb__texto' + (textoOculto ? ' tb__texto--oculto' : '')}
          aria-live="polite"
          aria-atomic="true"
          onPointerEnter={() => setEncima(true)}
          onPointerLeave={() => setEncima(false)}
        >
          <a href={t.ruta(mostrado.slug)}>
            <strong>{mostrado.nombre}</strong>
            <span>{mostrado.descripcion}</span>
          </a>
        </div>
        <a className="tb__mas" href={t.verMas.href}>{t.verMas.texto}</a>
        {avisoDemos ? <p className="tb__aviso">{t.avisoDemos}</p> : null}
      </div>
    </div>
  );
}
