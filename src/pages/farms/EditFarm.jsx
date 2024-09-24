import RegisterForm from "../../components/forms/RegisterForm";
import styles from "./Farms.module.css";

function EditFarm() {
  return (
    <div className={styles.farmForm}>
      <RegisterForm type={"farm"} />
    </div>
  );
}

export default EditFarm;
