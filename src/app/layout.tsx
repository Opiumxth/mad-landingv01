import type { Metadata, Viewport } from 'next';
import { preload } from 'react-dom';
import '../styles/tokens.css';
import '../styles/global.css';
// [Confirmar licencia] Alte Haas Grotesk (Regular y Bold) y Jane Austen (logo, solo local). Ver ese archivo.
import '../styles/fuentes-marca.css';
import { SITIO } from '../data/sitio';

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.dominio),
  // Iconos: por convención de archivos de la app (src/app/icon.png, favicon.ico, apple-icon.png); no se declaran aquí.
};

export const viewport: Viewport = { themeColor: '#0a0a0a' };

// Variante del hero: por defecto 3. ?hero=4 = mockups más grandes con fondo de líneas; ?hero=2 = imagen de fondo.
// Corre antes de pintar (script en línea). suppressHydrationWarning: el atributo cambia antes de que React hidrate.
const scriptHero = `try{var h=new URLSearchParams(location.search).get('hero');if(h==='2'||h==='3'||h==='4')document.documentElement.setAttribute('data-hero',h)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Se precargan Alte Haas Regular y Bold y el logo en Jane Austen (todo se ve en el primer pintado).
  preload('/fonts/AlteHaasGrotesk-Regular.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  preload('/fonts/AlteHaasGrotesk-Bold.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  // Jane Austen (solo local): el logo "mad" de la cabecera se ve en el primer pintado
  preload('/fonts/JaneAusten.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  return (
    <html lang={SITIO.idioma} data-hero="3" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptHero }} />
      </head>
      {/* suppressHydrationWarning: algunas extensiones del navegador (p. ej. "vc-init") añaden clases al <body> antes de hidratar */}
      <body suppressHydrationWarning>
        <a className="salto" href="#contenido">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
