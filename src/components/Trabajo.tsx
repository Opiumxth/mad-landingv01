import TrabajoBanda from './TrabajoBanda';
import EncabezadoSeccion from './EncabezadoSeccion';
import { proyectos, sonDemosDeEjemplo } from '../datos/trabajo';
import { es } from '../i18n/es';
import './trabajo.css';

// Sección "Nuestro trabajo" (#trabajo): encabezado centrado (H2 + subtítulo con revelado) + banda curva con una tarjeta al centro a la vez.
// Los datos están en src/datos/trabajo.ts. La banda no lleva efecto de entrada: solo el encabezado se revela.
export default function Trabajo() {
  return (
    <section id="trabajo" className="trabajo" aria-labelledby="trabajo-h2">
      <div className="trabajo__cab">
        <EncabezadoSeccion id="trabajo-h2" titulo={es.trabajo.titulo} subtitulo={es.trabajo.subtitulo} alinear="centro" />
      </div>
      <TrabajoBanda proyectos={proyectos} avisoDemos={sonDemosDeEjemplo} />
    </section>
  );
}
