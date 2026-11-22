// Videos de la sección "Así se ve una demo de MAD".
// Pega la URL del video en `url`:
//   - archivo .mp4 / .webm  → se carga con <video controls> al tocar
//   - enlace de YouTube/Vimeo "embed" (https://www.youtube-nocookie.com/embed/ID) → se carga en iframe al tocar
// Vacío = se muestra el aviso "[Video por subir]". Ningún video se reproduce solo.
import sitioEscritorio from '../assets/demo-sitio-escritorio.webp';
import panelEscritorio from '../assets/demo-panel-escritorio.webp';

export const videos = [
  {
    id: 'web',
    etiqueta: 'Sitio web',
    titulo: 'El sitio que ven tus clientes',
    texto: 'Carta de servicios, reserva en un minuto y confirmación por WhatsApp.',
    poster: sitioEscritorio,
    url: '', // TODO: URL del video del sitio web
    duracion: '[duración]',
  },
  {
    id: 'panel',
    etiqueta: 'Panel',
    titulo: 'El panel que usas tú',
    texto: 'Recepción confirma citas, ve los retoques que tocan y cambia las promociones.',
    poster: panelEscritorio,
    url: '', // TODO: URL del video del panel
    duracion: '[duración]',
  },
];
