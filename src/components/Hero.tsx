import Image from 'next/image';
import { IMG } from '../imagenes';
import type { PaginaCopy } from '../data/paginas';
import './hero.css';

/*
  Hero 3 (por defecto): fondo blanco, texto a la izquierda y el demo de MAD en marcos de dispositivo
  (ventana de navegador para el sitio, celular para el panel) con sombra suave. Capturas a doble resolución,
  sin la barra de herramientas del demo. Los marcos son CSS puro (sin imágenes extra).
  Hero 4 (?hero=4): mismos textos y estructura; mockups ~20% más grandes con más profundidad (brillo y sombra de apoyo,
  celular superpuesto), fondo de cuadrícula fina con máscara radial en CSS y entrada de los mockups en < 400 ms
  (solo fundido + desplazamiento corto; el H1 y el botón nunca parten invisibles; se apaga con prefers-reduced-motion).
  Hero 2 (?hero=2): imagen de fondo con capa oscura, texto centrado.
*/
export default function Hero({ copy }: { copy: PaginaCopy['hero'] }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg" aria-hidden="true">
        <Image src={IMG.sitioInicio.src} alt="" width={IMG.sitioInicio.width} height={IMG.sitioInicio.height} sizes="100vw" loading="lazy" />
        <div className="hero__capa"></div>
        <p className="hero__nota etiqueta">Fondo: captura de una demo de MAD</p>
      </div>

      <div className="hero__fondo" aria-hidden="true"></div>

      <div className="cont hero__grid">
        <div className="hero__texto">
          <h1>{copy.h1}</h1>
          <p className="lead hero__sub">{copy.sub}</p>
          <div className="hero__cta">
            <a className="btn btn--principal" href="#formulario">{copy.cta}</a>
            <p className="hero__micro">{copy.micro}</p>
          </div>
        </div>

        <div className="escena">
          <div className="escena__lienzo">
            <figure className="navegador">
              <div className="navegador__barra" aria-hidden="true"><i></i><i></i><i></i><span></span></div>
              <Image
                src={IMG.sitioInicio.src}
                alt="Demo de MAD: sitio web de un salón con su carta de servicios y botón de reserva (captura de ejemplo)"
                width={IMG.sitioInicio.width}
                height={IMG.sitioInicio.height}
                sizes="(min-width: 62rem) 40rem, (min-width: 40rem) 80vw, 76vw"
                loading="eager"
                fetchPriority="high"
              />
            </figure>
            <figure className="celular">
              <Image
                src={IMG.panelMovil.src}
                alt="Demo de MAD: panel del salón en el celular, con las citas por confirmar (captura de ejemplo)"
                width={IMG.panelMovil.width}
                height={IMG.panelMovil.height}
                sizes="(min-width: 62rem) 9rem, 30vw"
                loading="lazy"
              />
            </figure>
          </div>
          <p className="escena__pie etiqueta">Demo de MAD · sitio web y panel de ejemplo</p>
        </div>
      </div>
    </section>
  );
}
