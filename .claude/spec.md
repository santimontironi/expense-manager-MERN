# Especificaciones del proyecto

## Alcance v1

Registro y consulta de gastos personales de una única usuaria. Sin plata
prestada (ver "Evolución prevista" en `context.md`, es una etapa futura y
separada).

## Autenticación

- Existe `POST /api/auth/register`, pero no está expuesto en el frontend: se
  usa manualmente (Postman) para dar de alta al único usuario de la app.
- Login con `username` + `password`. Sesión vía cookie (ya hay
  `verify-auth` middleware y `cookie-parser` instalados).
- Todas las rutas de categorías y gastos requieren sesión activa.

## Categorías

- Una categoría tiene `name` y `color` (para diferenciarlas visualmente en
  gráficos y listados).
- Se pueden crear y renombrar libremente.
- Borrado incondicional: eliminar una categoría la borra de verdad de la
  base (no hay soft-delete ni campo `active`), sin importar si tiene
  gastos asociados o no. Los gastos que la usaban no se ven afectados como
  registros (conservan su `categorySnapshot`), pero su `categoryId` queda
  apuntando a una categoría que ya no existe; eso es esperado y se refleja
  con el indicador "(categoría eliminada)" (ver Gastos). Para quien
  prefiera no dejar gastos huérfanos, existe la reasignación manual
  descrita abajo, pero no es un paso obligatorio antes de borrar.
- Renombrar una categoría no reescribe el `categorySnapshot` de los gastos
  ya cargados (ver Gastos), pero sí afecta a los Reportes, que agrupan por
  el nombre actual de la categoría (ver sección Reportes).
- Al presionar una categoría se navega a su detalle: el listado de gastos
  que tienen esa categoría como `categoryId` (navegación en vivo, no usa
  `categorySnapshot`). Desde ese listado también se puede borrar un gasto,
  igual que desde la sección general de Gastos.

### Reasignación de gastos (detalle de categoría)

Desde el detalle de una categoría se puede reorganizar a qué categoría
pertenecen sus gastos, sin tocar su histórico (`categorySnapshot` de cada
gasto no cambia nunca por esto, solo cambia su `categoryId`). Es una
herramienta opcional para quien prefiera no dejar gastos huérfanos al
borrar una categoría, no un requisito: el borrado (ver arriba) funciona
igual con o sin reasignar antes.

- **Mover un gasto individual**: desde el listado de gastos del detalle de
  categoría, se puede reasignar un gasto puntual a otra categoría existente.
  No borra ni afecta a los demás gastos de la categoría.
- **Transportar todos los gastos a otra categoría**: acción única que mueve
  todos los gastos de la categoría actual hacia una categoría de destino
  elegida, y como resultado de esa misma acción la categoría de origen
  (que queda con `expenseCount === 0`) se borra. Es una forma alternativa
  de vaciar y borrar una categoría sin dejar gastos con `categoryId`
  huérfano.

### Criterios de aceptación

- Crear categoría con `name` vacío o duplicado → error de validación.
- Borrar una categoría, tenga o no gastos asociados, se ejecuta siempre
  (no hay validación que lo bloquee). No borra ni modifica los gastos que
  la usaban; solo deja de existir el documento de la categoría.
- Mover un gasto individual a otra categoría cambia su `categoryId` pero
  nunca su `categorySnapshot`.
- "Transportar todos" mueve el `categoryId` de todos los gastos de la
  categoría origen a la categoría destino elegida, no modifica el
  `categorySnapshot` de ninguno, y borra la categoría origen al finalizar.
- Una categoría borrada no aparece más en el selector de categorías del
  formulario de carga de gasto (porque el documento ya no existe).
- El detalle de una categoría muestra solo los gastos con ese `categoryId`,
  sin importar si la categoría fue renombrada después de cargarlos.

## Gastos

- Un gasto tiene: `amount`, `description` (opcional), `paymentMethod`
  (`transfer` | `cash`), `categoryId` + `categorySnapshot` (nombre de la
  categoría al momento de cargar el gasto).
- La fecha del gasto es la fecha de carga (`createdAt`). No se puede cargar
  un gasto con fecha pasada ni futura distinta a hoy.
- `categorySnapshot` se completa al crear el gasto y no cambia después,
  aunque la categoría se renombre o se desactive.
- No hay edición de gastos ya cargados en v1: si algo está mal, se borra y
  se vuelve a cargar. (Evita reabrir la discusión de qué pasa con un
  `categorySnapshot` editado a mitad de camino.)
- Al presionar un gasto (desde la sección de Gastos o desde el detalle de
  una categoría) se navega a su detalle, con `amount`, `description`,
  `paymentMethod`, `categorySnapshot` y fecha (`createdAt`).
- En el listado de gastos, si la categoría del gasto ya no existe (fue
  borrada), se muestra un indicador "(categoría eliminada)" junto al
  `categorySnapshot`. El `categorySnapshot` nunca deja de mostrarse; el
  indicador es adicional. Como el borrado de categorías es incondicional
  (ver Categorías), este es un caso normal y esperado, no residual.
- Si la categoría todavía existe pero fue renombrada después de cargar el
  gasto, o el gasto fue reasignado a otra categoría (ver "Reasignación de
  gastos" en Categorías), y por eso el `name` actual ya no coincide con el
  `categorySnapshot`, se muestra un indicador "(categoría editada, ahora
  {name actual})" junto al `categorySnapshot`. Mismo criterio que el
  indicador de categoría eliminada: el `categorySnapshot` sigue siendo lo
  que se muestra como título, el indicador es solo información adicional
  de contexto.

### Criterios de aceptación

- Crear gasto sin `categoryId` → error de validación (todo gasto pertenece
  a una categoría, sin excepción).
- Crear gasto con `amount <= 0` → error de validación.
- Al crear el gasto, `categorySnapshot` queda igual al `name` de la
  categoría en ese momento, sin importar cambios posteriores.
- Borrar un gasto no afecta la categoría ni otros gastos.
- El detalle de un gasto muestra `categorySnapshot` (el nombre histórico),
  no el nombre actual de la categoría.
- Un gasto cuya categoría fue borrada muestra "(categoría eliminada)" junto
  al `categorySnapshot`, tanto en el listado como en el detalle del gasto.
- Un gasto cuya categoría todavía existe pero fue renombrada muestra
  "(categoría editada, ahora {name actual})" junto al `categorySnapshot`,
  tanto en el listado como en el detalle del gasto. Si el nombre actual es
  igual al `categorySnapshot` (no hubo rename), no se muestra ningún
  indicador.

## Resúmenes

Cubre las preguntas de `context.md`. Todas las lecturas son agregaciones
sobre los gastos existentes, no datos que se cargan aparte.

| Pregunta | Cómo se resuelve |
|---|---|
| ¿Cuánto gasté este mes? | Suma de `amount` de gastos con `createdAt` en el mes actual. |
| ¿En qué se fue? ¿Qué proporción por rubro? | Suma de `amount` agrupada por el nombre actual de la categoría (vía `categoryId`), cada una como % del total del período. |
| ¿Cómo vengo estos últimos días? | Suma de `amount` por día, últimos N días (incluye días en cero). |
| ¿Este mes fue más caro que el anterior? ¿Por qué rubro? | Total del mes actual vs. mes anterior, y la misma comparación agrupada por el nombre actual de la categoría. |
| ¿Qué categoría tiene más gastos? | La categoría (nombre actual) con mayor suma de `amount` en el período consultado. |

### Criterios de aceptación

- Un período (mes, día, rango) sin gastos devuelve `0`, nunca `null` ni
  ausencia del período en la respuesta.
- Los porcentajes por categoría siempre se calculan sobre el total del
  período pedido explícitamente (nunca "todo el histórico" por default).
- Los resúmenes agrupan por `categoryId`, mostrando el nombre **actual**
  de la categoría (no `categorySnapshot`) — decisión de cliente: si se
  renombra una categoría, los resúmenes pasados (aunque el período ya haya
  cerrado) pasan a mostrar el nombre nuevo. Se prioriza que el nombre sea
  siempre consistente con el estado actual de Categorías, por sobre que el
  resumen quede congelado con el nombre viejo.
- Como el borrado de categorías es incondicional (ver Categorías), un
  `categoryId` puede no tener categoría existente detrás. En ese caso el
  grupo del resumen usa el `categorySnapshot` de esos gastos como nombre,
  ya que no hay nombre actual para mostrar.

## Reportes (sección del SideNav)

La app se navega con un **SideNav**, y una de sus secciones es **Reportes**.
Es la vista de lectura analítica: no se carga nada ahí, solo se consulta.

Todo lo que muestra sale de agregaciones sobre los gastos existentes y agrupa
por `categoryId`, mostrando el nombre **actual** de la categoría, no
`categorySnapshot` (mismo criterio que en Resúmenes). Si la categoría fue
borrada (`categoryId` ya no existe), se usa el `categorySnapshot` de esos
gastos como nombre del grupo, mismo fallback que en Resúmenes.

La sección muestra cuatro reportes:

### 1. Gastos de la última semana, día por día

Los últimos 7 días, cada uno con **cuántos gastos** hubo y **cuánto suma** ese
día. Un día sin gastos se muestra igual, en `0` — no se saltea.

### 2. Gastos de los últimos meses

Gráfico de barras con la cantidad de gastos hechos por mes, para ver la
evolución de la constancia de carga y del volumen de gasto. Un mes sin
gastos se muestra en `0`.

Solo incluye meses **terminados**: el mes actual, al no haber cerrado
todavía, no forma parte del gráfico de barras (compararlo a medio
transcurrir contra meses completos distorsiona la lectura). La cantidad de
gastos del mes en curso se muestra aparte, en otra sección de Reportes,
no dentro de este gráfico.

### 3. Cantidad de gastos por categoría (histórico)

Gráfico de torta con la cantidad de gastos que acumuló cada categoría
considerando **todo el histórico**, no un período. Es el único reporte de
la sección que no depende de un rango de fechas. La porción más grande del
gráfico es, por definición, la categoría con más gastos.

Cada `categoryId` distinto que haya tenido gastos alguna vez es su propia
porción, exista o no la categoría hoy — no se agrupan todas las categorías
borradas en una sola porción genérica:

- Categoría que sigue existiendo: la porción muestra su nombre actual, sin
  indicador (no importa si fue renombrada, ya se muestra el nombre vigente).
- Categoría borrada: la porción muestra su `categorySnapshot` con el
  indicador "(categoría eliminada)" al lado, mismo criterio visual que en
  Gastos.

### 4. Ranking de los 10 días con más gastos

Los 10 días con mayor cantidad de gastos, y por cada uno el detalle de los
gastos de ese día: **descripción**, **monto** y **categoría** (nombre
actual de la categoría, vía `categoryId`).

### Criterios de aceptación

- Los días y meses sin gastos aparecen en `0`, nunca ausentes de la respuesta
  (mismo criterio que el resto de los resúmenes).
- El gráfico de barras de meses no incluye el mes actual (mes sin terminar);
  solo meses completos. La cantidad de gastos del mes en curso se expone
  aparte, en otra sección/campo de la respuesta de Reportes.
- El ranking de días expone el detalle de cada gasto del día, no solo el total.
- En el detalle del ranking, la descripción es opcional en el modelo: si el
  gasto no tiene, se muestra el nombre de la categoría en su lugar (nunca un
  campo vacío).
- El gráfico de torta de cantidad de gastos por categoría se calcula sobre
  todos los gastos cargados, sin filtro de período, con una porción por
  cada `categoryId` distinto que haya tenido gastos, exista o no la
  categoría hoy.
- Una porción de categoría borrada muestra su `categorySnapshot` con el
  indicador "(categoría eliminada)"; una porción de categoría viva muestra
  su nombre actual, sin indicador.

## Fuera de alcance (v1)

- Plata prestada / deudas (etapa futura, ver `context.md`).
- Edición de gastos existentes.
- Registro público de usuarios / multiusuario.
- Presupuestos, metas, cuentas bancarias.
