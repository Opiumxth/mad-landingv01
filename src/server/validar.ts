import type { Lead } from './storage';

const RUBROS = ['salon', 'barberia', 'spa', 'otro'];
const NECESIDADES = ['web', 'panel', 'web-y-panel', 'no-se'];

export type Resultado = { ok: true; lead: Lead } | { ok: false; campo?: string; error: string };

/** Valida y normaliza el cuerpo del formulario. Nunca confía en el navegador. */
export function validarLead(b: Record<string, unknown>): Resultado {
  const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

  if (!RUBROS.includes(texto(b.rubro, 20))) return { ok: false, campo: 'rubro', error: 'Elige tu rubro.' };
  if (!NECESIDADES.includes(texto(b.necesidad, 20))) return { ok: false, campo: 'necesidad', error: 'Elige qué necesitas.' };

  const negocio = texto(b.negocio, 120);
  if (!negocio) return { ok: false, campo: 'negocio', error: 'Escribe el nombre de tu negocio.' };

  let d = texto(b.whatsapp, 25).replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('51')) d = d.slice(2);
  if (!/^9\d{8}$/.test(d)) return { ok: false, campo: 'whatsapp', error: 'Escribe un celular de Perú de 9 dígitos.' };

  if (b.consentimiento !== true && b.consentimiento !== '1' && b.consentimiento !== 'on')
    return { ok: false, campo: 'consentimiento', error: 'Marca la casilla para que podamos contactarte.' };

  // Solo una ruta interna del sitio (con su query), nunca una URL externa
  let origen = texto(b.pagina_origen, 300);
  if (!origen.startsWith('/')) origen = '/';

  return {
    ok: true,
    lead: {
      rubro: texto(b.rubro, 20),
      necesidad: texto(b.necesidad, 20),
      negocio,
      whatsapp: '+51' + d,
      consentimiento: true,
      paginaOrigen: origen,
    },
  };
}
