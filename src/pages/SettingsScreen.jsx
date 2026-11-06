import { useState } from 'react';
import './SettingsScreen.css';

function SettingsScreen() {
  const [notificaciones, setNotificaciones] = useState(true);
  const [recordatorioDiario, setRecordatorioDiario] = useState(false);
  const [resumenSemanal, setResumenSemanal] = useState(true);

  return (
    <main className="settings-page">
      <header className="settings-header">
        <p className="settings-eyebrow">CONFIGURACIÓN</p>
        <h1>Ajustes</h1>
        <p>Personalizá las preferencias de ExpenseTracker.</p>
      </header>

      <section className="settings-card" aria-labelledby="prefs-title">
        <h2 id="prefs-title">Preferencias</h2>

        <div className="settings-row">
          <div className="settings-row-info">
            <label htmlFor="switch-notificaciones">
              Notificaciones de gastos
            </label>
            <p>Recibir alertas al registrar un movimiento.</p>
          </div>
          <input
            id="switch-notificaciones"
            type="checkbox"
            role="switch"
            className="settings-switch"
            checked={notificaciones}
            onChange={(e) => setNotificaciones(e.target.checked)}
          />
        </div>

        <div className="settings-divider" />

        <div className="settings-row">
          <div className="settings-row-info">
            <label htmlFor="switch-recordatorio">
              Recordatorio diario
            </label>
            <p>Avisarme a las 20:00 hs para cargar mis gastos del día.</p>
          </div>
          <input
            id="switch-recordatorio"
            type="checkbox"
            role="switch"
            className="settings-switch"
            checked={recordatorioDiario}
            onChange={(e) => setRecordatorioDiario(e.target.checked)}
          />
        </div>

        <div className="settings-divider" />

        <div className="settings-row">
          <div className="settings-row-info">
            <label htmlFor="switch-resumen">
              Resumen semanal
            </label>
            <p>Mostrar balance de gastos al finalizar la semana.</p>
          </div>
          <input
            id="switch-resumen"
            type="checkbox"
            role="switch"
            className="settings-switch"
            checked={resumenSemanal}
            onChange={(e) => setResumenSemanal(e.target.checked)}
          />
        </div>
      </section>

      <section className="settings-card" aria-labelledby="about-title">
        <h2 id="about-title">Acerca de la aplicación</h2>

        <div className="settings-info-item">
          <span>Aplicación</span>
          <strong>ExpenseTracker PWA</strong>
        </div>

        <div className="settings-divider" />

        <div className="settings-info-item">
          <span>Moneda predeterminada</span>
          <strong>Peso Argentino (ARS $)</strong>
        </div>

        <div className="settings-divider" />

        <div className="settings-info-item">
          <span>Versión</span>
          <strong>2.0.0 (Sprint 2)</strong>
        </div>
      </section>
    </main>
  );
}

export default SettingsScreen;

