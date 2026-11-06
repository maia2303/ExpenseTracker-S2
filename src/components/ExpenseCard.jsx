import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';

const formatoMoneda = (monto) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(monto);

function ExpenseCard({ expense }) {
  return (
    <li className="expense-card">
      <Link
        to={`/expenses/${expense.id}`}
        className="expense-card-link"
      >
        <div className="expense-card-info">
          <h2>{expense.descripcion}</h2>
          <CategoryBadge categoria={expense.categoria} />
        </div>

        <div className="expense-card-amount">
          <strong>{formatoMoneda(expense.monto)}</strong>
          <span aria-hidden="true">→</span>
        </div>
      </Link>
    </li>
  );
}

export default ExpenseCard;

/** este componente representa cada gasto. lo hacemos reutilizable pq vamos a usar el mismo diseño para los 
 * tres pagos. 
 */
