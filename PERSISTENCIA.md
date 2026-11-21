# Persistencia local — PWA

## Almacenamiento

La PWA utiliza `localStorage`, que guarda datos en el navegador de forma síncrona y está limitado al mismo navegador y origen (dominio y puerto). Los datos se serializan con `JSON.stringify` y se recuperan con `JSON.parse`.

## Gastos

- Clave: `expensetracker:expenses`.
- El Context lee los gastos al inicializar el estado.
- Cada vez que cambia la lista, se guarda en `localStorage`.
- Si no hay datos guardados, se utilizan los gastos iniciales.

## Ajustes

- Clave: `expensetracker:settings`.
- Se guardan las preferencias de notificaciones, recordatorio diario y resumen semanal.
- Los ajustes se leen al abrir la pantalla de Ajustes y se guardan cuando cambia un Switch.

## Pruebas manuales

- [ ] Agregué un gasto, recargué la misma dirección y el gasto continuó en el listado.
- [ ] Cambié los tres Switches, recargué la página y conservaron sus valores.
- [ ] Verifiqué en las herramientas del navegador que aparecen las claves `expensetracker:expenses` y `expensetracker:settings`.