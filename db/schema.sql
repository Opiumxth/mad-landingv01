-- Esquema D1 para leads de MAD. Ejecutar (lo haces tú):
--   npx wrangler d1 execute mad-leads --remote --file=./db/schema.sql
CREATE TABLE IF NOT EXISTS leads (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  rubro        TEXT    NOT NULL,
  necesidad    TEXT    NOT NULL,
  negocio      TEXT    NOT NULL,
  whatsapp     TEXT    NOT NULL,
  consentimiento INTEGER NOT NULL CHECK (consentimiento = 1),
  pagina_origen TEXT   NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
