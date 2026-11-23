import Embudo from '../components/Embudo';
import { home } from '../data/paginas';
import { metaPagina } from '../lib/seo';

export const metadata = metaPagina({ title: home.title, description: home.description, ruta: home.ruta });

export default function Home() {
  return <Embudo copy={home} />;
}
