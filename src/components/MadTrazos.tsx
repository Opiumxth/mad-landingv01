// "mad" en cursiva dibujado con trazos (un solo trazo continuo, puntas redondeadas), sin fuentes ni imágenes.
// Decorativo: el nombre real de la marca va en texto en el pie.
//
// Atribución: los trazos de las letras m, a y d (y la forma de encadenarlas y de inclinarlas) vienen del alfabeto de un solo trazo de
// "Sticker Footer with Script Wordmark", de @kedhareswer (https://21st.dev/@kedhareswer/components/sticker-slap-footer),
// licencia MIT declarada en su página pública. Adaptado: solo "mad", sin animación ni calcomanías, colores y tamaños propios.
// [Confirmar licencia] Jane Austen: cuando esté confirmada, estos trazos se pueden reemplazar por los de esa tipografía.
export default function MadTrazos({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-2.5 -21 49.5 23.5" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M0.0 -1C1.46 -1.6 1.95 -6 2.2 -9.6L2.2 -1L2.2 -5.6C2.93 -8.6 4.15 -10 5.86 -10C7.56 -10 8.54 -9 8.54 -7L8.54 -1L8.54 -5.6C9.27 -8.6 10.49 -10 12.2 -10C13.91 -10 14.88 -9 14.88 -7L14.88 -3C14.88 -0.8 16.1 -1 17.81 -1L18.81 -1C20.52 -1.4 20.52 -9.6 24.06 -10C21.86 -10 20.03 -7.8 20.03 -5C20.03 -2.2 21.86 0 24.06 0C26.25 0 28.08 -2.2 28.08 -5L28.33 -10L28.33 -3C28.33 -0.8 29.55 -1 31.26 -1L32.26 -1C33.96 -1.4 33.96 -9.6 37.5 -10C35.31 -10 33.48 -7.8 33.48 -5C33.48 -2.2 35.31 0 37.5 0C39.7 0 41.53 -2.2 41.53 -5L41.77 -19L41.77 -3C41.77 -0.8 42.99 -1 44.7 -1"
        transform="matrix(1 0 -0.1584 1 0 0)"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
