import { useState } from 'react';
import { Link } from 'react-router-dom';
import mockExpenses from '../data/mockExpenses';
import ExpenseCard from '../components/ExpenseCard';
import NewExpenseModal from '../components/NewExpenseModal';
import './ExpensesScreen.css';

function ExpensesScreen() {
   const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="expenses-page">
      <header className="expenses-header">
        <Link to="/" className="back-link">
          ← Inicio
        </Link>

        <h1>Mis gastos</h1>
        <p>Consultá todos tus movimientos registrados.</p>

         <button
          type="button"
          className="new-expense-button"
          onClick={() => setIsOpen(true)}
        >
          + Registrar nuevo gasto
        </button>

      </header>

      <section aria-labelledby="expenses-title">
        <h2 id="expenses-title">Listado de gastos</h2>

        <ul className="expenses-list">
          {mockExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
            />
          ))}
        </ul>
      </section>

      <NewExpenseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </main>
  );
}

export default ExpensesScreen;

/** pantalla del listado:  */