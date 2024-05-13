import { useState } from "react";
import userApi from "../../api/userApi";
import { Form, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { toast} from "react-hot-toast";

// import components
import {
  FormPanel,
  DivInput,
  ToggleButton,
  FormButton,
  FormLabel,
} from "../ui/FormComponents";

import "../../styles/login.css";

function FormLogin({ route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
      toast.success("Bienvenido a Proveeagro " + username)
      navigate("/");
    } catch (error) {
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPanel>
      <div className="col-md-6 mb-6">
        <img src="/img/form-img/logo_proveeagro-bg3.png" alt="Logo" className="img-fluid"/>
        <p className="text-body-secondary text-center mt-4 mb-2">© Proveeagro 2024</p>
      </div>
      <div className="col-md-6">
      <form onSubmit={handleSubmit}>
        <div className="panel-heading">
          <h3 className="pt-3 font-weight-bold text-center">Inicio de sesión</h3>
        </div>
        <DivInput>
          <i className="bi bi-person-fill text-success me-2"></i>
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
          <FormLabel text={"Usuario"} />
        </DivInput>

        <DivInput>
          <i className="bi bi-lock-fill text-success me-2"></i>
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
          <ToggleButton
            itemID="passwordButton"
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
          />
          <FormLabel text={"Contraseña"} />
        </DivInput>
        <div className="form-inline">
          <input type="checkbox" name="remember" id="remember" />
          <label className="text-muted">Recordar</label>
          <Link to="#" id="forgot" className="font-weight-bold">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="container text-center mt-4 mb-2">
          <FormButton
            text={loading ? "Cargando..." : "Ingresar"}
            className="btn btn-success login-button"
          />
        </div>

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
