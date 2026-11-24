import { es } from '../i18n/es';
import './hero-inicio.css';

const t = es.inicio.hero;

// Hero de la home: H1 (el único de la página), "ESTUDIO DE SOFTWARE" gigante como H2, botón Hablemos y precio de entrada.
// Nada de esto se anima: el texto es lo primero que se pinta (LCP).
export default function HeroInicio() {
  return (
    <section className="ih" aria-labelledby="ih-h1">
      <div className="ih__in">
        <h1 id="ih-h1" className="ih__h1">{t.h1}</h1>
        <div className="ih__h2caja">
          <h2 className="ih__h2">{t.h2}</h2>
        </div>
        <div className="ih__cta">
          <a className="btn btn--principal" href={t.cta.href}>{t.cta.texto}</a>
          <p className="ih__micro">{t.micro}</p>
        </div>
      </div>
    </section>
  );
}
