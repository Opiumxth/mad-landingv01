import EsferaPlateada from './EsferaPlateada';
import type { PaginaCopy } from '../data/paginas';
import './cierre.css';

export default function Cierre({ copy }: { copy: PaginaCopy['cierre'] }) {
  return (
    <section className="seccion tono-oscuro cierre" id="cierre">
      <div className="cont cierre__in">
        <div className="cierre__texto">
          <h2>{copy.titulo}</h2>
          <p className="lead">{copy.texto}</p>
          <a className="btn btn--principal" href="#formulario">Pide tu demo con tu logo</a>
          <p className="cierre__micro">Sin costo · te escribimos por WhatsApp</p>
        </div>
        <div className="cierre__esfera"><EsferaPlateada /></div>
      </div>
    </section>
  );
}
