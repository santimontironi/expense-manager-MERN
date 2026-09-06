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
- Borrado estricto: eliminar una categoría la borra de verdad de la base
  (no hay soft-delete ni campo `active`). Los gastos que ya la usaban no se
  ven afectados porque conservan `categorySnapshot` con el nombre al
  momento de la carga; `categoryId` puede quedar apuntando a una categoría
  que ya no existe, y eso es esperado.
- Renombrar una categoría no reescribe los gastos ya cargados con el nombre
  anterior (ver snapshot en Gastos).

### Criterios de aceptación

- Crear categoría con `name` vacío o duplicado → error de validación.
- Borrar una categoría no borra ni modifica los gastos que la usaban.
- Una categoría borrada no aparece más en el selector de categorías del
  formulario de carga de gasto (porque el documento ya no existe).

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

### Criterios de aceptación

- Crear gasto sin `categoryId` → error de validación (todo gasto pertenece
  a una categoría, sin excepción).
- Crear gasto con `amount <= 0` → error de validación.
- Al crear el gasto, `categorySnapshot` queda igual al `name` de la
  categoría en ese momento, sin importar cambios posteriores.
- Borrar un gasto no afecta la categoría ni otros gastos.

## Resúmenes

Cubre las preguntas de `context.md`. Todas las lecturas son agregaciones
sobre los gastos existentes, no datos que se cargan aparte.

| Pregunta | Cómo se resuelve |
|---|---|
| ¿Cuánto gasté este mes? | Suma de `amount` de gastos con `createdAt` en el mes actual. |
| ¿En qué se fue? ¿Qué proporción por rubro? | Suma de `amount` agrupada por `categorySnapshot`, cada una como % del total del período. |
| ¿Cómo vengo estos últimos días? | Suma de `amount` por día, últimos N días (incluye días en cero). |
| ¿Este mes fue más caro que el anterior? ¿Por qué rubro? | Total del mes actual vs. mes anterior, y la misma comparación agrupada por `categorySnapshot`. |
| ¿Qué categoría tiene más gastos? | La `categorySnapshot` con mayor suma de `amount` en el período consultado. |

### Criterios de aceptación

- Un período (mes, día, rango) sin gastos devuelve `0`, nunca `null` ni
  ausencia del período en la respuesta.
- Los porcentajes por categoría siempre se calculan sobre el total del
  período pedido explícitamente (nunca "todo el histórico" por default).
- Los resúmenes agrupan por `categorySnapshot` (el nombre histórico), no
  por `categoryId` ni por el nombre actual de la categoría — así un
  resumen viejo no cambia si la categoría se renombra después.

## Reportes (sección del SideNav)

La app se navega con un **SideNav**, y una de sus secciones es **Reportes**.
Es la vista de lectura analítica: no se carga nada ahí, solo se consulta.

Todo lo que muestra sale de agregaciones sobre los gastos existentes y agrupa
por `categorySnapshot` (el nombre histórico), nunca por el nombre actual de la
categoría.

La sección muestra cuatro reportes:

### 1. Gastos de la última semana, día por día

Los últimos 7 días, cada uno con **cuántos gastos** hubo y **cuánto suma** ese
día. Un día sin gastos se muestra igual, en `0` — no se saltea.

### 2. Gastos de los últimos meses

Cuántos gastos se hicieron por mes en los últimos meses, para ver la evolución
de la constancia de carga y del volumen de gasto. Un mes sin gastos se muestra
en `0`.

### 3. Categoría con más gastos (histórico)

La categoría que más gastos acumuló considerando **todo el histórico**, no un
período. Es el único número de la sección que no depende de un rango de fechas.

### 4. Ranking de los 10 días con más gastos

Los 10 días con mayor cantidad de gastos, y por cada uno el detalle de los
gastos de ese día: **descripción**, **monto** y **categoría**
(`categorySnapshot`).

### Criterios de aceptación

- Los días y meses sin gastos aparecen en `0`, nunca ausentes de la respuesta
  (mismo criterio que el resto de los resúmenes).
- El ranking de días expone el detalle de cada gasto del día, no solo el total.
- En el detalle del ranking, la descripción es opcional en el modelo: si el
  gasto no tiene, se muestra el nombre de la categoría en su lugar (nunca un
  campo vacío).
- La categoría histórica con más gastos se calcula sobre todos los gastos
  cargados, sin filtro de período.

## Fuera de alcance (v1)

- Plata prestada / deudas (etapa futura, ver `context.md`).
- Edición de gastos existentes.
- Registro público de usuarios / multiusuario.
- Presupuestos, metas, cuentas bancarias.
