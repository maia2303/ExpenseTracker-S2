import { useState } from 'react';
import usePWAInstall from '../hooks/usePWAInstall';
import './InstallBanner.css';

/**
 * Componente InstallBanner para la US #3.
 * Muestra el botón de instalación en navegadores compatibles (Android / Chrome)
 * y una guía de instalación manual en iOS.
 * No se muestra si la app ya está instalada (o en navigator.standalone).
 */
export default function InstallBanner() {
  const { isInstallable, isInstalled, isIOS, installApp } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);

  // Si ya está instalada (incluyendo navigator.standalone en iOS) o fue descartado, no mostrar
  if (isInstalled || dismissed) {
    return null;
  }

  // En iOS (y no instalada en standalone): mostramos instrucciones de instalación
  if (isIOS) {
    return (
      <aside
        className="install-banner"
        role="region"
        aria-label="Instrucciones para instalar la aplicación"
      >
        <div className="ios-instructions-card">
          <div className="ios-instructions-header">
            <div className="install-banner-app-info">
              <div className="install-banner-icon" aria-hidden="true">
                $
              </div>
              <div className="install-banner-texts">
                <h3 className="install-banner-title">Instalar ExpenseTracker</h3>
                <p className="install-banner-desc">Accedé directamente desde tu pantalla de inicio</p>
              </div>
            </div>
            <button
              type="button"
              className="install-close-btn"
              onClick={() => setDismissed(true)}
              aria-label="Cerrar aviso de instalación"
            >
              ✕
            </button>
          </div>

          <div className="ios-instructions-body">
            <p>Para instalar esta aplicación en iOS:</p>
            <div className="ios-step">
              1. Tocá el botón <span className="ios-badge">Compartir ⎋</span> en la barra de Safari.
            </div>
            <div className="ios-step">
              2. Seleccioná <span className="ios-badge">Agregar al inicio ⊞</span>.
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // En navegadores con soporte de beforeinstallprompt (Android, Chrome, Edge, etc.)
  if (isInstallable) {
    return (
      <aside
        className="install-banner"
        role="region"
        aria-label="Instalación de la aplicación"
      >
        <div className="install-banner-content">
          <div className="install-banner-app-info">
            <div className="install-banner-icon" aria-hidden="true">
              $
            </div>
            <div className="install-banner-texts">
              <h3 className="install-banner-title">Instalar ExpenseTracker</h3>
              <p className="install-banner-desc">Usala como app nativa y sin conexión</p>
            </div>
          </div>

          <div className="install-banner-actions">
            <button
              type="button"
              className="install-btn"
              onClick={installApp}
            >
              Instalar App
            </button>
            <button
              type="button"
              className="install-close-btn"
              onClick={() => setDismissed(true)}
              aria-label="Cerrar aviso de instalación"
            >
              ✕
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return null;
}

