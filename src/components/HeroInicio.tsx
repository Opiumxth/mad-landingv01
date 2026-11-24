import DemoFrame from './DemoFrame';
import { es } from '../i18n/es';
import './hero-inicio.css';

const t = es.inicio.hero;

// Hero de la home, como en la referencia: el frame pequeño arriba, y debajo el H1 (único de la página), "ESTUDIO DE SOFTWARE"
// gigante como H2, el botón Hablemos. Al bajar, el frame crece y este texto se desvanece (solo opacity: sigue en el DOM); el frame se queda
// grande un momento y luego sale con la página mientras entra la sección siguiente. El texto es lo primero que se pinta (LCP): la animación solo empieza con el scroll.
export default function HeroInicio() {
  return (
    <section className="ih" aria-labelledby="ih-h1">
      <div className="ih__pista">
        <DemoFrame />
        <div className="ih__in">
          <h1 id="ih-h1" className="ih__h1">{t.h1}</h1>
          <div className="ih__h2caja">
            <h2 className="ih__h2">{t.h2}</h2>
          </div>
          <div className="ih__cta">
            <a className="btn btn--principal ih__btn" href={t.cta.href}>{t.cta.texto}</a>
          </div>
        </div>
        <div className="marco__espera" aria-hidden="true"></div>
      </div>
      <div className="marco__cola" aria-hidden="true"></div>
    </section>
  );
}
