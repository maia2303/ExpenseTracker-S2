
import { Link } from 'react-router-dom';
import mockExpenses from '../data/mockExpenses';
import ExpenseCard from '../components/ExpenseCard';
import './ExpensesScreen.css';

function ExpensesScreen() {
  return (
    <main className="expenses-page">
      <header className="expenses-header">
        <Link to="/" className="back-link">
          ← Inicio
        </Link>

        <h1>Mis gastos</h1>
        <p>Consultá todos tus movimientos registrados.</p>
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
    </main>
  );
}

export default ExpensesScreen;
