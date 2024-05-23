import styles from "./Dashboard.module.css";

function Home() {
  return (
    <div>
      <div className={`container ${styles.homePage}`}>
        <h1>Home</h1>
      </div>
    </div>
  );
}

export default Home;
