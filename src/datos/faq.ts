// Preguntas frecuentes de la home. Para cambiar una, edita su fila: { id, pregunta, respuesta }.
export interface Pregunta { id: string; pregunta: string; respuesta: string }

// ⚠ TEXTOS PROVISIONALES: [Confirmar] redacción antes de publicar (sin precios, cifras, clientes ni promesas que no estén definidos).
export const preguntas: Pregunta[] = [
  { id: 'empezar', pregunta: '¿Qué necesito para empezar?', respuesta: 'Para una web: tu logo, fotos, textos, la lista de tus servicios con precios, horarios y redes. En la primera reunión te decimos exactamente qué hace falta.' },
  { id: 'costo', pregunta: '¿Cuánto cuesta?', respuesta: 'Cada proyecto tiene alcance y precio cerrados, por escrito, antes de empezar. Escríbenos y te enviamos una propuesta.' },
  { id: 'plazo', pregunta: '¿Cuánto tarda?', respuesta: 'Una web estándar la entregamos en unas 3 semanas desde que se aprueba el proyecto, se hace el pago inicial y recibimos tu material. Para otros proyectos, el plazo se acuerda por escrito antes de empezar.' },
  { id: 'mantenimiento', pregunta: '¿Qué incluye el mantenimiento mensual?', respuesta: 'Dominio anual, alojamiento, copias de seguridad, capacitación y cambios menores. Lo que sea más grande se cotiza aparte, siempre antes de hacerlo.' },
  { id: 'google', pregunta: '¿Me prometen que apareceré primero en Google?', respuesta: 'No. Nadie puede prometer posiciones. Dejamos tu sitio bien armado y te ayudamos con la ficha de Google y las herramientas de buscadores, para que las personas lo encuentren y entiendan lo que ofreces.' },
  { id: 'fuera-de-lima', pregunta: '¿Trabajan con negocios fuera de Lima?', respuesta: 'Sí, trabajamos con negocios de todo el Perú. En Lima, además, podemos ir a tu local.' },
];
