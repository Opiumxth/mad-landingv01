// Estructura común del embudo. / y /<rubro> solo cambian el contenido (src/data/paginas.ts y src/data/rubros/).
import Cabecera from './Cabecera';
import Hero from './Hero';
import Videos from './Videos';
import Servicios from './Servicios';
import Como from './Como';
import Precios from './Precios';
import Condiciones from './Condiciones';
import Formulario from './Formulario';
import Faq from './Faq';
import Cierre from './Cierre';
import Pie from './Pie';
import BotonWhatsApp from './BotonWhatsApp';
import JsonLd from './JsonLd';
import type { PaginaCopy } from '../data/paginas';

export default function Embudo({ copy }: { copy: PaginaCopy }) {
  return (
    <>
      <JsonLd />
      <Cabecera />
      <main id="contenido">
        <Hero copy={copy.hero} />
        <Videos copy={copy.videos} />
        {copy.servicios && <Servicios copy={copy.servicios} />}
        <Como copy={copy.como} />
        <Precios copy={copy.precios} completo={copy.esRubro} />
        {copy.esRubro && <Condiciones copy={copy.condiciones} />}
        <Formulario copy={copy.form} rubroInicial={copy.rubroInicial} />
        <Faq copy={copy.faq} />
        <Cierre copy={copy.cierre} />
      </main>
      <Pie whatsappMensaje={copy.whatsappMensaje} />
      <BotonWhatsApp mensaje={copy.whatsappMensaje} />
    </>
  );
}
