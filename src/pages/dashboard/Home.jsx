import styles from "./Dashboard.module.css";
import RecentActions from "../../components/dashboard/RecentActions";

function Home() {
  return (
    <div className={styles.backgroundPages}>
      <div className="container mt-5">
        <RecentActions />
      </div>
    </div>
  );
}

export default Home;
