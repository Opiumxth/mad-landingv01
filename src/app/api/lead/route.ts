// POST /api/lead: valida, verifica Turnstile y guarda el lead con saveLead() (D1).
// Los bindings (DB, variables y secretos) vienen de Cloudflare vía getCloudflareContext().
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { saveLead, type Env } from '../../../server/storage';
import { validarLead } from '../../../server/validar';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

async function turnstileOk(env: Env, token: string, ip: string | null): Promise<boolean> {
  const body = new FormData();
  body.set('secret', env.TURNSTILE_SECRET_KEY);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const j = (await r.json()) as { success?: boolean };
    return j.success === true;
  } catch {
    return false;
  }
}

function origenPermitido(req: Request, env: Env): boolean {
  const origin = req.headers.get('Origin');
  if (!origin) return false;
  if (origin === new URL(req.url).origin) return true; // mismo origen (incluye vistas previas)
  return (env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean).includes(origin);
}

export async function POST(req: Request): Promise<Response> {
  const env = getCloudflareContext().env as unknown as Env;
  if (!origenPermitido(req, env)) return json({ ok: false, error: 'Origen no permitido.' }, 403);

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'Datos inválidos.' }, 400);
  }

  // Señuelo anti-spam: si viene lleno, respondemos "ok" sin guardar nada
  if (typeof cuerpo.web === 'string' && cuerpo.web !== '') return json({ ok: true });

  const v = validarLead(cuerpo);
  if (!v.ok) return json({ ok: false, campo: v.campo, error: v.error }, 400);

  const token = typeof cuerpo.turnstile === 'string' ? cuerpo.turnstile : '';
  if (!token || !(await turnstileOk(env, token, req.headers.get('CF-Connecting-IP'))))
    return json({ ok: false, error: 'No pudimos verificar que eres una persona. Recarga la página e inténtalo otra vez.' }, 400);

  try {
    await saveLead(env, v.lead);
  } catch (e) {
    console.error('saveLead falló', e);
    return json({ ok: false, error: 'No pudimos guardar tus datos. Inténtalo otra vez o escríbenos por WhatsApp.' }, 500);
  }
  return json({ ok: true });
}

// Cualquier otro método
const noPermitido = () => json({ ok: false, error: 'Método no permitido.' }, 405);
export { noPermitido as GET, noPermitido as PUT, noPermitido as PATCH, noPermitido as DELETE };
