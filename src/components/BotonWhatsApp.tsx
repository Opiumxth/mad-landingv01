'use client';
import { useEffect, useRef } from 'react';
import Icono from './Icono';
import { enlaceWhatsApp } from '../data/sitio';
import './whatsapp.css';

export default function BotonWhatsApp({ mensaje }: { mensaje: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Se esconde mientras el formulario o el pie están a la vista, para no tapar campos, botones ni enlaces.
  useEffect(() => {
    const wa = ref.current;
    const zonas = document.querySelectorAll('#formulario, .pie');
    if (!wa || !('IntersectionObserver' in window) || !zonas.length) return;
    const visibles = new Set<Element>();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
      wa.classList.toggle('wa--oculto', visibles.size > 0);
    });
    zonas.forEach((z) => io.observe(z));
    return () => io.disconnect();
  }, []);

  return (
    <a ref={ref} className="wa" href={enlaceWhatsApp(mensaje)} aria-label="WhatsApp: escribir a MAD Software Studio" rel="noopener">
      <Icono nombre="chat" tam={26} />
      <span className="wa__txt">WhatsApp</span>
    </a>
  );
}
