# MiBolsillo

> 🚧 En desarrollo.

App personal para registrar gastos cotidianos y entender en qué se va la
plata. Hecha para mi novia: es un registro individual, privado y de uso
diario, no una app de finanzas compartidas ni contabilidad de un negocio.

El problema no es guardar los gastos, es guardarlos con la constancia
suficiente como para que los números sirvan. Por eso cargar un gasto tiene que
ser cuestión de segundos, y a cambio la app responde preguntas concretas:
cuánto se gastó este mes, en qué rubros se fue, cómo viene la semana y qué
días fueron los más caros.

## Qué hace

- **Gastos.** Monto, descripción opcional, método de pago (transferencia o
  efectivo) y categoría. Todo gasto pertenece a una categoría, sin excepción.
- **Categorías.** Las define la usuaria y reflejan cómo piensa ella su plata.
  Se pueden crear, renombrar y borrar.
- **El pasado no se reescribe.** Cada gasto guarda el nombre de la categoría
  que tenía al cargarse (`categorySnapshot`), así un resumen viejo sigue
  diciendo hoy lo mismo que cuando se generó, aunque la categoría se haya
  renombrado o borrado después.
- **Resúmenes.** Totales del mes, proporción por rubro, comparación contra el
  mes anterior y evolución de los últimos días.
- **Reportes.** Sección aparte del SideNav: la semana día por día, el volumen
  de gastos mes a mes, la categoría que más gastó en todo el histórico y el
  ranking de los 10 días más caros con el detalle de cada gasto.

## Stack

- **Backend:** Node.js + Express + MongoDB (Mongoose), auth con JWT en cookie
  httpOnly y validación de bodies con Zod.
- **Frontend:** React + TypeScript + Vite + Tailwind v4, con Bootstrap Icons.
- **Shared:** tipos y schemas de Zod compartidos entre backend y frontend.

## Estructura

```
backend/    API (auth, categorías, gastos, resúmenes)
frontend/   Cliente React
shared/     Tipos y schemas compartidos
.claude/    Contexto, especificaciones y reglas del proyecto
```

## Desarrollo

Requiere Node.js y una base MongoDB accesible.

```bash
# backend
cd backend
npm install
npm run dev

# frontend
cd frontend
npm install
npm run dev
```

Variables de entorno del backend (`backend/.env`):

| Variable | Para qué |
|---|---|
| `MONGO_URL` | Conexión a MongoDB |
| `PORT` | Puerto de la API |
| `JWT_SECRET` | Firma de los tokens de sesión |
| `FRONTEND_URL` | Origen permitido por CORS |
| `NODE_ENV` | En `production` las cookies van `secure` + `sameSite: none` |

El alta del único usuario se hace a mano contra `POST /api/auth/register`
(Postman o similar): no hay registro público en la app.

## Convenciones

El código va en inglés, la documentación en español. Antes de tocar el
proyecto conviene leer:

- [`.claude/context.md`](.claude/context.md) — de qué se trata y qué problema resuelve
- [`.claude/spec.md`](.claude/spec.md) — requerimientos y criterios de aceptación
- [`.claude/rules.md`](.claude/rules.md) — arquitectura, convenciones y restricciones

Reglas que se aplican sin excepción: mobile first con solo los breakpoints
`md:`, `xl:` y `2xl:`; validación de todo `POST`/`PATCH` con Zod en la ruta;
y nada de sobreingeniería (la solución más simple que resuelva el problema).
