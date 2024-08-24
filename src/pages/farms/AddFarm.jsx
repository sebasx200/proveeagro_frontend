import FarmForm from "../../components/farms/FarmForm";
import styles from "./Farms.module.css";

function AddFarm() {
    return (
        <div className={styles.farmForm}>
            <FarmForm />
        </div>
    );
}

export default AddFarm;