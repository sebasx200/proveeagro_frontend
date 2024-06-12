import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../UserContext";
import { updateUser } from "../../api/userApi";
import styles from "../../pages/dashboard/Dashboard.module.css";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  // If user data is not yet loaded, show a loading message
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async () => {
    try {
      await updateUser(currentUser);
      toast.success("Usuario actualizado correctamente", {
        duration: 5000,
      });
    } catch (error) {
      toast.error("Error al actualizar el usuario " + error.message, {
        duration: 5000,
      });
    }
  };

  // Function to handle the change on the form to edit the user
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  // If user data is loaded, display it
  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className={`card ${styles.cardPanel}`}>
            <div className="card-body">
              <h2 className="card-title">Perfil de usuario</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username">Nombre de usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    value={currentUser.username || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={currentUser.email || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="first_name">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    value={currentUser.first_name || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="last_name">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    value={currentUser.last_name || ""}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Nueva contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    onChange={handleChange}
                  />
                  <label htmlFor="password2">Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password2"
                    id="password2"
                    onChange={handleChange}
                  />
                  <label htmlFor="current_password">Contraseña actual</label>
                  <input
                    type="password"
                    className="form-control"
                    name="current_password"
                    id="current_password"
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn btn-success mt-3">
                    Editar información
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
