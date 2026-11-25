// Una página por rubro, generada desde src/data/rubros/. Hoy: /salones.
import { notFound } from 'next/navigation';
import Embudo from '../../components/Embudo';
import { rubros } from '../../data/rubros';
import { paginaDeRubro } from '../../data/paginas';
import { metaPagina } from '../../lib/seo';

export const dynamicParams = false; // solo los rubros registrados; el resto da 404

export function generateStaticParams() {
  return rubros.map((r) => ({ rubro: r.slug }));
}

const copyDe = (slug: string) => {
  const r = rubros.find((x) => x.slug === slug);
  if (!r) notFound();
  return paginaDeRubro(r);
};

export async function generateMetadata({ params }: { params: Promise<{ rubro: string }> }) {
  const copy = copyDe((await params).rubro);
  return metaPagina({ title: copy.title, description: copy.description, ruta: copy.ruta });
}

export default async function PaginaRubro({ params }: { params: Promise<{ rubro: string }> }) {
  return <Embudo copy={copyDe((await params).rubro)} />;
}
