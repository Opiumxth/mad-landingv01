// Capa de almacenamiento de leads. Hoy: Cloudflare D1.
// Para cambiar de proveedor (Sheets, Airtable, Postgres, correo…) solo reescribe saveLead():
// el resto del Worker no sabe dónde se guardan los datos.
export interface Lead {
  rubro: string;
  necesidad: string;
  negocio: string;
  whatsapp: string; // E.164, ej. +51987654321
  consentimiento: true;
  paginaOrigen: string;
}

export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  TURNSTILE_SECRET_KEY: string;
  ALLOWED_ORIGINS?: string;
}

export async function saveLead(env: Env, lead: Lead): Promise<void> {
  await env.DB.prepare(
    `INSERT INTO leads (rubro, necesidad, negocio, whatsapp, consentimiento, pagina_origen)
     VALUES (?1, ?2, ?3, ?4, 1, ?5)`,
  )
    .bind(lead.rubro, lead.necesidad, lead.negocio, lead.whatsapp, lead.paginaOrigen)
    .run();
}
