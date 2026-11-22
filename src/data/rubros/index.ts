import { validarRubros } from './tipos';
import { salones } from './salones';

// Para sumar un rubro: crea su archivo (copiando salones.ts), impórtalo aquí y agrégalo a la lista.
// La página /<slug>, el sitemap y el formulario se generan solos.
export const rubros = validarRubros([salones]);
export type { RubroDatos, DemoVideo, Faq, FormRubro } from './tipos';
