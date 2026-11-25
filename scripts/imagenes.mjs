// Genera las variantes WebP que sirve next/image (ver src/imagenes/loader.ts).
// Origen: src/assets (capturas del demo y logo). Salida: public/img/<nombre>-<ancho>.webp (ignorada por git).
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ORIGEN = new URL('../src/assets/', import.meta.url);
const SALIDA = new URL('../public/img/', import.meta.url);

// Anchos pedidos por next.config.ts (deviceSizes + imageSizes). Si falta uno, la imagen da 404.
const TODOS = [40, 80, 160, 320, 480, 640, 960, 1280, 1600];
const IMAGENES = [
  { nombre: 'sitio-inicio', archivo: 'demo/sitio-inicio.webp', anchos: TODOS },
  { nombre: 'sitio-carta', archivo: 'demo/sitio-carta.webp', anchos: TODOS },
  { nombre: 'panel-agenda', archivo: 'demo/panel-agenda.webp', anchos: TODOS },
  { nombre: 'panel-movil', archivo: 'demo/panel-movil.webp', anchos: TODOS },
  { nombre: 'logo-mad-blanco', archivo: 'logo-mad-blanco.webp', anchos: [40, 80] },
  { nombre: 'logo-mad-negro', archivo: 'logo-mad-negro.webp', anchos: [80, 160] }, // cabecera (fondo claro)
];

await mkdir(SALIDA, { recursive: true });
let hechas = 0;
for (const { nombre, archivo, anchos } of IMAGENES) {
  const origen = new URL(archivo, ORIGEN);
  const mtime = (await stat(origen)).mtimeMs;
  for (const w of anchos) {
    const destino = new URL(`${nombre}-${w}.webp`, SALIDA);
    const existe = await stat(destino).then((s) => s.mtimeMs >= mtime).catch(() => false);
    if (existe) continue;
    // withoutEnlargement: si la fuente es más chica que el ancho pedido, se copia a su tamaño.
    await sharp(fileURLToPath(origen)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(fileURLToPath(destino));
    hechas++;
  }
}
console.log(`[imagenes] ${hechas} variantes generadas`);
