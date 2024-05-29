import FormLogin from "../../components/login-forms/FormLogin";
import styles from "./LoginRegister.module.css";

function Login() {
    return (
        <div className={`pb-5 ${styles.LoginPage}`}>


            <FormLogin route="/login/token/" />
        </div>)
}

export default Login;