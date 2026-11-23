// Fuentes propias con next/font (archivos woff2 en src/fonts, subset latino; licencia SIL OFL 1.1).
// Solo se precargan las que se ven en el primer pintado: Inter (texto y títulos) y Barlow (nombre de marca).
import localFont from 'next/font/local';

export const inter = localFont({
  src: '../fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const barlow = localFont({
  src: '../fonts/barlow-condensed-latin-500-normal.woff2', // solo el nombre MAD SOFTWARE STUDIO
  weight: '500',
  style: 'normal',
  display: 'swap',
  variable: '--font-barlow',
  preload: true,
});

export const plexMono = localFont({
  src: '../fonts/ibm-plex-mono-latin-600-normal.woff2', // etiquetas
  weight: '600',
  style: 'normal',
  display: 'swap',
  variable: '--font-plex',
  preload: false,
});
