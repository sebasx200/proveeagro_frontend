// this is the component for the navbar that will be displayed on the top of the page

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
                  <a className="dropdown-item" href="#">
                    Mis fincas
                  </a>
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
                  <a className="dropdown-item" href="#">
                    Ver mis proveedores
                  </a>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/supplier/add-supplier/"}>
                    Añadir un proveedor
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
