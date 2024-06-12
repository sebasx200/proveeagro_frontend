import React from "react";
import { useUser } from "../UserContext";

const UserProfile = () => {
  const { user } = useUser();

  // If user data is not yet loaded, show a loading message
  if (!user) {
    return <div>Loading...</div>;
  }

  // If user data is loaded, display it
  return (
    <div className="container mt-5"> {/* Espaciado superior */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Perfil de usuario</h2> {/* Título de la tarjeta */}
          <form>
            <div className="form-group mb-3"> {/* Espaciado inferior */}
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={user.username}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={user.email}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="first_name">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                value={user.first_name}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="last_name">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                value={user.last_name}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
