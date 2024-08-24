import FormRegister from "../../components/login-forms/FormRegister";
import styles from "./LoginRegister.module.css";

function Register (){
    return(
        <div className={`pb-5 ${styles.LoginPage}`}>
        
      
        <FormRegister/>
        </div>
    )
}

export default Register;