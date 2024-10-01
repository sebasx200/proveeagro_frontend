import RegisterForm from "../../components/forms/RegisterForm";
import styles from "./Suppliers.module.css";

function AddSupplier() {
  return (
    <div className={`pb-5 ${styles.addSupplierPage}`}>
      <RegisterForm type={"supplier"} />
    </div>
  );
}

export default AddSupplier;
