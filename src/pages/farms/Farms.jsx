import FarmList from "../../components/farms/FarmList";
import styles from "../dashboard/Dashboard.module.css";

function Farms() {
  return (
    <div className={`pb-5 ${styles.backgroundPages}`}>
      <div className="container mt-5">
        <FarmList />
      </div>
    </div>
  );
}

export default Farms;
