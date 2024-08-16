import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import userApi from "../../api/userApi";

// import components
import {
  FormPanel,
  ToggleButton,
  FormButton,
  FormLogo,
} from "../ui/FormComponents";

import styles from "../ui/FormComponents.module.css";

function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await userApi.post("/login/user/register/", data);
      toast.success("Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      setServerError(error.response.data);
      toast.error("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormPanel>
      <div className="col-md-6 mb-6">
        {/* logo */}
        <FormLogo src={"/img/form-img/logo_proveeagro-bg3.png"} />
      </div>
      <div className="col-md-6">
        <form onSubmit={onSubmit}>
          <div className="panel-heading">
            <h3 className="pt-3 font-weight-bold text-center">Registrarse</h3>
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
                placeholder="Tu usuario"
                {...register("username", { required: true })}
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
                placeholder="Contraseña"
                {...register("password", { required: true })}
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
          <div className="input-group mb-2">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-lock-fill text-success"></i>
            </span>
            <div className="form-floating">
              <input
                id="password2"
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password2"
                placeholder="Contraseña"
                {...register("password2", { required: true })}
                required
              />
              <ToggleButton
                itemID="passwordButton"
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
              />
              <label htmlFor="password2">Repite la contraseña</label>
            </div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text" id="basic-addon1">
              
          <i className="bi bi-envelope-at-fill text-success"></i>
          </span>
          <div className="form-floating">
          <input
            id="email"
            type="email"
            className="form-control"
            name="email"
            placeholder="Tu correo electrónico"
            {...register("email", { required: true })}
            required
          />
          <label htmlFor="email">Correo electrónico</label>
          </div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-person-lines-fill text-success"></i>
          </span>
          <div className="form-floating">
          <input
            id="first_name"
            type="text"
            className="form-control"
            name="first_name"
            placeholder="Nombre"
            {...register("first_name", { required: true })}
            required
          />
          <label htmlFor="first_name">Ingresa tu nombre</label>
          </div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-person-lines-fill text-success"></i>
          </span>
          <div className="form-floating">
          <input
            id="last_name"
            type="text"
            className="form-control"
            name="last_name"
            placeholder="Apellido"
            {...register("last_name", { required: true })}
            required
          />
          <label htmlFor="last_name">Ingresa tu apellido</label>
          </div>
          </div>
          
          <div className="container text-center mt-4 mb-2">
            <FormButton
              type="submit"
              text={loading ? "Cargando..." : "Registrarse"}
              className={`btn btn-success ${styles.loginButton} ${styles.loginButtonHover}`}
            />
          </div>
          {serverError &&
            Object.keys(serverError).map((key, index) => (
              <div key={index} className="alert alert-danger mt-3" role="alert">
                <p>
                  {serverError[key]}
                </p>
              </div>
            ))}
          <div className="text-center pt-4 text-muted">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="text-decoration-none">
              {" Inicia sesión aquí"}
            </Link>
          </div>
        </form>
      </div>
    </FormPanel>
  );
}

export default FormRegister;
