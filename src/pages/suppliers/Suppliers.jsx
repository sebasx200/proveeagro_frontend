import SupplierList from "../../components/suppliers/SupplierList";
import styles from "./Suppliers.module.css";

function Suppliers() {
  return (
    <div className={`pb-5 ${styles.supplierPage}`}>
      <div className="container mt-5">
        <SupplierList />
      </div>
    </div>
  );
}

export default Suppliers;
