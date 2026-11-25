import Cabecera from '../../components/Cabecera';
import Icono from '../../components/Icono';
import { enlaceWhatsApp } from '../../data/sitio';
import { metaPagina } from '../../lib/seo';
import '../../components/paginas.css';

export const metadata = metaPagina({ title: 'Gracias | MAD Software Studio', description: 'Recibimos tus datos. Te contactaremos por WhatsApp.', ruta: '/gracias', noindex: true });

const mensaje = 'Hola, acabo de dejar mis datos en somosmad.com para pedir mi demo con mi logo.';

export default function Gracias() {
  return (
    <>
      <Cabecera />
      <main id="contenido" className="gracias tono-oscuro">
        <div className="cont gracias__in">
          <p className="etiqueta">Datos recibidos</p>
          <h1>Gracias, ya tenemos tus datos</h1>
          <p className="lead">Te contactaremos por el WhatsApp que dejaste para preparar tu demo con tu logo. [Confirmar plazo de respuesta]</p>
          <a className="btn btn--principal" href={enlaceWhatsApp(mensaje)}><Icono nombre="chat" /> Escríbenos por WhatsApp</a>
          <a className="gracias__volver" href="/">Volver al inicio</a>
        </div>
      </main>
    </>
  );
}
