import RegisterForm from "../../components/forms/RegisterForm";
import styles from "../dashboard/Dashboard.module.css";

function AddSupplier() {
  return (
    <div className={`pb-5 ${styles.backgroundPages}`}>
      <RegisterForm type={"supplier"} />
    </div>
  );
}

export default AddSupplier;
