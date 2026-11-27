import { createContext, useContext, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';

const ExpensesContext = createContext(null);
const EXPENSES_COLLECTION = 'expenses';

function normalizeCreatedAt(value) {
  if (!value) return null;
  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString();
  }
  return value;
}

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const expensesQuery = query(
      collection(db, EXPENSES_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      expensesQuery,
      (snapshot) => {
        const nextExpenses = snapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data({ serverTimestamps: 'estimate' });

          return {
            id: docSnapshot.id,
            title: data.title ?? '',
            amount: Number(data.amount ?? 0),
            category: data.category ?? '',
            notes: data.notes ?? '',
            createdAt: normalizeCreatedAt(data.createdAt),
            hasPendingWrites: docSnapshot.metadata.hasPendingWrites,
          };
        });

        setExpenses(nextExpenses);
        setIsLoaded(true);
      },
      (error) => {
        console.error('Error al escuchar los gastos en Firestore:', error);
        setIsLoaded(true);
      }
    );

    return () => unsubscribe();
  }, []);

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
