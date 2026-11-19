import { createContext, useContext, useState } from 'react';
import { INITIAL_EXPENSES } from '../data/mockExpenses';

const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  // En la US #1 los gastos viven en un useState dentro del Provider (estado volátil)
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [isLoaded] = useState(true);

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
