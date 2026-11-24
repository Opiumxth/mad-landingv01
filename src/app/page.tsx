// Home nueva (cabecera + hero con frame animado + Nuestro trabajo + Soluciones + Cómo trabajamos + Nosotros). La home anterior (embudo con formulario) queda en el historial de git.
import Cabecera from '../components/Cabecera';
import HeroInicio from '../components/HeroInicio';
import Trabajo from '../components/Trabajo';
import Soluciones from '../components/Soluciones';
import ComoTrabajamos from '../components/ComoTrabajamos';
import Nosotros from '../components/Nosotros';
import Pie from '../components/Pie';
import JsonLd from '../components/JsonLd';
import { es } from '../i18n/es';
import { metaPagina } from '../lib/seo';

export const metadata = metaPagina({ title: es.inicio.title, description: es.inicio.description, ruta: '/' });

export default function Home() {
  return (
    <>
      <JsonLd />
      <Cabecera />
      <main id="contenido" className="inicio">
        <HeroInicio />
        <Trabajo />
        <Soluciones />
        <ComoTrabajamos />
        <Nosotros />
      </main>
      <Pie whatsappMensaje={es.inicio.whatsappMensaje} />
    </>
  );
}
