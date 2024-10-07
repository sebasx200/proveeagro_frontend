import MapLocations from "../../components/dashboard/MapLocations";
import styles from "./Dashboard.module.css";

function Locations() {
  return (
    <div className={styles.backgroundPages}>
      <div className={`container mt-5 ${styles.agendaPanel}`}>
        <MapLocations />
      </div>
    </div>
  );
}

export default Locations;
