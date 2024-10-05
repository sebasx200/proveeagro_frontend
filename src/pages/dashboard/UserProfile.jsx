import styles from "./Dashboard.module.css";
import UserData from "../../components/dashboard/UserData";

function UserProfile() {
  return (
    <div>
      <div className={styles.backgroundPages}>
        <UserData />
      </div>
    </div>
  );
}

export default UserProfile;
