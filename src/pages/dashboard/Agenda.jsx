import styles from "./Dashboard.module.css";
import AgendaList from "../../components/dashboard/AgendaList";

function Agenda() {
  return (
    <div className={styles.backgroundPages}>
      <div className={`container mt-5 ${styles.agendaPanel}`}>
        <AgendaList />
      </div>
    </div>
  );
}

export default Agenda;
