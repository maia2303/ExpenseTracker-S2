import { useNavigate, useParams } from 'react-router-dom';
import mockExpenses from '../data/mockExpenses';
import './ExpenseDetailScreen.css';

const formatoMoneda = (monto) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(monto);

function ExpenseDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const expense = mockExpenses.find(
    (item) => item.id === id
  );

  if (!expense) {
    return (
      <main className="detail-page">
        <h1>Gasto no encontrado</h1>
        <p>El gasto que estás buscando no existe.</p>
        <button type="button" onClick={() => navigate(-1)}>
          Volver
        </button>
      </main>
    );
  }

  const fechaFormateada = new Date(
    `${expense.fecha}T00:00:00`
  ).toLocaleDateString('es-AR');

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

        <h1>{expense.descripcion}</h1>

        <p className="detail-amount">
          {formatoMoneda(expense.monto)}
        </p>

        <div className="detail-divider" />

        <div className="detail-field">
          <span>Categoría</span>
          <strong>{expense.categoria}</strong>
        </div>

        <div className="detail-field">
          <span>Fecha</span>
          <strong>{fechaFormateada}</strong>
        </div>

        <div className="detail-field">
          <span>Notas</span>
          <strong>{expense.notas || 'Sin notas'}</strong>
        </div>
      </section>
    </main>
  );
}

export default ExpenseDetailScreen;

/** que hace useParams: cuando ingresamos a expenses/1. react router obtine el valor 1 de la url
 * desp usamos: const expense=mockexpense.find()
 * asi buscamos el gasto correspondiente. no pasamos el objeto desde la pantalla anterior. lo buscamos directamente por su ID
  */