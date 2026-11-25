import './boton-hover.css';

// Botón principal con efecto hover de relleno (mismo diseño y comportamiento que el botón "Hablemos" del hero), reutilizable.
// Efecto inspirado en "Interactive Hover Button" (Magic UI, MIT, crédito @AayushBharti), en CSS plano (ver boton-hover.css).
// La capa del hover repite el texto con aria-hidden: se lee una sola vez. `tono="oscuro"` para fondos oscuros (borde blanco, aro de foco blanco).
export default function BotonHover({ texto, href, tono = 'claro', className = '' }: { texto: string; href: string; tono?: 'claro' | 'oscuro'; className?: string }) {
  return (
    <a className={`btn btn--principal bh${tono === 'oscuro' ? ' bh--oscuro' : ''}${className ? ' ' + className : ''}`} href={href}>
      <span className="bh__txt">{texto}</span>
      <span className="bh__hover" aria-hidden="true">
        <span>{texto}</span>
      </span>
      <span className="bh__fondo" aria-hidden="true"></span>
    </a>
  );
}
