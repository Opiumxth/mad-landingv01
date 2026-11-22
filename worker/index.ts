// Worker mínimo: solo POST /api/lead. Todo lo demás lo sirve Cloudflare desde dist/ (ver wrangler.jsonc).
import { saveLead, type Env } from './storage';
import { validarLead } from './validar';

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

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === '/api/lead') {
      if (req.method !== 'POST') return json({ ok: false, error: 'Método no permitido.' }, 405);
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

    // Cualquier otra ruta que llegue aquí: dejar que sirvan los assets
    return env.ASSETS.fetch(req);
  },
} satisfies ExportedHandler<Env>;
