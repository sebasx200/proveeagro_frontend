import { useState } from "react";
import userApi from "../../api/userApi";
import { Form, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { toast } from "react-hot-toast";
import { useUser } from '../UserContext';

// import components
import {
  FormPanel,
  ToggleButton,
  FormButton,
  FormLogo,
} from "../ui/FormComponents";

import styles from "../ui/FormComponents.module.css";

function FormLogin({ route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await userApi.post(route, { username, password });

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      login();
      toast.success("Bienvenido a Proveeagro " + username);
      navigate("/");
    } catch (error) {
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPanel>
      <div className="col-md-6">
        {/* logo */}
        <FormLogo src={"/img/form-img/logo_proveeagro-bg3.png"} />
      </div>
      {/* login form */}
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="panel-heading">
            <h3 className="pt-3 font-weight-bold text-center">
              Inicio de sesión
            </h3>
          </div>
          {/* input fields */}
          <div className="input-group mb-2">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-person-fill text-success"></i>
            </span>
            <div className="form-floating">
              <input
                id="username"
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu usuario"
                required
              />
              <label htmlFor="username">Usuario</label>
            </div>
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-lock-fill text-success"></i>
            </span>
            <div className="form-floating">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
              <label htmlFor="password">Contraseña</label>
              <ToggleButton
                itemID="passwordButton"
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
              />
            </div>
          </div>
          {/* remember me and forgot password */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                name="remember"
              />
              <label className="form-check-label text-muted" htmlFor="remember">
                Recordar
              </label>
            </div>
            <Link to="#" className="text-decoration-none">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          {/* submit button */}
          <div className="container text-center mt-4 mb-2">
            <FormButton
              text={loading ? "Cargando..." : "Ingresar"}
              className={`btn btn-success ${styles.loginButton} ${styles.loginButtonHover}`}
            />
          </div>
          {/* register link */}
          <div className="text-center pt-4 text-muted">
            ¿No tienes una cuenta?
            <Link to="/register" className="text-decoration-none">
              {" Regístrate aquí"}
            </Link>
          </div>
        </form>
      </div>
    </FormPanel>
  );
}

export default FormLogin;
