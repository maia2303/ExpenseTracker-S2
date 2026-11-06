import { Outlet, NavLink } from 'react-router-dom';
import InstallBanner from '../components/InstallBanner';
import './MainLayout.css';

export default function MainLayout() {
    return (
        <div className="app-layout">
        <div className="app-content">
            <Outlet /> {/* Renderiza el contenido de la ruta actual */}
        </div>

        <InstallBanner /> {/* Renderiza el banner de instalación */}

        <nav className="bottom-nav" aria-label="Navegación principal"> {/* Barra de navegación inferior */}
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    isActive ? 'bottom-nav-link active' : 'bottom-nav-link'
                }
            >
                <span className="bottom-nav-icon" aria-hidden="true">
                    ⌂
                </span>
                <span className="bottom-nav-label">
                    Inicio
                </span>
            </NavLink>

            <NavLink
                to="/expenses"
                className={({ isActive }) =>
                    isActive ? 'bottom-nav-link active' : 'bottom-nav-link'
                }
            >
                <span className="bottom-nav-icon" aria-hidden="true">
                    ☰
                </span>
                <span className="bottom-nav-label">
                    Gastos
                </span>
            </NavLink>

            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    isActive ? 'bottom-nav-link active' : 'bottom-nav-link'
                }
            >
                <span className="bottom-nav-icon" aria-hidden="true">
                    ⚙
                </span>
                <span className="bottom-nav-label">
                    Ajustes
                </span>
            </NavLink>
        </nav>
    </div>
    );
}




