import FarmList from "../../components/farms/FarmList";
import styles from "./Farms.module.css";

function Farms() {
    return (
        <div className={`pb-5 ${styles.farmPage}`}>
            <div className="container mt-5">
                
           
            <FarmList />
            </div>
        </div>
    );
}

export default Farms;