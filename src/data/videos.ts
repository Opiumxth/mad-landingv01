// Demo de la HOME (la de cada rubro vive en src/data/rubros/<rubro>.ts).
// Pega la URL del video en `url`:
//   - archivo .mp4 / .webm  → se carga con <video controls> al tocar
//   - enlace de YouTube/Vimeo "embed" (https://www.youtube-nocookie.com/embed/ID) → se carga en iframe al tocar
// Vacío = se muestra el aviso "[Video por subir]". Ningún video se reproduce solo.
// Los pósters son capturas distintas a las del hero.
import type { DemoVideo } from './rubros/tipos';
import { IMG } from '../imagenes';

export const videosHome: DemoVideo[] = [
  {
    id: 'web',
    etiqueta: 'Sitio web',
    titulo: 'El sitio que ven tus clientes',
    texto: 'Carta de servicios, reserva en un minuto y confirmación por WhatsApp.',
    poster: IMG.sitioCarta,
    url: '', // TODO: URL del video del sitio web
    duracion: '[duración]',
  },
  {
    id: 'panel',
    etiqueta: 'Panel',
    titulo: 'El panel que usas tú',
    texto: 'Recepción confirma citas, ve los retoques que tocan y cambia las promociones.',
    poster: IMG.panelAgenda,
    url: '', // TODO: URL del video del panel
    duracion: '[duración]',
  },
];
