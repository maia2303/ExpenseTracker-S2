// Capa de acceso a localStorage.
// Las pantallas NO usan localStorage directamente: pasan por el Context,
// y el Context pasa por estas funciones.

// Mismas claves que usa la app de React Native (AsyncStorage).
export const STORAGE_KEYS = {
  expenses: '@expensetracker/expenses',
  settings: '@expensetracker/settings',
};

// Lee y parsea una clave. Si no existe, el JSON está dañado o no tiene
// el formato esperado, devuelve el valor de respaldo (fallback) en lugar de romper la app.
export function loadJSON(key, fallback, isValid = () => true) {
  try {
    const raw = window.localStorage.getItem(key);

    if (raw === null) {
      return fallback;
    }

    const parsed = JSON.parse(raw);

    if (!isValid(parsed)) {
      throw new Error('El contenido guardado no tiene un formato válido.');
    }

    return parsed;
  } catch (error) {
    console.error(`Error al leer "${key}":`, error);
    return fallback;
  }
}

// Serializa y guarda. Puede fallar (almacenamiento lleno, modo privado), por eso va en try/catch.
export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error al guardar "${key}":`, error);
  }
}