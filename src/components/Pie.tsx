import { REDES, SITIO, enlaceWhatsApp } from '../data/sitio';
import './pie.css';

// Pie: arriba, nombre + qué hacemos + enlaces + contacto; en el centro, "mad" gigante en Jane Austen (solo local); abajo, © y "Volver arriba".
export default function Pie({ whatsappMensaje }: { whatsappMensaje: string }) {
  return (
    <footer className="pie tono-oscuro">
      <div className="cont pie__sup">
        <div className="pie__marca">
          <p className="marca pie__nombre">{SITIO.nombre}</p>
          <p className="pie__linea">{SITIO.queHacemos}</p>
        </div>
        <nav aria-label="Pie de página" className="pie__col">
          <p className="etiqueta pie__tit">Enlaces</p>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/salones">Salones</a></li>
            <li><a href="/privacidad">Privacidad</a></li>
          </ul>
        </nav>
        <div className="pie__col">
          <p className="etiqueta pie__tit">Contacto</p>
          <ul>
            <li><a href={SITIO.instagramUrl} rel="noopener">Instagram {REDES[0].texto}</a></li>
            <li><a href={enlaceWhatsApp(whatsappMensaje)} rel="noopener">WhatsApp {SITIO.whatsappVisible}</a></li>
          </ul>
        </div>
      </div>

      <div className="cont pie__mad-caja">
        <p className="pie__mad" aria-hidden="true">mad</p>
      </div>

      <div className="cont pie__inf">
        <p>© {SITIO.anio} · [TODO: razón social y RUC del titular]</p>
        <a className="pie__subir" href="#">Volver arriba <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
