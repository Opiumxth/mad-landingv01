'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { IMG } from '../imagenes';
import { SITIO } from '../data/sitio';
import './cabecera.css';

interface Enlace { texto: string; href: string }

export default function Cabecera({ enlaces = [], contacto = true }: { enlaces?: Enlace[]; contacto?: boolean }) {
  const conMenu = enlaces.length > 0;
  const [abierto, setAbierto] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const primeraApertura = useRef(true);

  const cerrar = useCallback((devolverFoco = true) => {
    setAbierto(false);
    if (devolverFoco) burger.current?.focus();
  }, []);

  // Al abrir, el foco pasa al primer enlace del panel.
  useEffect(() => {
    if (primeraApertura.current) { primeraApertura.current = false; return; }
    if (abierto) panel.current?.querySelector<HTMLElement>('a')?.focus();
  }, [abierto]);

  // Menú móvil accesible: Escape, foco atrapado mientras está abierto, cierra al hacer clic fuera o al ensanchar la pantalla.
  useEffect(() => {
    if (!abierto) return;
    const items = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('a') ?? []);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); cerrar(); return; }
      if (e.key === 'Tab') {
        const ciclo = [burger.current!, ...items()];
        const i = ciclo.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        const sig = e.shiftKey ? (i <= 0 ? ciclo.length - 1 : i - 1) : (i === ciclo.length - 1 ? 0 : i + 1);
        ciclo[sig].focus();
      }
    };
    const onClick = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('.cab')) cerrar(false); };
    const mq = window.matchMedia('(min-width: 56rem)');
    const onMq = (m: MediaQueryListEvent) => { if (m.matches) cerrar(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      mq.removeEventListener('change', onMq);
    };
  }, [abierto, cerrar]);

  return (
    <header className="cab tono-oscuro">
      <div className="cont cab__fila">
        <a className="cab__logo" href="/" aria-label={`${SITIO.nombre}, inicio`}>
          <Image src={IMG.logo.src} alt="" width={40} height={40} loading="eager" />
          <span className="marca">{SITIO.nombre}</span>
        </a>

        {conMenu && (
          <>
            <nav className="cab__nav" aria-label="Principal">
              <ul>{enlaces.map((e) => <li key={e.href}><a href={e.href}>{e.texto}</a></li>)}</ul>
            </nav>
            {contacto && <a className="btn btn--borde cab__cta" href="#formulario">Contacto</a>}

            <button
              ref={burger}
              type="button"
              className="cab__burger"
              aria-expanded={abierto}
              aria-controls="menu-movil"
              aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => (abierto ? cerrar() : setAbierto(true))}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
                <path className="b-arriba" d="M4 7h16" /><path className="b-medio" d="M4 12h16" /><path className="b-abajo" d="M4 17h16" />
              </svg>
            </button>
            <div id="menu-movil" ref={panel} className="cab__panel" hidden={!abierto} onClick={(e) => { if ((e.target as HTMLElement).closest('a')) cerrar(false); }}>
              <ul className="cont">
                {enlaces.map((e) => <li key={e.href}><a href={e.href}>{e.texto}</a></li>)}
                {contacto && <li><a className="btn btn--borde" href="#formulario">Contacto</a></li>}
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
