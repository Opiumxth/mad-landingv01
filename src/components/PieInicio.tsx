import CampoPixeles from './CampoPixeles';
import { pie } from '../datos/pie';
import './pie-inicio.css';

// Pie de la home. Arriba, un campo de cuadritos azules (CampoPixeles) anclado abajo, con borde irregular hacia arriba, y la "mad" cursiva (Jane Austen, texto HTML)
// centrada encima, en la zona llena. Al medio: "Estudio de software" / "Lima, Perú" a la izquierda y, pegado al borde derecho, un solo bloque con las columnas
// Navegar y Conectar. Abajo: teléfono (enlace a WhatsApp), derechos, privacidad y "Volver arriba". Mantiene su propio aspecto claro: no cambia con el tema de la página.
// (El pie anterior, Pie.tsx, sigue en las páginas antiguas del embudo.)
export default function PieInicio() {
  return (
    <footer className="pi">
      <CampoPixeles>
        <p className="pi__mad">mad</p>
      </CampoPixeles>

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
                  <li key={e.texto}><a className="pi__enlace" href={e.href} {...(e.externo ? { target: '_blank', rel: 'noopener' } : {})}>{e.texto}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="pi__base">
        <a className="pi__tel" href={pie.telefono.href} rel="noopener" aria-label={pie.telefono.etiqueta}>
          <span className="pi__tel-pre">{pie.telefono.prefijo}</span>
          {pie.telefono.cajas.map((c) => <span key={c} className="pi__caja">{c}</span>)}
        </a>
        <p className="pi__derechos">{pie.derechos}</p>
        <div className="pi__legal">
          <a className="pi__link" href={pie.privacidad.href}>{pie.privacidad.texto}</a>
          <a className="pi__link pi__subir" href="#">{pie.subir} <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
