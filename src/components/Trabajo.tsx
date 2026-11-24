import TrabajoBanda from './TrabajoBanda';
import { proyectos, sonDemosDeEjemplo } from '../datos/trabajo';
import { es } from '../i18n/es';
import './trabajo.css';

// Sección "Nuestro trabajo" (#trabajo): H2 + banda curva con una tarjeta al centro a la vez. Los datos están en src/datos/trabajo.ts.
export default function Trabajo() {
  return (
    <section id="trabajo" className="trabajo" aria-labelledby="trabajo-h2">
      <h2 id="trabajo-h2" className="trabajo__titulo">{es.trabajo.titulo}</h2>
      <TrabajoBanda proyectos={proyectos} avisoDemos={sonDemosDeEjemplo} />
    </section>
  );
}
