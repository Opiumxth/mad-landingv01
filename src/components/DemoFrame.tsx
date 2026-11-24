'use client';
import { useEffect, useRef } from 'react';
import './demo-frame.css';

interface Props {
  src?: string; // video (.mp4, .webm) o imagen; sin src se ve un rectángulo cobalto de relleno
  poster?: string; // solo para video
  alt?: string; // descripción accesible; sin ella el frame es decorativo (aria-hidden)
}

const esVideo = (s: string) => /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(s);

// Frame 16:9 que crece al bajar. Mejora progresiva:
//  - sin JavaScript, con prefers-reduced-motion o si falla la carga de las librerías, el CSS lo deja en su tamaño final (sin pin);
//  - GSAP y ScrollTrigger se importan de forma dinámica cuando el navegador está libre o en la primera interacción.
export default function DemoFrame({ src, poster, alt }: Props) {
  const pista = useRef<HTMLDivElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducir.matches) return;
    let cancelado = false;
    let iniciado = false;
    let limpiar: (() => void) | undefined;
    const eventos = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;

    const iniciar = () => {
      if (iniciado) return;
      iniciado = true;
      detener();
      import('./demo-frame-anim')
        .then((m) => m.iniciar(pista.current!, caja.current!))
        .then((f) => { if (cancelado) f(); else limpiar = f; })
        .catch(() => { /* sin librerías: el frame queda como en el CSS */ });
    };
    const conIdle = typeof window.requestIdleCallback === 'function';
    const id = conIdle ? window.requestIdleCallback(iniciar, { timeout: 2500 }) : window.setTimeout(iniciar, 1200);
    const detener = () => {
      eventos.forEach((e) => window.removeEventListener(e, iniciar));
      if (conIdle) window.cancelIdleCallback(id); else window.clearTimeout(id);
    };
    eventos.forEach((e) => window.addEventListener(e, iniciar, { once: true, passive: true }));

    return () => { cancelado = true; detener(); limpiar?.(); };
  }, []);

  // Video: se reproduce solo mientras se ve (sin audio, en bucle); con movimiento reducido se queda en el póster.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className="marco">
      <div ref={pista} className="marco__pista">
        <div className="marco__escena">
          <div ref={caja} className="marco__caja" aria-hidden={alt ? undefined : true} role={alt ? 'img' : undefined} aria-label={alt}>
            {src && esVideo(src) && <video ref={video} src={src} poster={poster} muted playsInline loop preload="none" />}
            {src && !esVideo(src) && <img src={src} alt="" width={1920} height={1080} loading="lazy" decoding="async" />}
          </div>
        </div>
      </div>
    </div>
  );
}
