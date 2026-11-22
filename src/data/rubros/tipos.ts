// Plantilla de rubros. Cada rubro es un archivo en src/data/rubros/ con SU contenido propio.
// Para sumar un rubro: copia salones.ts, escribe su demo, sus servicios típicos y sus preguntas, y regístralo en index.ts.
// Si falta algo obligatorio o si un texto se repite igual en otro rubro, la compilación falla (ver validarRubros).
import type { ImageMetadata } from 'astro';

export type FormRubro = 'salon' | 'barberia' | 'spa' | 'otro';

export interface Faq { pregunta: string; respuesta: string; enlace?: { texto: string; href: string } }

export interface DemoVideo {
  id: string;
  etiqueta: string;
  titulo: string;
  texto: string;
  poster: ImageMetadata;
  url: string; // .mp4/.webm o enlace embed; vacío = "[Video por subir]"
  duracion: string; // ej. "0:45" o "[duración]"
}

export interface RubroDatos {
  slug: string; // la página queda en /<slug>
  nombre: string; // para el menú y los textos internos
  deNegocio: string; // "del salón": se usa en "quedan a nombre del salón"
  formRubro: FormRubro; // opción que llega marcada en el formulario
  title: string;
  description: string;
  whatsappMensaje: string;
  hero: { h1: string; sub: string };
  demo: { titulo: string; lead: string; videos: DemoVideo[] }; // OBLIGATORIO: al menos 1 video
  servicios: { titulo: string; lead: string; items: { nombre: string; detalle: string }[] }; // OBLIGATORIO: al menos 4
  preguntas: Faq[]; // OBLIGATORIO: al menos 2, propias del rubro (se suman a las generales)
  formulario: { titulo: string };
  cierre: { titulo: string; texto: string };
}

const RESERVADOS = ['gracias', 'privacidad', 'sitemap', 'api', 'index'];

const norm = (t: string) => t.toLowerCase().replace(/\s+/g, ' ').trim();

/** Falla la compilación si un rubro está incompleto o es copia de otro. */
export function validarRubros(lista: RubroDatos[]): RubroDatos[] {
  const vistos = new Map<string, string>(); // texto normalizado -> slug donde ya apareció
  const slugs = new Set<string>();
  for (const r of lista) {
    const falla = (m: string) => { throw new Error(`[rubros/${r.slug}] ${m}`); };
    if (!/^[a-z0-9-]+$/.test(r.slug)) falla('slug inválido (solo minúsculas, números y guiones)');
    if (RESERVADOS.includes(r.slug)) falla('slug reservado');
    if (slugs.has(r.slug)) falla('slug repetido');
    slugs.add(r.slug);
    if (!r.demo.videos.length) falla('demo: falta al menos un video/captura');
    if (r.servicios.items.length < 4) falla('servicios típicos: mínimo 4');
    if (r.preguntas.length < 2) falla('preguntas propias: mínimo 2');
    const propios = [
      r.hero.h1, r.hero.sub, r.demo.lead, r.servicios.lead, r.cierre.titulo,
      ...r.demo.videos.flatMap((v) => [v.titulo, v.texto]),
      ...r.servicios.items.map((i) => i.detalle),
      ...r.preguntas.flatMap((p) => [p.pregunta, p.respuesta]),
    ];
    for (const t of propios) {
      if (!t.trim()) falla('hay un texto vacío');
      const k = norm(t);
      const otro = vistos.get(k);
      if (otro && otro !== r.slug) falla(`texto repetido de "${otro}": "${t.slice(0, 50)}…". Cada rubro escribe lo suyo.`);
      vistos.set(k, r.slug);
    }
  }
  return lista;
}
