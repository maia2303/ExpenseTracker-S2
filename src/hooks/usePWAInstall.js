import { useState, useEffect } from 'react';

/**
 * Hook para gestionar el estado de instalabilidad PWA y capturar beforeinstallprompt.
 * Cumple con los requerimientos de la US #3:
 * - Captura y retiene el evento `beforeinstallprompt`.
 * - Previene el comportamiento por defecto para controlar la instalación.
 * - Detecta si el dispositivo es iOS para guiar la instalación manual.
 * - Detecta si la app ya está instalada o abierta en modo standalone (incluyendo navigator.standalone de iOS).
 * - Maneja el evento `appinstalled`.
 */
export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Detección de iOS (iPhone, iPad, iPod)
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
      // Soporte para iPad en iPadOS modernos que reportan MacIntel con touch
      const isIPadOS =
        window.navigator.platform === 'MacIntel' &&
        window.navigator.maxTouchPoints > 1;

      return isAppleDevice || isIPadOS;
    };

    // 2. Detección de si la app ya corre instalada en modo standalone
    const checkIsStandalone = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      // Propiedad nativa de Safari iOS
      const isIOSStandalone = Boolean(window.navigator.standalone);

      return isStandaloneMedia || isIOSStandalone;
    };

    setIsIOS(checkIsIOS());
    setIsInstalled(checkIsStandalone());

    // 3. Listener para cambios en el display-mode (por ejemplo si el usuario instala mientras navega)
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = (e) => {
      if (e.matches) {
        setIsInstalled(true);
        setIsInstallable(false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    // 4. Capturar el evento beforeinstallprompt (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e) => {
      // Prevenir el infobar automático por defecto
      e.preventDefault();
      // Guardar el evento para dispararlo cuando el usuario presione el botón
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // 5. Manejar evento appinstalled cuando el usuario completa la instalación
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  /**
   * Dispara el diálogo nativo de instalación.
   */
  const installApp = async () => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setIsInstallable(false);
      return choice.outcome === 'accepted';
    } catch (error) {
      console.error('Error al intentar instalar la aplicación:', error);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    isIOS,
    installApp,
  };
}

