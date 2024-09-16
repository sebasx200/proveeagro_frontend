import RegisterForm from "../../components/forms/RegisterForm";
import styles from "./Suppliers.module.css";

function EditSupplier() {
  return (
    <div className={styles.addSupplierPage}>
      <RegisterForm type={"supplier"} />
    </div>
  );
}

export default EditSupplier;