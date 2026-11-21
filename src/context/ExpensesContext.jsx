import { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_EXPENSES } from '../data/mockExpenses';

const ExpensesContext = createContext(null);
const EXPENSES_STORAGE_KEY = 'expensetracker:expenses';


export function ExpensesProvider({ children }) {
  // En la US #1 los gastos viven en un useState dentro del Provider (estado volátil)
  const [expenses, setExpenses] = useState(() => {
  try {
    const storedExpenses = window.localStorage.getItem(EXPENSES_STORAGE_KEY);

    if (storedExpenses === null) {
      return INITIAL_EXPENSES;
    }

    const parsedExpenses = JSON.parse(storedExpenses);

    if (!Array.isArray(parsedExpenses)) {
      throw new Error('Los gastos guardados no tienen un formato válido.');
    }

    return parsedExpenses;
  } catch (error) {
    console.error('Error al cargar los gastos:', error);
    return INITIAL_EXPENSES;
  }
}); // Sprint 3: Cargar los gastos desde AsyncStorage al iniciar la aplicación


  const [isLoaded] = useState(true);
  // Sprint 3: Guardar los gastos en AsyncStorage cada vez que cambien
  useEffect(() => {
  try {
    window.localStorage.setItem(
      EXPENSES_STORAGE_KEY,
      JSON.stringify(expenses)
    );
  } catch (error) {
    console.error('Error al guardar los gastos:', error);
  }
}, [expenses]);

  const addExpense = (data) => {
    const newExpense = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      title: data.title.trim(),
      amount: Number(data.amount),
      category: data.category.trim(),
      notes: data.notes ? data.notes.trim() : '',
      createdAt: new Date().toISOString(),
    };

    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    return newExpense;
  };

  const removeExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        isLoaded,
        addExpense,
        removeExpense,
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
