// "YYYY-MM-DD" a partir de los componentes LOCALES de la fecha (no UTC).
// date.toISOString() convierte a UTC, lo que hace que un gasto cargado de
// noche (hora local) caiga en el día siguiente en UTC y no matchee ningún
// día del reporte. Con getFullYear/getMonth/getDate nos aseguramos de
// comparar siempre el mismo "día calendario" que ve el usuario.
export function toLocalDateKey(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// "YYYY-MM" a partir de los componentes LOCALES de la fecha (mismo motivo que toLocalDateKey).
export function toLocalMonthKey(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
}
