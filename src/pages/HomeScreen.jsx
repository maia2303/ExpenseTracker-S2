import './HomeScreen.css';

const gastos = [
  { id: '1', descripcion: 'Supermercado', monto: 25000 },
  { id: '2', descripcion: 'Combustible', monto: 18000 },
  { id: '3', descripcion: 'Internet', monto: 32000 },
];

const formatoMoneda = (monto) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(monto);

const totalGastos = gastos.reduce(
  (total, gasto) => total + gasto.monto,
  0
);

export default function HomeScreen() {
  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <div className="brand-icon" aria-hidden="true">
          $
        </div>
        <span className="brand-name">ExpenseTracker</span>
      </header>

      <main className="welcome-main">
        <section className="welcome-intro">
          <p className="welcome-eyebrow">TUS FINANZAS, MÁS SIMPLES</p>

          <h1>¡Bienvenido a tus finanzas personales!</h1>

          <p className="welcome-description">
            Esta aplicación te ayudará a llevar un control de tus
            gastos y ahorros. Registrá tus movimientos y mantené
            tus finanzas organizadas.
          </p>
        </section>

        <section
          className="summary-card"
          aria-labelledby="summary-title"
        >
          <div className="summary-heading">
            <span className="summary-icon" aria-hidden="true">
              ↗
            </span>
            <h2 id="summary-title">Resumen de tus gastos</h2>
          </div>

          <p className="summary-label">Total registrado</p>

          <p className="summary-total">
            {formatoMoneda(totalGastos)}
          </p>

          <div className="summary-divider" />

          <div className="summary-movements">
            <span>Movimientos registrados</span>
            <strong>{gastos.length}</strong>
          </div>
        </section>

        <section
          className="quick-actions"
          aria-labelledby="actions-title"
        >
          <h2 id="actions-title">¿Qué querés hacer?</h2>

          <button
            className="action-button action-primary"
            type="button"
            onClick={() =>
              window.alert('El formulario se conectará en la integración de navegación.')
            }
          >
            <span className="action-symbol" aria-hidden="true">
              +
            </span>
            Registrar Nuevo Gasto
            <span className="action-arrow" aria-hidden="true">
              →
            </span>
          </button>

          <button
            className="action-button action-secondary"
            type="button"
            onClick={() =>
              window.alert('El listado se conectará en la integración de navegación.')
            }
          >
            <span className="action-symbol list-symbol" aria-hidden="true">
              ☰
            </span>
            Ver Listado Completo
            <span className="action-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </section>

        <footer className="welcome-footer">
          Tus finanzas bajo control, un gasto a la vez.
        </footer>
      </main>
    </div>
  );
}