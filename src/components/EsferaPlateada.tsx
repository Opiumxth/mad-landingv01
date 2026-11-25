// Esfera plateada completa (SVG propio, sin imágenes). Decorativa: entera, sin recortes ni solapes con el texto.
import './esfera.css';

export default function EsferaPlateada() {
  return (
    <svg className="esfera" viewBox="0 0 400 440" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="esf-cuerpo" cx="34%" cy="28%" r="78%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.22" stopColor="#a3a3a3" />
          <stop offset="0.55" stopColor="#8a8a8a" />
          <stop offset="0.82" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#1a1a1a" />
        </radialGradient>
        <radialGradient id="esf-brillo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="esf-sombra" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="400" rx="130" ry="22" fill="url(#esf-sombra)" />
      <circle cx="200" cy="200" r="180" fill="url(#esf-cuerpo)" />
      <ellipse cx="140" cy="108" rx="64" ry="40" transform="rotate(-28 140 108)" fill="url(#esf-brillo)" />
    </svg>
  );
}
