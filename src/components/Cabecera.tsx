'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import LogoMad from './LogoMad';
import { IMG } from '../imagenes';
import { es } from '../i18n/es';
import './cabecera.css';

const t = es.cabecera;
const ZONA_HOVER = 100; // px desde el borde superior de la pantalla en que reaparece con el cursor
const UMBRAL_SCROLL = 50; // px de scroll a partir de los cuales el header se oculta
const RETARDO_OCULTAR = 300; // ms que espera antes de ocultarse al alejar el cursor

// Cabecera con la fila FIJA arriba (flota sobre el contenido, sin caja), una banda de difuminado progresivo detrás y aparición solo con el mouse al bajar
// (ver cabecera.css), tres zonas: emblema a la izquierda | "mad" cursivo al centro | enlaces a la derecha.
// Celular (< 768 px): emblema | mad | botón de menú; el panel tiene los mismos tres enlaces.
export default function Cabecera() {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const primeraVez = useRef(true);
  const panel = useRef<HTMLDivElement>(null);
  const raiz = useRef<HTMLElement>(null);

  const cerrar = useCallback((devolverFoco: boolean) => {
    setAbierto(false);
    if (devolverFoco) boton.current?.focus();
  }, []);

  // Al abrir, el foco pasa al primer enlace del panel.
  useEffect(() => {
    if (primeraVez.current) { primeraVez.current = false; return; }
    if (abierto) panel.current?.querySelector<HTMLElement>('a')?.focus();
  }, [abierto]);

  // Mientras está abierto: Escape cierra y devuelve el foco al botón; un clic fuera o ensanchar la pantalla también lo cierran.
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.preventDefault(); cerrar(true); } };
    const alHacerClic = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('.cab')) cerrar(false); };
    const mq = window.matchMedia('(min-width: 48rem)');
    const alCambiar = (m: MediaQueryListEvent) => { if (m.matches) cerrar(false); };
    document.addEventListener('keydown', alTeclear);
    document.addEventListener('click', alHacerClic);
    mq.addEventListener('change', alCambiar);
    return () => {
      document.removeEventListener('keydown', alTeclear);
      document.removeEventListener('click', alHacerClic);
      mq.removeEventListener('change', alCambiar);
    };
  }, [abierto, cerrar]);

  // Visibilidad del header (clase `cab--oculta`) y hover de la banda (clase `cab--cerca`), sin estado de React: solo se tocan las clases cuando cambian.
  //  · Con scroll < UMBRAL_SCROLL (arriba del todo) se ve siempre. Más abajo se oculta, salvo que:
  //  · con puntero: el cursor esté a < ZONA_HOVER px del borde superior (o dentro del header); al alejarlo, se oculta tras RETARDO ms (evita parpadeos);
  //  · en celular (sin puntero): se muestra al subir el scroll y se oculta al bajar.
  //  El foco de teclado y el menú abierto lo mantienen visible por CSS. Listener de scroll pasivo limitado a un cuadro con requestAnimationFrame.
  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const conPuntero = window.matchMedia('(hover: hover)').matches;
    let cerca = false, oculta = false, ultimoY = window.scrollY, pendiente = 0, temporizador = 0;
    const ocultar = (v: boolean) => { if (v !== oculta) { oculta = v; el.classList.toggle('cab--oculta', v); } };
    const calcular = () => {
      pendiente = 0;
      const y = window.scrollY;
      if (y < UMBRAL_SCROLL) ocultar(false);
      else if (conPuntero) ocultar(!cerca);
      else { const d = y - ultimoY; if (d > 4) ocultar(true); else if (d < -4) ocultar(false); }
      ultimoY = y;
    };
    const pedir = () => { if (!pendiente) pendiente = window.requestAnimationFrame(calcular); };
    const marcarCerca = (v: boolean) => {
      if (v) { window.clearTimeout(temporizador); temporizador = 0; if (!cerca) { cerca = true; el.classList.add('cab--cerca'); pedir(); } }
      else if (cerca && !temporizador) temporizador = window.setTimeout(() => { temporizador = 0; cerca = false; el.classList.remove('cab--cerca'); pedir(); }, RETARDO_OCULTAR);
    };
    const alMover = (e: PointerEvent) => marcarCerca(e.clientY < ZONA_HOVER);
    const alSalir = () => marcarCerca(false);
    calcular();
    window.addEventListener('scroll', pedir, { passive: true });
    if (conPuntero) {
      document.addEventListener('pointermove', alMover, { passive: true });
      document.documentElement.addEventListener('mouseleave', alSalir);
    }
    return () => {
      window.removeEventListener('scroll', pedir);
      document.removeEventListener('pointermove', alMover);
      document.documentElement.removeEventListener('mouseleave', alSalir);
      window.clearTimeout(temporizador);
      if (pendiente) window.cancelAnimationFrame(pendiente);
    };
  }, []);

  return (
    <header className="cab" ref={raiz}>
      {/* Banda de difuminado progresivo (decorativa): cinco capas con backdrop-filter creciente y un velo del color de fondo del tema */}
      <div className="cab__bruma" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
      <div className="cab__fila">
        <a className="cab__emblema" href="/" aria-label={t.logoEtiqueta}>
          <Image src={IMG.logoNegro.src} alt="" width={48} height={48} loading="eager" />
        </a>

        {/* El nombre "mad" al centro: decorativo y sin segundo enlace (el emblema ya lleva al inicio) */}
        <LogoMad className="cab__mad" />

        <div className="cab__der">
          <nav className="cab__nav" aria-label={t.navEtiqueta}>
            <ul>{t.enlaces.map((e) => <li key={e.href}><a href={e.href}>{e.texto}</a></li>)}</ul>
          </nav>

          <button
            ref={boton}
            type="button"
            className="cab__menu"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? t.cerrarMenu : t.abrirMenu}
            onClick={() => (abierto ? cerrar(false) : setAbierto(true))}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
              <path className="m-arriba" d="M4 7h16" /><path className="m-medio" d="M4 12h16" /><path className="m-abajo" d="M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <div id="menu-movil" ref={panel} className="cab__panel" hidden={!abierto} onClick={(e) => { if ((e.target as HTMLElement).closest('a')) cerrar(false); }}>
        <ul className="cab__lista">
          {t.enlaces.map((e) => <li key={e.href}><a href={e.href}>{e.texto}</a></li>)}
        </ul>
      </div>
    </header>
  );
}
