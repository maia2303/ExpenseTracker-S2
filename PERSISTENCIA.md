# Persistencia — PWA (ExpenseTracker, Sprint 3)


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

# Persistencia — PWA (ExpenseTracker, Story 4)

## Qué se guarda y dónde

| Dato | Dónde se guarda | Capa |
| --- | --- | --- |
| Ajustes (3 switches) | `localStorage` | Capa 1: preferencias del dispositivo |
| Gastos (etapa 1, US #4) | `localStorage` | Almacenamiento local |
| Gastos (etapa 2, US #5) | Cloud Firestore | Remoto, compartido con la app móvil |

> **Pendiente (equipo, US #5):** al conectar Firestore, los gastos dejan de guardarse en `localStorage`; los ajustes se quedan ahí. Actualizar esta tabla y explicar por qué (ajustes = preferencia de este dispositivo; gastos = datos que se comparten entre dispositivos).

## Claves de localStorage

Son las mismas que usa la app de React Native con AsyncStorage (definidas en `src/services/storage.js`):

- `@expensetracker/expenses`: arreglo JSON con los gastos.
- `@expensetracker/settings`: objeto JSON con `notificaciones`, `recordatorioDiario` y `resumenSemanal`.

## Cómo está organizado el código

- `src/services/storage.js`: funciones `loadJSON` y `saveJSON`. Son las únicas que tocan `localStorage`, con `try/catch`.
- `src/context/ExpensesContext.jsx`: hidrata y persiste gastos y ajustes. Expone `expenses`, `isLoaded`, `addExpense`, `removeExpense`, `settings` y `updateSetting`.
- Las pantallas (incluida Ajustes) **no acceden al almacenamiento**: solo usan `useExpenses()`.

## Hidratación y persistencia

1. **Hidratación:** al crear el estado se lee el almacenamiento: `useState(() => loadJSON(...))`. Si no hay datos, o el JSON está dañado o no tiene el formato esperado, se arranca con una lista vacía (gastos) o con los valores por defecto (ajustes).
2. **Persistencia:** un `useEffect` por cada dato guarda con `JSON.stringify` cada vez que cambia.

## Por qué acá se puede leer en el `useState` y en AsyncStorage no

`localStorage` es **síncrono**: `getItem` devuelve el valor en el momento, así que el primer render ya tiene los datos y no hay un instante con la lista vacía. `AsyncStorage` es **asíncrono**: `getItem` devuelve una promesa, entonces el primer render ocurre antes de tener los datos. Por eso en React Native hace falta un `useEffect` de montaje que lea, y una bandera `isLoaded` que empieza en `false`, bloquea el guardado mientras se hidrata (si no, el primer render guardaría un arreglo vacío y se perderían los gastos) y permite mostrar un `ActivityIndicator`.

## Qué hace `isLoaded` en la PWA

Se mantiene en el Context por equivalencia con React Native, para que las pantallas usen la misma API en ambas apps. Como la lectura es síncrona, vale `true` desde el primer render.

## JSON dañado

`loadJSON` envuelve la lectura en `try/catch` y valida el formato (`isValidExpenses`, `isValidSettings`). Si algo falla, registra el error en consola y devuelve el valor de respaldo, así la app arranca en lugar de romperse. El siguiente guardado reemplaza el contenido dañado.

## Pruebas manuales (US #4)

- [ ] Agregué un gasto, recargué la página y el gasto continuó en el listado.
- [ ] Cambié los tres switches, recargué y conservaron su valor.
- [ ] Cerré y volví a abrir la PWA instalada y se conservaron gastos y ajustes.
- [ ] En DevTools → Application → Local Storage se ven las dos claves con su contenido en JSON.
- [ ] Puse JSON dañado en `@expensetracker/expenses` (por ejemplo `{roto`), recargué y la app arrancó con la lista vacía.
- [ ] Recargué en `/expenses/:id` (ruta profunda) y la pantalla cargó correctamente.


## Comparación React Native vs PWA

| Aspecto | React Native | PWA |
| --- | --- | --- |
| Almacenamiento local | `AsyncStorage` (asíncrono) | `localStorage` (síncrono) |
| Hidratación | `useEffect` de montaje + `isLoaded` | Valor inicial del `useState` |
| Indicador de carga | `ActivityIndicator` mientras `isLoaded` es `false` | No hace falta |
| Caché offline de Firestore | En memoria | `persistentLocalCache()` (IndexedDB) |
