// Registro de imágenes propias: `src` es la ruta base; el cargador (loader.ts) le agrega el ancho (-640.webp, etc.).
export interface Imagen { src: string; width: number; height: number }

export const IMG = {
  sitioInicio: { src: '/img/sitio-inicio', width: 1920, height: 1200 },
  sitioCarta: { src: '/img/sitio-carta', width: 1920, height: 1200 },
  panelAgenda: { src: '/img/panel-agenda', width: 1920, height: 1200 },
  panelMovil: { src: '/img/panel-movil', width: 780, height: 1688 },
  logo: { src: '/img/logo-mad-blanco', width: 512, height: 512 },
  logoNegro: { src: '/img/logo-mad-negro', width: 512, height: 512 },
} as const satisfies Record<string, Imagen>;
