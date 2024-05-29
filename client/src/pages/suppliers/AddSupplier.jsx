import SupplierForm from "../../components/suppliers/SupplierForm";
import styles from "./Suppliers.module.css";

function AddSupplier() {
  return (
    <div className={`pb-5 ${styles.addSupplierPage}`}>
      <SupplierForm />
    </div>
  );
}

export default AddSupplier;