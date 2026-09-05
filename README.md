# Gestor de Gastos

> 🚧 En desarrollo.

App personal para registrar gastos cotidianos y entender en qué se va la
plata. Hecha para mi novia: es un registro individual, privado y de uso
diario, no una app de finanzas compartidas ni contabilidad de un negocio.

Más contexto y decisiones del proyecto en [`.claude/context.md`](.claude/context.md),
[`.claude/spec.md`](.claude/spec.md) y [`.claude/rules.md`](.claude/rules.md).

## Stack

- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Frontend:** React + TypeScript + Vite + Tailwind
- **Shared:** tipos y schemas de Zod compartidos entre backend y frontend

## Estructura

```
backend/    API (auth, categorías, gastos, resúmenes)
frontend/   Cliente React
shared/     Tipos y schemas compartidos
```

## Desarrollo

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
