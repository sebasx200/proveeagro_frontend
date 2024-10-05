import SupplierList from "../../components/suppliers/SupplierList";
import styles from "../dashboard/Dashboard.module.css";

function Suppliers() {
  return (
    <div className={`pb-5 ${styles.backgroundPages}`}>
      <div className="container mt-5">
        <SupplierList />
      </div>
    </div>
  );
}

export default Suppliers;
