# Reglas del proyecto

## Idioma

- Todo el contenido del código va en inglés: nombres de archivos, carpetas,
  variables, funciones, modelos, atributos, mensajes de commit. Los comentarios
  (cuando corresponden) también van en inglés.
- La comunicación con el usuario (chat, documentación en `.claude/`) sigue en
  español.

## Código limpio, sin sobreingeniería

- Escribir la solución más simple que resuelva el problema. Nada de abstracciones,
  capas o "flexibilidad" para casos que no existen todavía.
- No crear interfaces, factories, providers ni configuraciones para una sola
  implementación. Si hoy hay un solo caso, se escribe para ese caso.
- No armar helpers ni utilidades genéricas hasta que se repitan de verdad
  (mínimo 3 usos). Antes de eso, repetir el código es mejor que una abstracción
  prematura.
- Lógica clara y entendible antes que "elegante". Preferir código explícito y
  fácil de seguir por sobre trucos o one-liners difíciles de leer.
- No dejar código muerto, comentado o "por las dudas". Lo que no se usa, se borra.
- Sin comentarios que expliquen el qué (el código ya lo dice). Solo comentar el
  porqué cuando no es obvio (una restricción rara, un workaround puntual).
- Excepción: si el usuario pide explícitamente comentarios explicando el
  código, se agregan aunque expliquen el qué.

## TypeScript sin ruido

- No crear types ni interfaces innecesarios. Si el tipo se puede inferir, se infiere.
- No duplicar tipos que ya existen en `shared`. Si un tipo describe una entidad
  del dominio (Gasto, Categoría, etc.), vive en `shared` y se importa desde ahí.
- Nada de tipos genéricos, wrappers o utility types especulativos para casos que
  no se están dando. `any` está prohibido, pero tampoco hay que tipar de más.

## Frontend: datos por props, no arrays sueltos

- Los componentes reciben los datos que renderizan por **props**. No declarar
  arrays de objetos (listas de items, opciones, config de UI) sueltos dentro de
  un componente para después mapearlos ahí mismo si esos datos deberían venir
  de afuera (de la API, de un hook, de un componente padre).
- Un componente de presentación no inventa sus datos: los recibe y los muestra.
  El array de objetos vive en un solo lugar (el estado, el fetch, el padre) y
  se pasa hacia abajo.

## Frontend: breakpoints de Tailwind

- Mobile first siempre. Los estilos base (sin prefijo) son los de mobile.
- Los únicos breakpoints permitidos son `md:`, `xl:` y `2xl:`.
- **No usar** `sm:` ni `lg:` bajo ninguna circunstancia.

## Backend: validación con Zod

- Todo endpoint **POST** y **PATCH** valida el body con un schema de Zod antes
  de llegar al controller, usando el middleware `zod-validation`
  (`backend/middlewares/zod-validation.js`).
- El schema se define con Zod y se aplica en la ruta, no dentro del controller.
- Si el body no pasa la validación, el middleware corta la request y responde
  el error; el controller nunca valida a mano lo que ya debería haber validado
  el middleware.
