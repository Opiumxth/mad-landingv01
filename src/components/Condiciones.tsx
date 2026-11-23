// Solo en las páginas de rubro (/salones…). Pago, mantenimiento, cambio de plan, datos y cuentas, exclusividad y lo que no incluye.
import { condiciones, mostrarExclusividad, mostrarPrecios } from '../data/precios';
import type { PaginaCopy } from '../data/paginas';
import './condiciones.css';

export default function Condiciones({ copy }: { copy: PaginaCopy['condiciones'] }) {
  return (
    <section className="seccion tono-claro" id="condiciones">
      <div className="cont">
        <header className="seccion__cab">
          <p className="etiqueta">{copy.etiqueta}</p>
          <h2>{copy.titulo}</h2>
        </header>
        <div className="cond">
          {mostrarPrecios && (
            <article className="tarjeta">
              <h3 className="etiqueta">Forma de pago</h3>
              <p>{condiciones.pago}</p>
              <p>{condiciones.pasarAB}</p>
            </article>
          )}
          {mostrarPrecios && (
            <article className="tarjeta tarjeta--fuerte">
              <h3 className="etiqueta">Mantenimiento mensual · {condiciones.mantenimiento.monto}</h3>
              <p>{condiciones.mantenimiento.detalle}</p>
            </article>
          )}
          <article className="tarjeta">
            <h3 className="etiqueta">Tus datos y tus cuentas</h3>
            <p>{condiciones.datos}</p>
          </article>
          {mostrarExclusividad && (
            // PENDIENTE DE CONFIRMAR CON LOS SOCIOS antes de mezclar a main (interruptor en src/data/precios.ts)
            <article className="tarjeta">
              <h3 className="etiqueta">Exclusividad de vecindad</h3>
              <p>{condiciones.exclusividad}</p>
            </article>
          )}
          <article className="tarjeta tarjeta--ancha">
            <h3 className="etiqueta">Qué no incluye</h3>
            <ul>{condiciones.noIncluye.map((t) => <li key={t}>{t}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  );
}
