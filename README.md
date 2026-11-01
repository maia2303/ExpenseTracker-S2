# ExpenseTracker - Progressive Web App (Sprint 2)

Proyecto de la materia **Programación III** (2do año, 2do cuatrimestre).  
Reconstrucción de la aplicación **ExpenseTracker** desarrollada previamente en React Native (Sprint 1) en una **Progressive Web App (PWA)** utilizando **React + Vite**, logrando una experiencia equivalente en interfaz, navegación y comportamiento en dispositivos móviles.

---

## Objetivos del Sprint

- Replicar las pantallas, flujos y diseño móvil de la versión de React Native.
- Configurar la identidad e instalabilidad PWA mediante `manifest.json`, íconos responsivos y metaetiquetas móviles.
- Implementar controles de instalación personalizados (`usePWAInstall` y `InstallBanner`) para Android y guía de instalación para iOS.
- Adaptar estilos a Mobile-First, utilizando unidades `dvh`, áreas seguras (`safe-area-inset`) y componentes semánticos HTML.
- Publicar la aplicación bajo HTTPS y permitir su instalación como app independiente (*standalone*).

---

## Tecnologías Utilizadas

- **React 19**
- **Vite**
- **React Router DOM 7**
- **CSS3 / Mobile-First** (Flexbox, CSS variables, `env(safe-area-inset-*)`)
- **PWA APIs**: Web App Manifest, Service Workers, `beforeinstallprompt`, `navigator.standalone`, `matchMedia`.

---

## 📁 Estructura del Proyecto

```text
ExpenseTracker-S2/
├── public/
│   ├── favicon.svg
│   ├── manifest.json              # Configuración de identidad PWA
│   └── icons/                     # Íconos de la app (192x192, 512x512, maskable, iOS)
├── src/
│   ├── assets/                    # Recursos visuales
│   ├── components/                # Componentes reutilizables
│   │   ├── CategoryBadge.jsx
│   │   ├── ExpenseCard.jsx
│   │   ├── InstallBanner.jsx      # Banner de instalación PWA (US3)
│   │   ├── InstallBanner.css
│   │   └── NewExpenseModal.jsx
│   ├── data/
│   │   └── mockExpenses.js        # Datos de prueba iniciales
│   ├── hooks/
│   │   └── usePWAInstall.js       # Hook para capturar beforeinstallprompt y standalone (US3)
│   ├── layouts/
│   │   └── MainLayout.jsx         # Layout principal con navegación inferior
│   ├── pages/
│   │   ├── HomeScreen.jsx         # Pantalla de bienvenida / resumen (US4)
│   │   ├── HomeScreen.css
│   │   ├── ExpensesScreen.jsx     # Listado de gastos (US6)
│   │   ├── ExpenseDetailScreen.jsx# Detalle de un gasto (US6)
│   │   └── SettingsScreen.jsx
│   ├── router/
│   │   └── AppRouter.jsx          # Rutas de la aplicación
│   ├── index.css                  # Estilos globales y reset
│   ├── App.jsx                    # Componente raíz
│   └── main.jsx                   # Punto de entrada Vite
├── index.html                     # HTML con metas de viewport, iOS y manifest
├── package.json
└── vite.config.js
```

---

## Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/maia2303/ExpenseTracker-S2.git
   cd ExpenseTracker-S2
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Probar en dispositivo móvil en la misma red local:**
   ```bash
   npm run dev -- --host
   ```
   Abre la IP local indicada en el navegador de tu teléfono.

---

## Historias de Usuario (User Stories)

### Detalle de la US #3 (`feature/identidad`)
- **`manifest.json`**: Configurado con `name`, `short_name`, `description`, `start_url`, `display: standalone`, `theme_color`, `background_color` e íconos.
- **Íconos PWA (`public/icons/`)**: Generación de íconos en resolución `192x192` y `512x512`, variantes `maskable` (con área segura para Android) y `apple-touch-icon` para iOS.
- **`index.html`**: Configuración de `viewport-fit=cover`, enlace al manifest y metatags para compatibilidad con iOS (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, etc.).
- **Hook `usePWAInstall`**: Captura y retiene el evento `beforeinstallprompt`, detecta si la app ya fue instalada o corre en modo `standalone` (`navigator.standalone`), detecta dispositivos iOS y expone la función de instalación.
- **Componente `InstallBanner`**: Ofrece el botón para instalar la app en Android/Chrome y una guía paso a paso para iOS ("Compartir ⎋ → Agregar al inicio ⊞"). Respeta tamaños táctiles mínimos de 44px y se oculta si ya está instalada.

---

## Tabla Comparativa: React Native vs. React Web (PWA)

| Concepto / Componente | Sprint 1 — React Native (Expo) | Sprint 2 — React Web (PWA) |
| :--- | :--- | :--- |
| **Punto de entrada y Rutas** | `App.js` + `NavigationContainer` | `main.jsx` + `BrowserRouter` |
| **Navegación en pila (Stack)** | `StackNavigator.js` | `router/AppRouter.jsx` (`<Routes>`) |
| **Pestañas / Menú inferior** | `TabNavigator.js` | `layouts/MainLayout.jsx` (`<Outlet>` + `<NavLink>`) |
| **Formulario Modal** | `screens/NewExpenseModal.js` (`presentation: 'modal'`) | `components/NewExpenseModal.jsx` (`<dialog>` + `createPortal`) |
| **Paso de parámetros** | `navigation.navigate('ExpenseDetail', { expense })` | `<Link to="/expenses/:id">` / `useNavigate()` + `useParams()` |
| **Volver atrás** | `navigation.goBack()` | `navigate(-1)` |
| **Estilos** | `StyleSheet.create({ ... })` | Archivos CSS estándar (`.css`) |
| **Áreas seguras (Notch / Home bar)**| `<SafeAreaView>` | `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)` |
| **Interacción táctil** | `<TouchableOpacity activeOpacity={...}>` | `<button>` + pseudo-clase `:active` |
| **Teclado numérico** | `keyboardType="numeric"` | `<input inputmode="decimal">` |
| **Interruptor (Switch)** | `<Switch />` | `<input type="checkbox" role="switch">` |
| **Configuración de la app** | `app.json` (nombre, ícono, splash) | `public/manifest.json` e `index.html` |
| **Entorno de prueba** | Expo Go en teléfono | Navegador web moderno / PWA instalada vía HTTPS |