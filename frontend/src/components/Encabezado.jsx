import { NavLink } from 'react-router-dom';

export default function Encabezado() {
    const navClass = ({ isActive }) => 
        `nav-link rounded-5 ${ isActive ? "active" : ""}`;
    return (
        <header className="bg-dark text-white py-3 mb-4">
            <div className="container-fluid py-5 h-100 position-relative">
                <div className="usuario-pill">
                    <i className="bi bi-person-circle"></i>
                    <span> Nombre Apellido</span>
                </div>
                <nav className="mt-3">
                    <ul className="nav nav-pills nav-fill gap-2 p-1 rounded-5 shadow-sm justify-content-center" id="pillNav">
                        <li className="nav-item">
                            <NavLink
                                to="/temporadas"
                                className={navClass} end>
                                Temporadas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/temporadas/nueva"
                                className={navClass} end>
                                Nueva Temporada
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
