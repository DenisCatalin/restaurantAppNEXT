import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.imageBG}>
      <div className={styles.container}>
        <p className={styles.text}>Loading...</p>
        <p className={styles.loader}>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
