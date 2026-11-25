'use client';
import { useEffect, useRef, type ReactNode } from 'react';

/* Campo de cuadritos "de calor" para la parte alta del pie de la home.
 *
 * Basado en el HeatField de "Kiln Pixel Heat Hero" (Clevision, 21st.dev; su página indica "License: mit", sin enlace a un repositorio ni a un archivo LICENSE).
 * Portado a TypeScript + canvas + CSS plano, sin motion, cn ni lucide, y SIN la palabra que se desliza, los textos, la barra, las ventanas ni las fuentes de Google.
 * Qué se conserva: grilla de cuadritos coloreados por ruido de valor con varias octavas (heatClouds), focos de calor que vagan, estela del cursor y brocha
 * "fantasma" cuando el cursor está quieto (siempre en táctil), onda circular al hacer clic, borde irregular ("gotas"), render por ImageData en un canvas pequeño
 * escalado, costuras de 1 px vaciadas para que se vea la cuadrícula tenue de fondo (CSS), IntersectionObserver, ResizeObserver, pausa con la pestaña oculta,
 * tope de DPR 2 y 30 fps.
 * Qué cambia:
 *  · VOLTEADO: el campo está anclado ABAJO del bloque; su borde irregular sube hacia ARRIBA (silueta de edificios) y abajo termina recto. La aparición sube
 *    desde abajo y empieza cuando el pie entra en pantalla (no al cargar la página).
 *  · COLORES: rampa de azules de la marca (tintes claros a medios de #0B4DB5); los focos y la estela suben un escalón hacia el más intenso.
 *  · HALO: alrededor de la "mad" (texto HTML que va encima) el calor baja, para que sus letras negras se lean sobre cuadritos muy claros o vacíos.
 *  · Con movimiento reducido se dibuja UN solo cuadro fijo, sin animación. Sin estado de React por cuadro.
 */

// ---- Parámetros (los marcados ⚠ son propuestas para ajustar viéndolo) ----
const RAMPA = ['#D5E1F8', '#B3C8F2', '#8CAAE8', '#5B86DD', '#2F63C9']; // ⚠ de más claro a más intenso
const UMBRALES = [0.3, 0.44, 0.6, 0.76, 0.9]; // por debajo del primero, la celda queda vacía
const CELDA = { escritorio: 10, movil: 12 }; // px de cada cuadrito
const COSTURA = 1; // px de la línea entre cuadritos (se vacía para ver la cuadrícula de fondo)
const FPS = 30;
const CAMPO = {
  velocidad: 1, // qué tan rápido deriva el calor
  nube: 300, // px: tamaño de una nube de calor
  calidez: 0.42, // calor de reposo de las nubes
  contraste: 0.9,
  techoNubes: 0.72, // lo más caliente que llegan las nubes solas (sin pasar al penúltimo azul)
  cuerpo: 0.1, // calor extra hacia abajo (campo más denso abajo, más huecos arriba)
  grano: 0.05,
  parpadeo: 1.2, // veces por segundo que se reordena el grano y el borde deshilachado
  subida: 1.4, // segundos que tarda el campo en subir a su sitio
};
const BORDE = { gota: 160, gotaMovil: 100, anchoGota: 4, velocidad: 1 }; // alto de la zona irregular (px) y ancho de cada "edificio" (en cuadritos)
const FOCOS = { cuantos: 2, tamano: 160, fuerza: 0.36, velocidad: 1 };
const CURSOR = { tamano: 96, fuerza: 0.45, fantasma: 0.24, enfria: 0.972, ondaAlcance: 340, ondaTiempo: 1.1, quietoDespues: 2.5 };
const HALO = { fuerza: 0.6, rx: 0.7, ry: 0.6 }; // reducción de calor alrededor de la "mad"; radios como parte del ancho / alto del texto

// Valor repetible 0–1 para una celda entera: el mismo cuadrito recibe el mismo grano en un mismo latido
const hash2 = (x: number, y: number, semilla: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7 + semilla * 74.7) * 43758.5453;
  return n - Math.floor(n);
};
const suave = (t: number) => t * t * (3 - 2 * t);
// Ruido de valor: esquinas de la retícula con hash, mezcladas con smoothstep, así las celdas vecinas comparten calor
const ruido2 = (x: number, y: number, semilla: number) => {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = suave(x - ix), fy = suave(y - iy);
  const a = hash2(ix, iy, semilla), b = hash2(ix + 1, iy, semilla), c = hash2(ix, iy + 1, semilla), d = hash2(ix + 1, iy + 1, semilla);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
};
// Tres octavas de ruido, cada una derivando a su modo, tras una deformación suave del dominio para que las nubes se curven en vez de deslizarse
const nubesDeCalor = (x: number, y: number, t: number, semilla: number) => {
  const wx = x + (ruido2(x * 0.45 + t * 0.06, y * 0.45, semilla + 3) - 0.5) * 1.3;
  const wy = y + (ruido2(x * 0.45, y * 0.45 - t * 0.05, semilla + 7) - 0.5) * 1.3;
  const a = ruido2(wx + t * 0.11, wy - t * 0.07, semilla);
  const b = ruido2(wx * 2.1 - t * 0.17, wy * 2.1 + t * 0.09, semilla + 11);
  const c = ruido2(wx * 4.3 + t * 0.23, wy * 4.3 + t * 0.19, semilla + 19);
  return a * 0.58 + b * 0.29 + c * 0.13;
};
// '#rrggbb' como una palabra RGBA little-endian, el formato que espera la vista Uint32 de ImageData
const empaca = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return ((255 << 24) | ((n & 255) << 16) | (((n >> 8) & 255) << 8) | ((n >> 16) & 255)) >>> 0;
};
const salida = (t: number) => 1 - Math.pow(1 - t, 3);

interface Onda { x: number; y: number; edad: number } // y = distancia desde el borde inferior del campo

export default function CampoPixeles({ children }: { children?: ReactNode }) {
  const bloque = useRef<HTMLDivElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const panel = bloque.current;
    const canvas = lienzo.current;
    const ctx = canvas?.getContext('2d');
    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d');
    if (!panel || !canvas || !ctx || !offCtx) return;

    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const punteroFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const paleta = RAMPA.map(empaca);
    const semilla = Math.random() * 100;

    let celda: number = CELDA.escritorio;
    let ancho = 0, alto = 0, cols = 0, filas = 0, gridX = 0, gridY = 0;
    let calor = new Float32Array(0); // indexado por fila CONTADA DESDE ABAJO (rf = 0 es la fila de abajo)
    let imagen: ImageData | null = null;
    let pixeles = new Uint32Array(0);
    let gotaPx: number = BORDE.gota;
    // Halo alrededor de la "mad", en celdas (x desde la rejilla, y desde abajo)
    let halo = { cx: -99, cy: -99, rx: 1, ry: 1 };

    const nivel = { calor: 0, tacto: 1, vel: 1 };
    let tiempo = semilla;
    let tSubida = reducir ? CAMPO.subida : 0;
    let ultimo = 0, pendiente = 0, raf = 0, corriendo = false, enPantalla = false;
    let punteroX = -1, punteroY = -1, ultimoMovimiento = -Infinity, fantasmaX = -1, fantasmaY = -1;
    const ondas: Onda[] = [];

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      celda = window.matchMedia('(max-width: 639px)').matches ? CELDA.movil : CELDA.escritorio;
      ancho = panel.clientWidth;
      alto = panel.clientHeight;
      canvas.width = Math.round(ancho * dpr);
      canvas.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      const nCols = Math.ceil(ancho / celda);
      const nFilas = Math.ceil(alto / celda);
      gridX = Math.round((ancho - nCols * celda) / 2); // columnas cortadas por los bordes: iguales y casi enteras
      gridY = alto - nFilas * celda; // la rejilla está anclada abajo (<= 0)
      panel.style.setProperty('--pi-celda', `${celda}px`);
      panel.style.setProperty('--pi-grid-x', `${gridX}px`);
      panel.style.setProperty('--pi-grid-y', `${gridY}px`);
      if (nCols !== cols || nFilas !== filas) {
        cols = nCols; filas = nFilas;
        off.width = cols; off.height = filas;
        imagen = offCtx.createImageData(cols, filas);
        pixeles = new Uint32Array(imagen.data.buffer);
        calor = new Float32Array(cols * filas);
      }
      gotaPx = Math.min(ancho < 640 ? BORDE.gotaMovil : BORDE.gota, alto * 0.4);
      // Halo de la "mad": elipse sobre su caja (la tinta ocupa ~el 64 % del alto de la caja, algo por encima de su centro)
      const mad = panel.querySelector<HTMLElement>('.pi__mad');
      if (mad) {
        const r = mad.getBoundingClientRect(), p = panel.getBoundingClientRect();
        halo = {
          cx: (r.left - p.left + r.width / 2 - gridX) / celda,
          cy: (p.bottom - (r.top + r.height * 0.425)) / celda,
          rx: Math.max(1, (r.width * HALO.rx) / celda),
          ry: Math.max(1, (r.height * HALO.ry) / celda),
        };
      }
    };

    // Una mancha redonda de calor (px del panel; y desde abajo) que sube las celdas a su nivel, para que una brocha que se queda no hierva
    const deposita = (x: number, y: number, cantidad: number, radio: number) => {
      const cx = (x - gridX) / celda, cy = y / celda, r = radio / celda;
      const inv = 1 / (2 * (r * 0.5) * (r * 0.5));
      const c0 = Math.max(0, Math.floor(cx - r)), c1 = Math.min(cols - 1, Math.ceil(cx + r));
      const f0 = Math.max(0, Math.floor(cy - r)), f1 = Math.min(filas - 1, Math.ceil(cy + r));
      for (let f = f0; f <= f1; f++) {
        for (let c = c0; c <= c1; c++) {
          const dx = c + 0.5 - cx, dy = f + 0.5 - cy;
          const w = Math.exp(-(dx * dx + dy * dy) * inv);
          if (w < 0.02) continue;
          const i = f * cols + c;
          calor[i] = Math.max(calor[i], cantidad * w);
        }
      }
    };
    // Manchas a lo largo de un segmento: un movimiento rápido deja una estela continua en vez de puntos separados
    const trazo = (x0: number, y0: number, x1: number, y1: number, cantidad: number) => {
      const pasos = Math.max(1, Math.min(40, Math.round(Math.hypot(x1 - x0, y1 - y0) / (celda * 0.8))));
      for (let s = 1; s <= pasos; s++) {
        const f = s / pasos;
        deposita(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, cantidad, CURSOR.tamano);
      }
    };

    const dibuja = () => {
      if (!imagen) return;
      const subida = salida(Math.min(1, tSubida / CAMPO.subida));
      const piso = alto * subida; // altura (desde abajo) hasta la que llega el campo: crece con la aparición
      const zonaTop = piso - gotaPx;
      const unidad = CAMPO.nube / celda;
      const latido = Math.floor(tiempo * CAMPO.parpadeo);
      const latidoBorde = Math.floor(tiempo * CAMPO.parpadeo * 0.5);
      const focoR = FOCOS.tamano / celda;
      const focoInv = 1 / (2 * focoR * focoR * 0.25);
      const focos: number[] = [];
      for (let f = 0; f < FOCOS.cuantos; f++) {
        const s = FOCOS.velocidad;
        focos.push(
          (ancho / celda) * (0.5 + 0.42 * Math.sin(tiempo * 0.13 * s * (1 + f * 0.37) + f * 2.1)),
          (alto / celda) * (0.36 + 0.24 * Math.sin(tiempo * 0.11 * s * (1 + f * 0.23) + f * 1.3 + 1)),
        );
      }
      // Autoexposición: una muestra gruesa de las nubes las recentra en CAMPO.calidez, así cualquier semilla o momento se mezcla igual
      const filasCampo = Math.max(1, alto / celda);
      let muestra = 0;
      for (let sy = 0; sy < 8; sy++) for (let sx = 0; sx < 16; sx++) muestra += nubesDeCalor(((sx + 0.5) / 16) * (cols / unidad), ((sy + 0.5) / 8) * (filasCampo / unidad), tiempo, semilla);
      const centro = muestra / 128;

      for (let rf = 0; rf < filas; rf++) {
        const y = (rf + 0.5) * celda;
        const fila = filas - 1 - rf; // fila en la imagen (0 = arriba)
        const base = fila * cols;
        if (y > piso) { pixeles.fill(0, base, base + cols); continue; }
        const enZona = y > zonaTop;
        const profundidad = enZona ? (y - zonaTop) / gotaPx : 0; // 0 abajo de la zona, 1 en el borde de arriba
        const cuerpo = CAMPO.cuerpo * (1 - y / Math.max(piso, 1));
        for (let c = 0; c < cols; c++) {
          const i = rf * cols + c;
          let h = Math.min(CAMPO.techoNubes, (nubesDeCalor(c / unidad, rf / unidad, tiempo, semilla) - centro) * CAMPO.contraste + CAMPO.calidez);
          for (let f = 0; f < focos.length; f += 2) {
            const dx = c - focos[f], dy = rf - focos[f + 1];
            h += FOCOS.fuerza * nivel.tacto * Math.exp(-(dx * dx + dy * dy) * focoInv);
          }
          h += cuerpo + calor[i] + nivel.calor + (hash2(c, rf, semilla + latido) - 0.5) * CAMPO.grano * 2;
          // Halo: baja el calor alrededor de la "mad" para que sus letras se lean
          const hx = (c + 0.5 - halo.cx) / halo.rx, hy = (rf + 0.5 - halo.cy) / halo.ry;
          const d = Math.sqrt(hx * hx + hy * hy);
          if (d < 1.25) h -= HALO.fuerza * (d < 0.8 ? 1 : 1 - suave((d - 0.8) / 0.45));
          if (enZona) {
            // Borde irregular que sube hacia arriba: "edificios" de ancho BORDE.anchoGota
            const grupo = Math.floor(c / BORDE.anchoGota);
            const ooze = ruido2(grupo * 0.9 + semilla, tiempo * 0.12 * BORDE.velocidad, semilla + 31);
            const alcance = 0.1 + 0.95 * ooze * ooze + calor[i] * 0.6;
            const deshilache = hash2(c, rf, semilla + 41 + latidoBorde) * 0.2;
            if (profundidad > alcance - deshilache) { pixeles[base + c] = 0; continue; }
            h -= profundidad * 0.12;
          }
          if (h < UMBRALES[0]) { pixeles[base + c] = 0; continue; }
          let banda = UMBRALES.length - 1;
          while (banda > 0 && h < UMBRALES[banda]) banda--;
          pixeles[base + c] = paleta[banda];
        }
      }

      offCtx.putImageData(imagen, 0, 0);
      ctx.clearRect(0, 0, ancho, alto);
      ctx.drawImage(off, gridX, gridY, cols * celda, filas * celda);
      // Las costuras entre cuadritos se vacían para que se vea la cuadrícula tenue de fondo (CSS)
      for (let c = 1; c <= cols; c++) ctx.clearRect(gridX + c * celda - COSTURA, 0, COSTURA, alto);
      for (let f = 1; f <= filas; f++) ctx.clearRect(0, gridY + f * celda - COSTURA, ancho, COSTURA);
    };

    const paso = (dt: number) => {
      tiempo += dt * CAMPO.velocidad * nivel.vel;
      tSubida += dt;
      const mantiene = Math.pow(CURSOR.enfria, dt * 60);
      for (let i = 0; i < calor.length; i++) calor[i] *= mantiene;
      const quieto = !punteroFino || performance.now() - ultimoMovimiento > CURSOR.quietoDespues * 1000;
      if (quieto) {
        const objX = ancho * (0.5 + 0.4 * Math.sin(tiempo * 0.31));
        const objY = alto * (0.42 + 0.3 * Math.sin(tiempo * 0.47 + 1));
        if (fantasmaX < 0) { fantasmaX = punteroX >= 0 ? punteroX : objX; fantasmaY = punteroY >= 0 ? punteroY : objY; }
        const sigue = 1 - Math.exp(-dt * 1.2);
        const sigX = fantasmaX + (objX - fantasmaX) * sigue, sigY = fantasmaY + (objY - fantasmaY) * sigue;
        trazo(fantasmaX, fantasmaY, sigX, sigY, Math.min(0.6, CURSOR.fantasma * nivel.tacto));
        fantasmaX = sigX; fantasmaY = sigY;
      } else fantasmaX = -1;
      for (let w = ondas.length - 1; w >= 0; w--) {
        const onda = ondas[w];
        onda.edad += dt;
        const p = onda.edad / CURSOR.ondaTiempo;
        if (p >= 1) { ondas.splice(w, 1); continue; }
        const radio = CURSOR.ondaAlcance * nivel.tacto * salida(p);
        const puntos = Math.max(8, Math.ceil((2 * Math.PI * radio) / (celda * 1.4)));
        for (let d = 0; d < puntos; d++) {
          const a = (d / puntos) * Math.PI * 2;
          deposita(onda.x + Math.cos(a) * radio, onda.y + Math.sin(a) * radio, 0.5 * (1 - p), celda * 2.2);
        }
      }
    };

    const cuadro = (ahora: number) => {
      raf = requestAnimationFrame(cuadro);
      const dt = Math.min(0.1, (ahora - ultimo) / 1000);
      ultimo = ahora;
      pendiente += dt;
      if (pendiente < 1 / FPS) return;
      paso(Math.min(pendiente, 0.25));
      pendiente = 0;
      dibuja();
    };
    const arranca = () => { if (corriendo) return; corriendo = true; ultimo = performance.now(); raf = requestAnimationFrame(cuadro); };
    const para = () => { corriendo = false; cancelAnimationFrame(raf); };
    // Con movimiento reducido no hay bucle: un solo cuadro fijo
    const sincroniza = () => { if (!reducir && enPantalla && !document.hidden) arranca(); else para(); };

    const alMover = (e: PointerEvent) => {
      if (!punteroFino || !corriendo) return;
      const r = panel.getBoundingClientRect();
      const x = e.clientX - r.left, y = r.bottom - e.clientY;
      const fuerza = Math.min(0.7, CURSOR.fuerza * nivel.tacto);
      if (punteroX >= 0 && performance.now() - ultimoMovimiento < 120) trazo(punteroX, punteroY, x, y, fuerza);
      else deposita(x, y, fuerza, CURSOR.tamano);
      punteroX = x; punteroY = y; ultimoMovimiento = performance.now();
    };
    const alBajar = (e: PointerEvent) => {
      if (!corriendo || (e.target as HTMLElement).closest('a, button')) return;
      const r = panel.getBoundingClientRect();
      ondas.push({ x: e.clientX - r.left, y: r.bottom - e.clientY, edad: 0 });
    };
    // Cambiar el tamaño de un canvas lo borra: se dibuja un cuadro nuevo enseguida
    const alRedimensionar = () => { medir(); dibuja(); };

    const ro = new ResizeObserver(alRedimensionar);
    // La aparición empieza cuando el pie entra en pantalla, no al cargar la página
    const io = new IntersectionObserver(([e]) => { enPantalla = e.isIntersecting; sincroniza(); }, { threshold: 0.15 });

    medir();
    dibuja();
    ro.observe(panel);
    io.observe(panel);
    document.fonts?.ready.then(alRedimensionar);
    panel.addEventListener('pointermove', alMover, { passive: true });
    panel.addEventListener('pointerdown', alBajar, { passive: true });
    document.addEventListener('visibilitychange', sincroniza);

    return () => {
      para();
      ro.disconnect();
      io.disconnect();
      panel.removeEventListener('pointermove', alMover);
      panel.removeEventListener('pointerdown', alBajar);
      document.removeEventListener('visibilitychange', sincroniza);
    };
  }, []);

  return (
    <div ref={bloque} className="pi__campo">
      <canvas ref={lienzo} className="pi__lienzo" aria-hidden="true" />
      {children}
    </div>
  );
}
