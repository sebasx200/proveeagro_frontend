// this is the component for the navbar that will be displayed on the top of the page

import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

function Navbar() {
  const { user, logout } = useUser();
  return (
    <nav className="navbar navbar-expand-lg bg-success navbar-dark">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          ProveeAgro
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {/* if the user is authorized, show the following links */}
          {user && (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Fincas
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/farm/farms/"}>
                      Ver fincas
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Añadir finca
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Proveedores
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/supplier/suppliers/"}>
                      Ver proveedores
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/supplier/add-supplier/"}
                    >
                      Añadir un proveedor
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          )}

          {/* if the user is not authorized, show the following links */}
          {!user && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Iniciar sesión
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Registrarse
                </Link>
              </li>
            </ul>
          )}
          {/* if the user is authorized, show the following links */}
          {user && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/logout" className="nav-link" onClick={logout}>
                  Cerrar sesión
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
