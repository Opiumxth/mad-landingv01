// Iconos SVG propios (trazo, 24x24). Decorativos: aria-hidden.
const trazos = {
  chat: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z',
  play: 'M6 4l14 8-14 8z',
  mas: 'M12 5v14M5 12h14',
  flecha: 'M5 12h14M13 6l6 6-6 6',
};

export default function Icono({ nombre, tam = 24 }: { nombre: keyof typeof trazos; tam?: number }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" fill={nombre === 'play' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={trazos[nombre]} />
    </svg>
  );
}
