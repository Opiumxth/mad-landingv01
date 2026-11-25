'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { RUBROS, NECESIDADES, type PaginaCopy, type Rubro } from '../data/paginas';
import './formulario.css';

// Clave pública de Turnstile. Por defecto, la de PRUEBA (siempre aprueba). Ver .env.example.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

type Errores = Record<string, string>;
// Estados del envío: vacío (ninguno) → revisar (datos por corregir) → enviando → enviado | red | servidor
type Estado = { tipo: 'ninguno' | 'revisar' | 'enviando' | 'enviado' | 'red' | 'servidor'; msg: string };
const SIN_ESTADO: Estado = { tipo: 'ninguno', msg: '' };

type TurnstileApi = { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void };
const ts = () => (window as unknown as { turnstile?: TurnstileApi }).turnstile;

// Celular de Perú: 9 dígitos que empiezan en 9, con o sin +51
function normalizarWhatsApp(v: string): string | null {
  let d = v.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('51')) d = d.slice(2);
  return /^9\d{8}$/.test(d) ? '+51' + d : null;
}

export default function Formulario({ copy, rubroInicial }: { copy: PaginaCopy['form']; rubroInicial: Rubro | null }) {
  const form = useRef<HTMLFormElement>(null);
  const widgetEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<Estado>(SIN_ESTADO);
  const enviando = estado.tipo === 'enviando' || estado.tipo === 'enviado';

  // ---- Turnstile: se carga solo cuando el formulario está cerca de la pantalla (600 px) ----
  useEffect(() => {
    const el = form.current;
    if (!el) return;
    function cargarTurnstile() {
      if (document.getElementById('ts-script')) return;
      const s = document.createElement('script');
      s.id = 'ts-script';
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = () => {
        const t = ts();
        if (t && widgetEl.current) widgetId.current = t.render(widgetEl.current, { sitekey: SITE_KEY, theme: 'light', language: 'es' });
      };
      document.head.appendChild(s);
    }
    const io = new IntersectionObserver((es, obs) => {
      if (es.some((e) => e.isIntersecting)) { cargarTurnstile(); obs.disconnect(); }
    }, { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ponerError = (n: string, msg: string) => setErrores((e) => ({ ...e, [n]: msg }));

  function validar(fd: FormData): boolean {
    const nuevos: Errores = {
      rubro: fd.get('rubro') ? '' : 'Elige tu rubro.',
      necesidad: fd.get('necesidad') ? '' : 'Elige qué necesitas.',
      negocio: String(fd.get('negocio') ?? '').trim() ? '' : 'Escribe el nombre de tu negocio.',
      whatsapp: normalizarWhatsApp(String(fd.get('whatsapp') ?? '')) ? '' : 'Escribe un celular de Perú de 9 dígitos, por ejemplo 987 654 321.',
      consentimiento: fd.get('consentimiento') ? '' : 'Marca la casilla para que podamos contactarte.',
    };
    setErrores((e) => ({ ...e, ...nuevos }));
    const malos = Object.keys(nuevos).filter((k) => nuevos[k]);
    if (malos.length) {
      setEstado({ tipo: 'revisar', msg: malos.length === 1 ? 'Falta 1 dato. Revisa el campo marcado.' : `Faltan ${malos.length} datos. Revisa los campos marcados.` });
      form.current?.querySelector<HTMLElement>(`[data-campo="${malos[0]}"] input`)?.focus();
      return false;
    }
    return true;
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;
    setEstado(SIN_ESTADO);
    ponerError('turnstile', '');
    const fd = new FormData(e.currentTarget);
    if (!validar(fd)) return;
    const token = String(fd.get('cf-turnstile-response') ?? '');
    if (!token) {
      ponerError('turnstile', 'Espera un momento: estamos comprobando que eres una persona. Vuelve a tocar el botón en unos segundos.');
      return;
    }

    const datos = {
      rubro: fd.get('rubro'),
      necesidad: fd.get('necesidad'),
      negocio: String(fd.get('negocio')).trim(),
      whatsapp: normalizarWhatsApp(String(fd.get('whatsapp'))),
      consentimiento: true,
      pagina_origen: location.pathname + location.search, // ej. "/salones" o "/?hero=4"
      web: fd.get('web') ?? '',
      turnstile: token,
    };
    setEstado({ tipo: 'enviando', msg: 'Enviando tus datos…' });
    let r: Response;
    try {
      r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(datos) });
    } catch {
      // Sin conexión: la petición no llegó al servidor, así que la verificación sigue vigente y se puede reintentar tal cual.
      setEstado({ tipo: 'red', msg: 'No hay conexión. Tus datos siguen aquí: revisa tu internet y toca "Reintentar". También puedes escribirnos por WhatsApp.' });
      return;
    }
    const j = (await r.json().catch(() => ({}))) as { ok?: boolean; campo?: string; error?: string };
    if (r.ok && j.ok) {
      setEstado({ tipo: 'enviado', msg: 'Listo, recibimos tus datos. Te llevamos a la página de confirmación…' });
      location.href = '/gracias';
      return;
    }
    // El servidor respondió (la verificación ya se usó): se pide una nueva.
    ts()?.reset(widgetId.current);
    if (j.campo) {
      ponerError(j.campo, j.error ?? 'Revisa este dato.');
      setEstado({ tipo: 'revisar', msg: 'Falta corregir 1 dato. Revisa el campo marcado.' });
      form.current?.querySelector<HTMLElement>(`[data-campo="${j.campo}"] input`)?.focus();
    } else {
      setEstado({ tipo: 'servidor', msg: j.error ?? 'No pudimos enviar tus datos. Inténtalo otra vez o escríbenos por WhatsApp.' });
    }
  }

  const cls = (n: string, base: string) => (errores[n] ? `${base} con-error` : base);
  const inv = (n: string) => (errores[n] ? 'true' : 'false');
  const reintentable = estado.tipo === 'red' || estado.tipo === 'servidor';

  return (
    <section className="seccion tono-claro" id="formulario">
      <div className="cont form-wrap">
        <header className="seccion__cab">
          <p className="etiqueta">{copy.etiqueta}</p>
          <h2>{copy.titulo}</h2>
          <p className="lead">{copy.lead}</p>
        </header>

        <form id="lead-form" ref={form} className="form" action="/api/lead" method="post" noValidate aria-busy={enviando} onSubmit={enviar}
          onInput={(e) => { const n = (e.target as HTMLInputElement).name; if (n && errores[n]) ponerError(n, ''); }}>
          <fieldset className={cls('rubro', 'grupo')} data-campo="rubro" aria-describedby="err-rubro">
            <legend>1. ¿Cuál es tu rubro?</legend>
            <div className="opciones">
              {RUBROS.map((r) => (
                <label className="opcion" key={r.valor}>
                  <input type="radio" name="rubro" value={r.valor} defaultChecked={r.valor === rubroInicial} required aria-invalid={inv('rubro')} />
                  <span>{r.texto}</span>
                </label>
              ))}
            </div>
            <p className="error" id="err-rubro" data-error="rubro" role="alert">{errores.rubro}</p>
          </fieldset>

          <fieldset className={cls('necesidad', 'grupo')} data-campo="necesidad" aria-describedby="err-necesidad">
            <legend>2. ¿Qué necesitas?</legend>
            <div className="opciones">
              {NECESIDADES.map((n) => (
                <label className="opcion" key={n.valor}>
                  <input type="radio" name="necesidad" value={n.valor} required aria-invalid={inv('necesidad')} />
                  <span>{n.texto}</span>
                </label>
              ))}
            </div>
            <p className="error" id="err-necesidad" data-error="necesidad" role="alert">{errores.necesidad}</p>
          </fieldset>

          <div className={cls('negocio', 'grupo')} data-campo="negocio">
            <label htmlFor="negocio">3. Nombre de tu negocio</label>
            <input id="negocio" name="negocio" type="text" autoComplete="organization" autoCapitalize="words" enterKeyHint="next" maxLength={120} required aria-describedby="err-negocio" aria-invalid={inv('negocio')} />
            <p className="error" id="err-negocio" data-error="negocio" role="alert">{errores.negocio}</p>
          </div>

          <div className={cls('whatsapp', 'grupo')} data-campo="whatsapp">
            <label htmlFor="whatsapp">4. Tu WhatsApp</label>
            <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="done" spellCheck={false} placeholder="987 654 321" maxLength={20} required aria-describedby="ayuda-wa err-whatsapp" aria-invalid={inv('whatsapp')} />
            <p className="ayuda" id="ayuda-wa">Celular de Perú, 9 dígitos.</p>
            <p className="error" id="err-whatsapp" data-error="whatsapp" role="alert">{errores.whatsapp}</p>
          </div>

          {/* Anti-spam: campo señuelo (los bots lo llenan, las personas no lo ven) */}
          <div className="senuelo" aria-hidden="true">
            <label>No llenar este campo <input type="text" name="web" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <input type="hidden" name="pagina_origen" value="" />

          <div className={cls('consentimiento', 'grupo grupo--consent')} data-campo="consentimiento">
            {/* Casilla de privacidad SIN marcar por defecto */}
            <label className="consent">
              <input type="checkbox" name="consentimiento" value="1" required aria-describedby="err-consentimiento" aria-invalid={inv('consentimiento')} />
              <span>Acepto que MAD Software Studio use mis datos para contactarme por WhatsApp sobre mi demo, según la <a href="/privacidad">política de privacidad</a>.</span>
            </label>
            <p className="error" id="err-consentimiento" data-error="consentimiento" role="alert">{errores.consentimiento}</p>
          </div>

          <div id="turnstile" ref={widgetEl} className="turnstile" data-sitekey={SITE_KEY}></div>
          <p className="error" id="err-turnstile" data-error="turnstile" role="alert">{errores.turnstile}</p>

          <button className="btn btn--principal form__enviar" type="submit" disabled={enviando}>{estado.tipo === 'enviando' ? 'Enviando…' : estado.tipo === 'enviado' ? 'Enviado' : 'Pide tu demo con tu logo'}</button>

          {/* Mensajes del envío: avisos (enviando, enviado) y alertas (revisar, red, servidor) */}
          <p className="estado estado--aviso" role="status" aria-live="polite">{estado.tipo === 'enviando' || estado.tipo === 'enviado' ? estado.msg : ''}</p>
          <div role="alert">
            {(estado.tipo === 'revisar' || reintentable) && (
              <div className="estado estado--error">
                <p>{estado.msg}</p>
                {reintentable && (
                  <button type="button" className="btn btn--borde estado__reintentar" onClick={() => form.current?.requestSubmit()}>Reintentar</button>
                )}
              </div>
            )}
          </div>
          <noscript><p className="ayuda">Para enviar el formulario activa JavaScript, o escríbenos por WhatsApp.</p></noscript>
        </form>
      </div>
    </section>
  );
}
