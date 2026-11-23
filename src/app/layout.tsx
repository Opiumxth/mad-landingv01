import type { Metadata, Viewport } from 'next';
import '../styles/tokens.css';
import '../styles/global.css';
// [Confirmar licencia] Alte Haas Grotesk y Jane Austen: mientras no se confirme, se usa la fuente del sistema.
// Cuando los archivos estén en public/fonts y la licencia confirmada, descomenta la línea siguiente (ver ese archivo):
// import '../styles/fuentes-marca.css';
import { SITIO } from '../data/sitio';

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.dominio),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = { themeColor: '#0a0a0a' };

// Variante del hero: por defecto 3. ?hero=4 = mockups más grandes con fondo de líneas; ?hero=2 = imagen de fondo.
// Corre antes de pintar (script en línea). suppressHydrationWarning: el atributo cambia antes de que React hidrate.
const scriptHero = `try{var h=new URLSearchParams(location.search).get('hero');if(h==='2'||h==='3'||h==='4')document.documentElement.setAttribute('data-hero',h)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITIO.idioma} data-hero="3" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptHero }} />
      </head>
      <body>
        <a className="salto" href="#contenido">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
