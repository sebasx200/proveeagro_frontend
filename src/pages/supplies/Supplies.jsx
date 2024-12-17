import SupplyList from "../../components/supplies/SupplyList.jsx";
import styles from "../dashboard/Dashboard.module.css";

function Supplies(){
    return (
        <div className={`pb-5 ${styles.backgroundPages}`}>
      <div className="container mt-5">
        <SupplyList />
      </div>
    </div>
    )
}

export default Supplies;