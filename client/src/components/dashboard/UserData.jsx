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
    <div className="container">
      <div className="form-group">
        <form>
            <h2>Perfil de usuario</h2>
            <label htmlFor="username">Nombre de usuario</label>
            <input
                type="text"
                className="form-control"
                id="username"
                value={user.username}
                readOnly
            />
            <label htmlFor="email">Correo electrónico</label>
            <input
                type="email"
                className="form-control"
                id="email"
                value={user.email}
                readOnly
            />
            <label htmlFor="first_name">Nombre</label>
            <input
                type="text"
                className="form-control"
                id="first_name"
                value={user.first_name}
                readOnly
            />
            <label htmlFor="last_name">Apellido</label>
            <input
                type="text"
                className="form-control"
                id="last_name"
                value={user.last_name}
                readOnly
            />
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
