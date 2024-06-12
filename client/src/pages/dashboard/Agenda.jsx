import styles from "./Dashboard.module.css";
import AgendaList from "../../components/dashboard/AgendaList";

function Agenda() {
  return (
    <div>
      <div className={`${styles.agendaPage}`}>
        <AgendaList />
      </div>
    </div>
  );
}

export default Agenda;