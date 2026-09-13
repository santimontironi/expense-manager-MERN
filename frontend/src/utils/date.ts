// Fecha corta con año: "12 sept 2026" (tarjetas de categoría).
export const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

// Fecha corta sin año: "12 sept" (listas y gráficos del día a día).
export const shortDateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: 'short',
})

// Fecha larga con año: "12 de septiembre de 2026" (reloj de Reportes).
export const longDateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

// Hora y minuto: "22:36".
export const timeFormatter = new Intl.DateTimeFormat('es-AR', {
  hour: '2-digit',
  minute: '2-digit',
})

// Convierte una clave "YYYY-MM-DD" (como la que devuelven los reportes) en un
// Date local a medianoche. new Date("YYYY-MM-DD") la interpretaría como UTC,
// corriéndola un día para atrás en husos negativos (como Argentina) — por
// eso se arma con los componentes por separado.
export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}
