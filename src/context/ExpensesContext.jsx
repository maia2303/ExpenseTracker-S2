
import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS, loadJSON, saveJSON } from '../services/storage';

const ExpensesContext = createContext(null);

const DEFAULT_SETTINGS = {
  notificaciones: true,
  recordatorioDiario: false,
  resumenSemanal: true,
};

// Validaciones para no confiar ciegamente en lo que hay en localStorage
const isValidExpenses = (data) =>
  Array.isArray(data) &&
  data.every(
    (expense) =>
      expense &&
      typeof expense.id === 'string' &&
      typeof expense.title === 'string' &&
      typeof expense.amount === 'number'
  );

const isValidSettings = (data) =>
  data !== null &&
  typeof data === 'object' &&
  Object.keys(DEFAULT_SETTINGS).every((key) => typeof data[key] === 'boolean');

export function ExpensesProvider({ children }) {
  // HIDRATACIÓN: localStorage es síncrono, así que se lee directamente en el valor
  // inicial del useState. Cuando el componente hace su primer render, los datos ya están.
  // Sin datos guardados (o con JSON dañado) se arranca con una lista vacía.
  const [expenses, setExpenses] = useState(() =>
    loadJSON(STORAGE_KEYS.expenses, [], isValidExpenses)
  );
  const [settings, setSettings] = useState(() =>
    loadJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS, isValidSettings)
  );

  // Se mantiene por equivalencia con React Native, donde AsyncStorage es asíncrono
  // y la bandera sí cambia de false a true. Acá siempre es true por la lectura síncrona.
  const isLoaded = true;

  // PERSISTENCIA: cada vez que cambian los datos, se guardan.
  useEffect(() => {
    saveJSON(STORAGE_KEYS.expenses, expenses);
  }, [expenses]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.settings, settings);
  }, [settings]);

  const addExpense = (data) => {
    const payload = {
      title: data.title.trim(),
      amount: Number(data.amount),
      category: data.category.trim(),
      notes: data.notes ? data.notes.trim() : '',
      createdAt: serverTimestamp(),
    };

    return addDoc(collection(db, EXPENSES_COLLECTION), payload).catch((error) => {
      console.error('Error al guardar el gasto en Firestore:', error);
    });
  };

  const removeExpense = (id) => {
    return deleteDoc(doc(db, EXPENSES_COLLECTION, id)).catch((error) => {
      console.error('Error al eliminar el gasto en Firestore:', error);
    });
  };

  const updateSetting = (name, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        isLoaded,
        addExpense,
        removeExpense,
        settings,
        updateSetting,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error(
      'useExpenses debe utilizarse dentro de un ExpensesProvider'
    );
  }

  return context;
}