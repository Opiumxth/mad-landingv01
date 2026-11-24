// LogoMad: la palabra "mad" en Jane Austen (cursiva de la marca). Usa currentColor: el color lo pone quien lo usa
// (negro en la cabecera sobre fondo claro). Decorativo (aria-hidden): quien lo use pone el nombre accesible.
// [Confirmar licencia] Jane Austen es "for private use only": ver src/styles/fuentes-marca.css.
export default function LogoMad({ className }: { className?: string }) {
  return (
    <span className={className ? `logo-mad ${className}` : 'logo-mad'} aria-hidden="true">
      mad
    </span>
  );
}
