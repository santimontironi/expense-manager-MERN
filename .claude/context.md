# Contexto del proyecto

## De qué se trata

Una aplicación personal para mi novia para registrar gastos cotidianos y entender en qué se va la plata.

La usa una sola persona, para sus propios gastos. No es una app de finanzas
compartidas ni contabilidad de un negocio: es un registro individual, privado
y de uso diario.

## El problema

La plata se va en muchos gastos chicos y dispersos, y al final del mes no hay
forma de saber en qué se fue. La sensación de "gasté mucho" existe, pero sin
números atrás: no se sabe si el mes fue caro por las salidas, por el
supermercado o porque hubo un gasto grande y puntual que distorsiona todo.

Las alternativas que ya existen fallan por dos lados opuestos:

- **La libreta o la cabeza.** No escala. Se olvidan gastos, y aunque estén
  anotados, una lista de cincuenta líneas no responde ninguna pregunta.
- **Las apps de finanzas.** Piden demasiado. Categorías que no son las propias,
  presupuestos, metas, cuentas bancarias, publicidad. Cargar un gasto lleva
  cinco pasos, y a los tres días se deja de usar.

El problema real no es guardar los gastos. Es **guardarlos con la constancia
suficiente como para que los números sirvan**.

## La idea

Que cargar un gasto sea tan rápido que no se deje de hacer, y que a cambio de
esos diez segundos por gasto se obtengan respuestas concretas.

Las preguntas que la app tiene que contestar:

- ¿Cuánto gasté este mes?
- ¿En qué se fue? ¿Qué proporción se llevó cada rubro?
- ¿Cómo vengo estos últimos días?
- ¿Este mes fue más caro que el anterior? ¿Por qué rubro?
- ¿Que categoría tiene mas gastos?

## Conceptos del dominio

**Gasto.** Una salida de plata concreta: un monto, una fecha y el rubro al que
pertenece. Opcionalmente una descripción, para acordarse de qué fue.

**Categoría.** El rubro al que pertenece un gasto (supermercado, transporte,
salidas, salud, ropa, servicios...). El listado lo define la usuaria y refleja
cómo piensa ella su plata, no una clasificación estándar. Puede cambiar con el
tiempo: agregar rubros nuevos, dejar de usar otros.

**Método de pago.** Al crear un gasto se ingresa si el método de pago (Transferencia o efectivo)

**Resumen.** La lectura agregada de los gastos en un período. No es un dato que
se carga, es lo que se obtiene: totales, comparaciones entre períodos y el peso
relativo de cada categoría sobre el total.

## Reglas del dominio

- Un gasto **siempre** pertenece a una categoría. No hay gastos sueltos.
- El listado de categorías cambia con el tiempo, pero **el pasado no se reescribe**:
  si un rubro se renombra o se deja de usar, los gastos ya registrados siguen
  mostrando el rubro que tenían cuando se cargaron. Un resumen de hace seis meses
  tiene que seguir diciendo lo mismo hoy que cuando se generó.
- Un período sin gastos es información válida, no un vacío. Un día en cero se
  muestra en cero.
- Los porcentajes son siempre relativos a un período definido. "El 35% en
  supermercado" no significa nada sin decir de cuándo.

## Evolución prevista

Una segunda etapa suma el seguimiento de **plata prestada**: a quién le deben,
por qué concepto, y las devoluciones —que muchas veces llegan de a partes— hasta
saldar la deuda.

Es un problema emparentado pero distinto: prestar plata no es gastarla. Se
registra aparte y no debería mezclarse con los totales de gastos.