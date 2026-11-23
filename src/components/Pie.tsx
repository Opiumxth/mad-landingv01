import Image from 'next/image';
import { IMG } from '../imagenes';
import { REDES, SITIO, enlaceWhatsApp } from '../data/sitio';
import './pie.css';

export default function Pie({ whatsappMensaje }: { whatsappMensaje: string }) {
  return (
    <footer className="pie tono-suave">
      <div className="cont pie__fila">
        <div className="pie__marca">
          <span className="pie__logo"><Image src={IMG.logo.src} alt="" width={40} height={40} loading="lazy" /></span>
          <p>
            <span className="marca">{SITIO.nombre}</span><br />
            <span className="pie__suave">© {SITIO.anio} · [TODO: razón social y RUC del titular]</span>
          </p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="pie__links">
            <li><a href={SITIO.instagramUrl} rel="noopener">Instagram {REDES[0].texto}</a></li>
            <li><a href={enlaceWhatsApp(whatsappMensaje)} rel="noopener">WhatsApp {SITIO.whatsappVisible}</a></li>
            <li><a href="/privacidad">Política de privacidad</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
