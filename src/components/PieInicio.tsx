import CampoPixeles from './CampoPixeles';
import EnlaceTexto from './EnlaceTexto';
import { pie } from '../datos/pie';
import './pie-inicio.css';

// Pie de la home: ocupa como mínimo una pantalla (la última), con el campo de píxeles arriba, el bloque de información justo debajo y la fila inferior anclada al fondo. Arriba, un campo de cuadritos azules (CampoPixeles) anclado abajo, con borde irregular hacia arriba, y la "mad" cursiva (Jane Austen, texto HTML)
// centrada encima, en la zona llena. Al medio: "Estudio de software" / "Lima, Perú" a la izquierda y, pegado al borde derecho, un solo bloque con las columnas
// Navegar y Conectar. Abajo: derechos y "Volver arriba". Mantiene su propio aspecto claro: no cambia con el tema de la página.
// (El pie anterior, Pie.tsx, sigue en las páginas antiguas del embudo.)
export default function PieInicio() {
  return (
    <footer className="pi">
      <CampoPixeles>
        <p className="pi__mad">mad</p>
      </CampoPixeles>

      {/* Bloque de información: justo debajo de la "mad"; el espacio sobrante del pie (que mide al menos una pantalla) queda entre este bloque y la fila inferior */}
      <div className="pi__info">
        <div className="pi__medio">
          <div className="pi__marca">
            <p className="pi__nombre">{pie.nombre}</p>
            <p className="pi__lugar">{pie.lugar}</p>
          </div>
          <div className="pi__cols">
            {pie.columnas.map((col) => (
              <nav key={col.etiqueta} className="pi__col" aria-label={col.etiqueta}>
                <p className="pi__etiqueta">{col.etiqueta}</p>
                <ul>
                  {col.enlaces.map((e) => (
                    <li key={e.texto}><EnlaceTexto texto={e.texto} href={e.href} externo={e.externo} /></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Fila inferior, anclada al fondo del pie: solo los derechos y "Volver arriba", sin cajas, bordes ni líneas */}
        <div className="pi__base">
          <p className="pi__derechos">{pie.derechos}</p>
          <a className="pi__link pi__subir" href="#">{pie.subir} <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
