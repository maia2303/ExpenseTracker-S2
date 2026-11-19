import { useNavigate, useParams } from 'react-router-dom';
import CategoryBadge from '../components/CategoryBadge';
import './ExpenseDetailScreen.css';

//Sprint 3, conexión al contexto
import { useExpenses } from '../context/ExpensesContext';

const formatoMoneda = (monto) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(monto);

function ExpenseDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  //Sprint 3, accedemos a la funcion de eliminar la expensa
  const { expenses, removeExpense } = useExpenses();

  const expense = expenses.find(
    (item) => item.id === id
  );

  if (!expense) {
    return (
      <main className="detail-page">
        <section className="detail-card detail-empty">
          <h1>Gasto no encontrado</h1>
          <p>
            El gasto que estás buscando no existe o fue eliminado.
          </p>
          <button
            type="button"
            className="detail-empty-button"
            onClick={() => navigate('/expenses')}
          >
            Volver al listado
          </button>
        </section>
      </main>
    );
  }

  const titulo = expense.title ?? expense.descripcion;

  // Función de borrado con confirmación
  const handleDelete = () => {
    const confirmado = window.confirm(
      `¿Estás seguro de que querés eliminar "${titulo}"?`
    );

    if (confirmado) {
      removeExpense(expense.id);
      navigate('/expenses', { replace: true });
    }
  };

  const rawDate = expense.createdAt ?? expense.fecha;
  const parsedDate = rawDate
    ? new Date(rawDate.includes('T') ? rawDate : `${rawDate}T00:00:00`)
    : null;
  const fechaFormateada =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString('es-AR')
      : 'Sin fecha';

  return (
    <main className="detail-page">
      <button
        className="detail-back-button"
        type="button"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      <section className="detail-card">
        <p className="detail-eyebrow">DETALLE DEL GASTO</p>

        <h1>{expense.title ?? expense.descripcion}</h1>

        <p className="detail-amount">
          {formatoMoneda(expense.amount ?? expense.monto)}
        </p>

        <div className="detail-divider" />

        <div className="detail-field">
          <span>Categoría</span>
          <CategoryBadge categoria={expense.category ?? expense.categoria} />
        </div>

        <div className="detail-field">
          <span>Fecha</span>
          <strong>{fechaFormateada}</strong>
        </div>

        <div className="detail-field">
          <span>Notas</span>
          <strong>{expense.notes ?? expense.notas ?? 'Sin notas'}</strong>
        </div>


        {/* Sprint 3. Botón de eliminar */}
        <button
          type="button"
          className="detail-delete-button"
          onClick={handleDelete}
        >
          Eliminar gasto
        </button>
      </section>
    </main>
  );
}

export default ExpenseDetailScreen;

/** que hace useParams: cuando ingresamos a expenses/1. react router obtine el valor 1 de la url
 * desp usamos: const expense=mockexpense.find()
 * asi buscamos el gasto correspondiente. no pasamos el objeto desde la pantalla anterior. lo buscamos directamente por su ID
  */