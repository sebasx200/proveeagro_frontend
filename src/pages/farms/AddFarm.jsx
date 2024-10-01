import RegisterForm from "../../components/forms/RegisterForm";
import styles from "./Farms.module.css";

function AddFarm() {
  return (
    <div className={styles.farmForm}>
      <RegisterForm type={"farm"} />
    </div>
  );
}

export default AddFarm;
