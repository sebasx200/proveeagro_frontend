import RegisterForm from "../../components/forms/RegisterForm";
import styles from "../dashboard/Dashboard.module.css";

function EditSupplier() {
  return (
    <div className={styles.backgroundPages}>
      <RegisterForm type={"supplier"} />
    </div>
  );
}

export default EditSupplier;