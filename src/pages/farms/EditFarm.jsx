import RegisterForm from "../../components/forms/RegisterForm";
import styles from "../dashboard/Dashboard.module.css";

function EditFarm() {
  return (
    <div className={styles.backgroundPages}>
      <RegisterForm type={"farm"} />
    </div>
  );
}

export default EditFarm;
